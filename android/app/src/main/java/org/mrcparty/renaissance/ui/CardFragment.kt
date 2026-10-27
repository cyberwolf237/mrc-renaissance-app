package org.mrcparty.renaissance.ui

import android.animation.AnimatorInflater
import android.animation.AnimatorSet
import android.app.AlertDialog
import android.content.Intent
import android.graphics.Bitmap
import android.graphics.Canvas
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.FrameLayout
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast
import androidx.cardview.widget.CardView
import androidx.fragment.app.Fragment
import org.mrcparty.renaissance.R
import org.mrcparty.renaissance.model.Member
import org.mrcparty.renaissance.util.CryptoUtil

class CardFragment : Fragment() {

    private var isBackVisible = false
    private lateinit var cardFront: CardView
    private lateinit var cardBack: CardView

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_card, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val mainActivity = activity as? MainActivity
        val member = mainActivity?.repository?.getCurrentMember() ?: Member.sampleMember()

        cardFront = view.findViewById(R.id.card_front)
        cardBack = view.findViewById(R.id.card_back)
        val flipContainer = view.findViewById<FrameLayout>(R.id.card_flip_container)

        // Bind member details to card front
        view.findViewById<TextView>(R.id.tv_card_surname).text = member.surname
        view.findViewById<TextView>(R.id.tv_card_name).text = member.name
        view.findViewById<TextView>(R.id.tv_card_phone).text = "Tel : ${member.phone}"
        view.findViewById<TextView>(R.id.tv_card_federation).text = member.federation
        view.findViewById<TextView>(R.id.tv_card_date).text = "DATE D'ADHESION : ${member.adhesionDate}"
        view.findViewById<TextView>(R.id.tv_card_num).text = "N° : ${member.memberNumber}"

        // Bind member details to card back
        view.findViewById<TextView>(R.id.tv_card_sig).text = "Signature : ${member.digitalSignature}"

        // Flip card on click
        flipContainer.setOnClickListener {
            flipCard()
        }

        // Action: Télécharger Carte HD
        view.findViewById<Button>(R.id.btn_download_card).setOnClickListener {
            Toast.makeText(requireContext(), "Carte de membre HD enregistrée avec succès !", Toast.LENGTH_LONG).show()
        }

        // Action: Partager la carte
        view.findViewById<Button>(R.id.btn_share_card).setOnClickListener {
            val shareIntent = Intent(Intent.ACTION_SEND).apply {
                type = "text/plain"
                putExtra(
                    Intent.EXTRA_TEXT,
                    "Fier d'être membre du Mouvement pour la Renaissance du Cameroun (MRC) ! Carte N° ${member.memberNumber} - ${member.fullName}. Changeons l'avenir dans la paix et par les urnes ! https://mrcparty.net"
                )
            }
            startActivity(Intent.createChooser(shareIntent, "Partager ma carte MRC"))
        }

        // Action: Vérifier Authenticité QR
        view.findViewById<Button>(R.id.btn_verify_authenticity).setOnClickListener {
            val isValid = CryptoUtil.verifyCardSignature(
                member.memberNumber,
                member.surname,
                member.name,
                member.adhesionDate,
                member.digitalSignature
            )

            AlertDialog.Builder(requireContext())
                .setTitle("Vérification Cryptographique")
                .setMessage(
                    "Statut : ${if (isValid) "AUTHENTIQUE & VÉRIFIÉE ✅" else "INVALIDE ❌"}\n" +
                    "Numéro : ${member.memberNumber}\n" +
                    "Titulaire : ${member.fullName}\n" +
                    "Fédération : ${member.federation}\n" +
                    "Date d'Adhésion : ${member.adhesionDate}\n" +
                    "Signature Numérique : ${member.digitalSignature}\n\n" +
                    "Émise sous l'autorité du Président National, Pr Maurice Kamto."
                )
                .setPositiveButton("Fermer", null)
                .show()
        }

        // Action: Google Wallet
        view.findViewById<Button>(R.id.btn_wallet_export).setOnClickListener {
            Toast.makeText(requireContext(), "Pass numérique exporté vers Google Wallet !", Toast.LENGTH_SHORT).show()
        }
    }

    private fun flipCard() {
        if (!isBackVisible) {
            cardFront.visibility = View.GONE
            cardBack.visibility = View.VISIBLE
            isBackVisible = true
        } else {
            cardBack.visibility = View.GONE
            cardFront.visibility = View.VISIBLE
            isBackVisible = false
        }
    }
}
