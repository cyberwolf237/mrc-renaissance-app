package org.mrcparty.renaissance.ui

import android.app.AlertDialog
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.Button
import android.widget.EditText
import android.widget.RadioGroup
import android.widget.Spinner
import android.widget.Toast
import androidx.fragment.app.Fragment
import org.mrcparty.renaissance.R
import org.mrcparty.renaissance.model.Member
import org.mrcparty.renaissance.model.MemberRole
import org.mrcparty.renaissance.model.PaymentMethod

class RegisterFragment : Fragment() {

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_register, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val mainActivity = activity as? MainActivity ?: return
        val repo = mainActivity.repository

        val etSurname = view.findViewById<EditText>(R.id.et_surname)
        val etName = view.findViewById<EditText>(R.id.et_name)
        val etCni = view.findViewById<EditText>(R.id.et_cni)
        val etPhone = view.findViewById<EditText>(R.id.et_phone)
        val etEmail = view.findViewById<EditText>(R.id.et_email)
        val etDivision = view.findViewById<EditText>(R.id.et_division)
        val spinnerFed = view.findViewById<Spinner>(R.id.spinner_federation)
        val rgPayment = view.findViewById<RadioGroup>(R.id.rg_payment_methods)
        val btnSubmit = view.findViewById<Button>(R.id.btn_register_submit)

        // Populate Federations Spinner
        val federations = repo.getFederations()
        val adapter = ArrayAdapter(requireContext(), android.R.layout.simple_spinner_dropdown_item, federations)
        spinnerFed.adapter = adapter

        btnSubmit.setOnClickListener {
            val surname = etSurname.text.toString().trim()
            val name = etName.text.toString().trim()
            val phone = etPhone.text.toString().trim()
            val email = etEmail.text.toString().trim()
            val cni = etCni.text.toString().trim()
            val division = etDivision.text.toString().trim()
            val fed = spinnerFed.selectedItem?.toString() ?: federations.first()

            if (surname.isEmpty() || name.isEmpty() || phone.isEmpty()) {
                Toast.makeText(requireContext(), "Veuillez renseigner vos prénom, nom et numéro de téléphone.", Toast.LENGTH_LONG).show()
                return@setOnClickListener
            }

            // Determine payment method
            val paymentMethod = when (rgPayment.checkedRadioButtonId) {
                R.id.rb_momo -> PaymentMethod.MTN_MOMO
                R.id.rb_om -> PaymentMethod.ORANGE_MONEY
                R.id.rb_eu -> PaymentMethod.EXPRESS_UNION
                else -> PaymentMethod.BANK_CARD
            }

            // Simulate USSD Mobile Money Prompt Confirmation Dialog
            val methodName = when (paymentMethod) {
                PaymentMethod.MTN_MOMO -> "MTN Mobile Money (*126#)"
                PaymentMethod.ORANGE_MONEY -> "Orange Money (#150#)"
                PaymentMethod.EXPRESS_UNION -> "Express Union Mobile"
                PaymentMethod.BANK_CARD -> "Carte Bancaire"
            }

            AlertDialog.Builder(requireContext())
                .setTitle("Paiement Cotisation Adhésion")
                .setMessage("Un débit de 1.000 F CFA va être initié via $methodName sur le numéro $phone.\n\nConfirmez-vous votre engagement républicain pour l'obtention de votre carte de membre officielle du MRC ?")
                .setPositiveButton("Confirmer le Paiement") { _, _ ->
                    val result = repo.registerMember(
                        surname = surname,
                        name = name,
                        phone = phone,
                        email = email,
                        cniOrPassport = cni,
                        federation = fed,
                        region = "CAMEROUN",
                        division = division,
                        role = MemberRole.MILITANT
                    )

                    result.onSuccess { newMember: Member ->
                        AlertDialog.Builder(requireContext())
                            .setTitle("🎉 Bienvenue dans la Renaissance !")
                            .setMessage("Félicitations, militant ${newMember.fullName} !\n\nVotre carte de membre officielle N° ${newMember.memberNumber} a été générée et authentifiée avec succès sous l'égide du Président National, Pr Maurice Kamto.")
                            .setPositiveButton("Voir Ma Carte") { _, _ ->
                                mainActivity.loadFragment(CardFragment())
                            }
                            .setCancelable(false)
                            .show()
                    }.onFailure { err ->
                        Toast.makeText(requireContext(), "Erreur : ${err.message}", Toast.LENGTH_LONG).show()
                    }
                }
                .setNegativeButton("Annuler", null)
                .show()
        }
    }
}
