package org.mrcparty.renaissance.ui

import android.app.AlertDialog
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.widget.Button
import android.widget.ImageView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import com.google.android.material.bottomnavigation.BottomNavigationView
import org.mrcparty.renaissance.R
import org.mrcparty.renaissance.data.MrcRepository

class MainActivity : AppCompatActivity() {

    val repository = MrcRepository()
    private var currentLanguage = "FR"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val bottomNav = findViewById<BottomNavigationView>(R.id.bottom_navigation)
        val btnLangToggle = findViewById<Button>(R.id.btn_lang_toggle)
        val btnSosQuick = findViewById<ImageView>(R.id.btn_sos_quick)

        // Setup bottom navigation listener
        bottomNav.setOnItemSelectedListener { item ->
            when (item.itemId) {
                R.id.nav_home -> {
                    loadFragment(HomeFragment())
                    true
                }
                R.id.nav_card -> {
                    loadFragment(CardFragment())
                    true
                }
                R.id.nav_register -> {
                    loadFragment(RegisterFragment())
                    true
                }
                R.id.nav_sentinel -> {
                    loadFragment(SentinelFragment())
                    true
                }
                R.id.nav_donate -> {
                    loadFragment(DonateFragment())
                    true
                }
                else -> false
            }
        }

        // Bilingual toggle (FR <-> EN)
        btnLangToggle.setOnClickListener {
            currentLanguage = if (currentLanguage == "FR") "EN" else "FR"
            btnLangToggle.text = currentLanguage
            Toast.makeText(
                this,
                if (currentLanguage == "FR") "Langue : Français" else "Language : English",
                Toast.LENGTH_SHORT
            ).show()
        }

        // SOS Militant quick alert
        btnSosQuick.setOnClickListener {
            showSosDialog()
        }

        // Default initial fragment: Home
        if (savedInstanceState == null) {
            loadFragment(HomeFragment())
        }
    }

    fun loadFragment(fragment: Fragment) {
        supportFragmentManager.beginTransaction()
            .replace(R.id.nav_host_fragment, fragment)
            .commit()
    }

    private fun showSosDialog() {
        AlertDialog.Builder(this)
            .setTitle("🚨 SOS Militant en Danger")
            .setMessage("Vous allez émettre une alerte d'urgence géolocalisée au Collectif des Avocats du MRC et au Secrétariat National.\n\nEn cas de garde à vue ou d'intimidation illégale, composez immédiatement le numéro d'urgence officiel :\n(+237) 674 27 05 49")
            .setPositiveButton("Appeler l'Urgence") { _, _ ->
                val intent = Intent(Intent.ACTION_DIAL).apply {
                    data = Uri.parse("tel:+237674270549")
                }
                startActivity(intent)
            }
            .setNegativeButton("Annuler", null)
            .show()
    }
}
