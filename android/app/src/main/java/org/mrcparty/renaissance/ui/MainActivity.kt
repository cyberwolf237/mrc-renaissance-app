package org.mrcparty.renaissance.ui

import android.annotation.SuppressLint
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.view.KeyEvent
import android.view.View
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.ProgressBar
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import org.mrcparty.renaissance.R
import org.mrcparty.renaissance.data.MrcRepository

class MainActivity : AppCompatActivity() {

    val repository = MrcRepository()

    private lateinit var webView: WebView
    private lateinit var progressBar: ProgressBar

    // URL Officielle en Ligne sur Render.com (Mises à jour automatiques transparentes)
    private val ONLINE_URL = "https://mrc-backend-c11n.onrender.com"
    // Fallback local hors-ligne en cas d'absence de connexion internet
    private val OFFLINE_URL = "file:///android_asset/www/index.html"

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        webView = findViewById(R.id.webview)
        progressBar = findViewById(R.id.progress_bar)

        // ─── Configuration WebView Optimale ─────────────────────────────────
        webView.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            databaseEnabled = true
            cacheMode = WebSettings.LOAD_DEFAULT
            allowFileAccess = true
            allowContentAccess = true
            allowFileAccessFromFileURLs = true
            allowUniversalAccessFromFileURLs = true
            useWideViewPort = true
            loadWithOverviewMode = true
            setSupportZoom(false)
            builtInZoomControls = false
            displayZoomControls = false
            mediaPlaybackRequiresUserGesture = false
        }

        // ─── Client WebView : Clés de navigation & liens externes ───────────
        webView.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(view: WebView, request: WebResourceRequest): Boolean {
                val url = request.url.toString()

                // Numéros d'urgence / SOS militant
                if (url.startsWith("tel:")) {
                    startActivity(Intent(Intent.ACTION_DIAL, Uri.parse(url)))
                    return true
                }
                // Liens emails
                if (url.startsWith("mailto:")) {
                    startActivity(Intent(Intent.ACTION_SENDTO, Uri.parse(url)))
                    return true
                }
                // Navigation interne sur le domaine Render ou local
                if (url.contains("mrc-backend-c11n.onrender.com") || url.startsWith("file://")) {
                    return false
                }
                // Liens web externes (articles, Wikipedia, YouTube)
                try {
                    startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(url)))
                } catch (e: Exception) {
                    Toast.makeText(this@MainActivity, "Ouverture impossible: $url", Toast.LENGTH_SHORT).show()
                }
                return true
            }

            override fun onPageFinished(view: WebView, url: String) {
                progressBar.visibility = View.GONE
            }

            override fun onReceivedError(view: WebView, errorCode: Int, description: String, failingUrl: String) {
                // En cas d'erreur réseau (ex: pas d'internet), charger la version locale intégrée
                if (failingUrl.startsWith(ONLINE_URL)) {
                    view.loadUrl(OFFLINE_URL)
                }
            }
        }

        // ─── Progression du chargement ───────────────────────────────────────
        webView.webChromeClient = object : WebChromeClient() {
            override fun onProgressChanged(view: WebView, newProgress: Int) {
                if (newProgress < 100) {
                    progressBar.visibility = View.VISIBLE
                    progressBar.progress = newProgress
                } else {
                    progressBar.visibility = View.GONE
                }
            }
        }

        // Chargement initial instantané depuis les assets locaux
        if (savedInstanceState != null) {
            webView.restoreState(savedInstanceState)
        } else {
            webView.loadUrl(OFFLINE_URL)
        }
    }

    fun loadFragment(fragment: Fragment) {
        // Compatibilité ascendante
    }

    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        webView.saveState(outState)
    }

    override fun onKeyDown(keyCode: Int, event: KeyEvent?): Boolean {
        if (keyCode == KeyEvent.KEYCODE_BACK && webView.canGoBack()) {
            webView.goBack()
            return true
        }
        return super.onKeyDown(keyCode, event)
    }
}
