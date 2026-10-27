package org.mrcparty.renaissance.model

import java.io.Serializable

data class Article(
    val id: String,
    val title: String,
    val date: String,
    val author: String = "Webmaster",
    val excerpt: String,
    val content: String,
    val imageUrl: String,
    val category: String = "Politique",
    val url: String
) : Serializable

data class Speech(
    val id: String,
    val title: String,
    val eventName: String,
    val date: String,
    val location: String,
    val summary: String,
    val fullText: String,
    val audioDurationMinutes: Int = 45,
    val audioUrl: String? = null,
    val keyQuotes: List<String> = emptyList()
) : Serializable

data class Donation(
    val id: String,
    val donorName: String,
    val phone: String,
    val amountCfa: Long,
    val type: DonationType,
    val paymentMethod: PaymentMethod,
    val transactionRef: String,
    val date: String,
    val isAnonymous: Boolean = false
) : Serializable

enum class DonationType {
    MEMBERSHIP_CARD_FEE,      // 1,000 F CFA
    MONTHLY_DUES,             // 1,000 F CFA
    ANNUAL_DUES,              // 12,000 F CFA
    CAMPAIGN_SUPPORT_2025,    // Free amount
    SCSI_SOLIDARITY           // Cameroon Survival Initiative
}

enum class PaymentMethod {
    MTN_MOMO,
    ORANGE_MONEY,
    EXPRESS_UNION,
    BANK_CARD
}

data class ElectoralReport(
    val id: String,
    val region: String,
    val division: String,
    val pollingStationName: String,
    val incidentType: IncidentType,
    val description: String,
    val latitude: Double? = null,
    val longitude: Double? = null,
    val photoEvidenceUri: String? = null,
    val timestamp: String,
    val status: String = "TRANSMIS_AU_COLLECTIF"
) : Serializable

enum class IncidentType {
    REFUS_INSCRIPTION_ELECAM,
    BURRAGE_D_URNES,
    ABSENCE_BULLETINS_MRC,
    INTIMIDATION_ELECTEURS,
    NON_CONCORDANCE_PV,
    EXPULSION_SCRUTATEURS,
    AUTRE
}

data class Leader(
    val id: String,
    val name: String,
    val role: String,
    val tag: String,
    val bio: String,
    val parcours: String,
    val photoUrl: String? = null,
    val latestStatement: String
) : Serializable

data class HistoryEpoch(
    val year: String,
    val title: String,
    val subtitle: String,
    val content: String,
    val isHighlight: Boolean = false
) : Serializable
