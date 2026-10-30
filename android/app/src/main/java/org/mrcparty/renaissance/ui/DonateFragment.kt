package org.mrcparty.renaissance.ui

import android.app.AlertDialog
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.EditText
import android.widget.RadioGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import org.mrcparty.renaissance.R
import org.mrcparty.renaissance.model.Donation
import org.mrcparty.renaissance.model.DonationType
import org.mrcparty.renaissance.model.PaymentMethod

class DonateFragment : Fragment() {

    private var selectedAmount: Long = 1000L

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_donate, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val mainActivity = activity as? MainActivity ?: return
        val repo = mainActivity.repository

        val btnSubmit = view.findViewById<Button>(R.id.btn_submit_donation)
        val etPhone = view.findViewById<EditText>(R.id.et_donate_phone)
        val rgType = view.findViewById<RadioGroup>(R.id.rg_contribution_type)

        fun updateButtonText() {
            btnSubmit.text = "Valider la Contribution ($selectedAmount F CFA)"
        }

        view.findViewById<Button>(R.id.btn_amt_1000).setOnClickListener {
            selectedAmount = 1000L
            updateButtonText()
        }
        view.findViewById<Button>(R.id.btn_amt_2500).setOnClickListener {
            selectedAmount = 2500L
            updateButtonText()
        }
        view.findViewById<Button>(R.id.btn_amt_5000).setOnClickListener {
            selectedAmount = 5000L
            updateButtonText()
        }
        view.findViewById<Button>(R.id.btn_amt_10000).setOnClickListener {
            selectedAmount = 10000L
            updateButtonText()
        }
        view.findViewById<Button>(R.id.btn_amt_25000).setOnClickListener {
            selectedAmount = 25000L
            updateButtonText()
        }
        view.findViewById<Button>(R.id.btn_amt_50000).setOnClickListener {
            selectedAmount = 50000L
            updateButtonText()
        }

        btnSubmit.setOnClickListener {
            val phone = etPhone.text.toString().trim()
            if (phone.isEmpty()) {
                Toast.makeText(requireContext(), "Veuillez renseigner un numéro de téléphone.", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            val donType = when (rgType.checkedRadioButtonId) {
                R.id.rb_campaign_support -> DonationType.CAMPAIGN_SUPPORT_2025
                R.id.rb_scsi -> DonationType.SCSI_SOLIDARITY
                else -> DonationType.MONTHLY_DUES
            }

            val result = repo.processPayment(
                amountCfa = selectedAmount,
                phone = phone,
                method = PaymentMethod.MTN_MOMO,
                type = donType
            )

            result.onSuccess { donation: Donation ->
                AlertDialog.Builder(requireContext())
                    .setTitle("✅ Paiement Confirmé")
                    .setMessage(
                        "Reçu de Cotisation / Don Officiel du MRC\n\n" +
                        "Réf. Transaction : ${donation.transactionRef}\n" +
                        "Montant : ${donation.amountCfa} F CFA\n" +
                        "Date : ${donation.date}\n" +
                        "Bénéficiaire : Mouvement pour la Renaissance du Cameroun\n\n" +
                        "Merci pour votre soutien indéfectible au changement dans la paix et par les urnes !"
                    )
                    .setPositiveButton("Télécharger le Reçu", null)
                    .show()
            }
        }
    }
}
