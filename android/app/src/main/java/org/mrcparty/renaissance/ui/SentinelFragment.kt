package org.mrcparty.renaissance.ui

import android.app.AlertDialog
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.Button
import android.widget.EditText
import android.widget.Spinner
import android.widget.Toast
import androidx.fragment.app.Fragment
import org.mrcparty.renaissance.R
import org.mrcparty.renaissance.model.IncidentType

class SentinelFragment : Fragment() {

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_sentinel, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val mainActivity = activity as? MainActivity ?: return
        val repo = mainActivity.repository

        val etStation = view.findViewById<EditText>(R.id.et_polling_station)
        val etCity = view.findViewById<EditText>(R.id.et_sentinel_city)
        val etDesc = view.findViewById<EditText>(R.id.et_incident_desc)
        val spinnerIncident = view.findViewById<Spinner>(R.id.spinner_incident_type)
        val btnSubmit = view.findViewById<Button>(R.id.btn_submit_report)
        val btnElecam = view.findViewById<Button>(R.id.btn_elecam_check)
        val btnUploadPv = view.findViewById<Button>(R.id.btn_upload_pv)

        val incidents = listOf(
            "Refus d'inscription par ELECAM",
            "Bourrage d'urnes / Fraude directe",
            "Absence de bulletins MRC dans l'isoloir",
            "Intimidation d'électeurs / Militaires",
            "Non-concordance ou falsification de PV",
            "Expulsion illégale de scrutateurs",
            "Autre incident suspect"
        )
        val adapter = ArrayAdapter(requireContext(), android.R.layout.simple_spinner_dropdown_item, incidents)
        spinnerIncident.adapter = adapter

        btnElecam.setOnClickListener {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse("https://mrcparty.net/en/crm-cameroon/"))
            startActivity(intent)
        }

        btnUploadPv.setOnClickListener {
            Toast.makeText(requireContext(), "Module Procès-Verbal : Prêt pour le téléversement photo et décompte !", Toast.LENGTH_SHORT).show()
        }

        btnSubmit.setOnClickListener {
            val station = etStation.text.toString().trim()
            val city = etCity.text.toString().trim()
            val desc = etDesc.text.toString().trim()

            if (station.isEmpty() || desc.isEmpty()) {
                Toast.makeText(requireContext(), "Veuillez renseigner le bureau de vote et la description de l'incident.", Toast.LENGTH_LONG).show()
                return@setOnClickListener
            }

            val report = repo.submitElectoralReport(
                region = "CENTRE / LITTORAL",
                division = city.ifBlank { "Yaoundé / Douala" },
                pollingStationName = station,
                incidentType = IncidentType.REFUS_INSCRIPTION_ELECAM,
                description = desc,
                lat = 3.8480,
                lng = 11.5021
            )

            AlertDialog.Builder(requireContext())
                .setTitle("✅ Signalement Enregistré")
                .setMessage("Dossier N° ${report.id} transmis en temps réel au Collectif des Avocats du MRC et à la Commission Électorale du parti.\n\nMerci pour votre vigilance citoyenne ! Le MRC veille pour le respect de chaque vote.")
                .setPositiveButton("OK") { _, _ ->
                    etStation.text.clear()
                    etDesc.text.clear()
                }
                .show()
        }
    }
}
