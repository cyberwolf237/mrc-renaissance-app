package org.mrcparty.renaissance.model

import java.io.Serializable
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

/**
 * Represents an official member of the Cameroon Renaissance Movement (MRC - CRM).
 * Structured faithfully to match the official physical membership card issued by the party.
 */
data class Member(
    val id: String,
    val memberNumber: String,        // e.g. "SU00062551"
    val surname: String,             // Prenom e.g. "CYRILLE"
    val name: String,                // Nom e.g. "EDOU"
    val phone: String,               // Tel e.g. "659452898"
    val email: String = "",
    val cniOrPassport: String = "",
    val federation: String,          // e.g. "FD COM SANGMELIMA OWONO MIMBO'O"
    val region: String,              // e.g. "SUD", "LITTORAL", "CENTRE", "DIASPORA EUROPE"
    val division: String = "",       // e.g. "Dja-et-Lobo"
    val subDivision: String = "",    // e.g. "Sangmelima"
    val adhesionDate: String,        // e.g. "19/02/2024"
    val price: String = "1.000 F CFA",
    val photoUrl: String? = null,
    val status: MemberStatus = MemberStatus.ACTIVE,
    val role: MemberRole = MemberRole.MILITANT,
    val digitalSignature: String = "", // Cryptographic verification hash
    val qrCodePayload: String = "",
    val barcodeData: String = ""
) : Serializable {

    val fullName: String
        get() = "$surname $name".trim()

    val formattedPhone: String
        get() = if (phone.startsWith("+237")) phone else "(+237) $phone"

    companion object {
        /**
         * Sample verified member model reflecting the physical card uploaded:
         * CYRILLE EDOU - Sangmelima Owono Mimbo'o - SU00062551 - 19/02/2024
         */
        fun sampleMember(): Member {
            val num = "SU00062551"
            val hash = "MRC-VERIFIED-$num-19022024-KAMTO-OK"
            return Member(
                id = "mrc_usr_001",
                memberNumber = num,
                surname = "CYRILLE",
                name = "EDOU",
                phone = "659452898",
                email = "cyrille.edou@mrcparty.org",
                cniOrPassport = "1182930491",
                federation = "FD COM SANGMELIMA OWONO MIMBO'O",
                region = "SUD",
                division = "Dja-et-Lobo",
                subDivision = "Sangmelima",
                adhesionDate = "19/02/2024",
                price = "1.000 F CFA",
                photoUrl = null,
                status = MemberStatus.ACTIVE,
                role = MemberRole.MILITANT,
                digitalSignature = hash,
                qrCodePayload = "https://mrcparty.net/verify-card?id=$num&hash=$hash",
                barcodeData = num
            )
        }

        fun generateMemberNumber(sequence: Long): String {
            return String.format(Locale.US, "SU%08d", sequence)
        }

        fun currentDateString(): String {
            val sdf = SimpleDateFormat("dd/MM/yyyy", Locale.US)
            return sdf.format(Date())
        }
    }
}

enum class MemberStatus {
    ACTIVE,
    PENDING_VERIFICATION,
    HONORARY,
    SUSPENDED
}

enum class MemberRole {
    MILITANT,
    JEUNESSE_MRC,
    FEMMES_MRC,
    CADRE,
    SECRETAIRE_FEDERATION,
    OBSERVATEUR_SENTINELLE
}
