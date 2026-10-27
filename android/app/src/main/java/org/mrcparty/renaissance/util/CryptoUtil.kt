package org.mrcparty.renaissance.util

import java.security.MessageDigest
import javax.crypto.Mac
import javax.crypto.spec.SecretKeySpec

object CryptoUtil {

    private const val PARTY_SECRET = "MRC_CRM_2012_MAURICE_KAMTO_OFFICIAL_SECRET_KEY"

    fun generateDigitalSignature(memberNumber: String, surname: String, name: String, date: String): String {
        val raw = "$memberNumber|$surname|$name|$date|$PARTY_SECRET"
        val md = MessageDigest.getInstance("SHA-256")
        val digest = md.digest(raw.toByteArray(Charsets.UTF_8))
        return digest.joinToString("") { "%02x".format(it) }.take(16).uppercase()
    }

    fun verifyCardSignature(memberNumber: String, surname: String, name: String, date: String, signature: String): Boolean {
        val expected = generateDigitalSignature(memberNumber, surname, name, date)
        return expected.equals(signature.trim(), ignoreCase = true)
    }

    fun buildQrPayload(memberNumber: String, signature: String): String {
        return "https://mrcparty.net/verify-card?id=$memberNumber&sig=$signature"
    }

    fun validateCameroonPhone(phone: String): Boolean {
        val cleaned = phone.replace(Regex("[^0-9]"), "")
        // Cameroon phone numbers are 9 digits starting with 6 (or 2 for landlines), or +237 followed by 9 digits
        return when {
            cleaned.length == 9 && (cleaned.startsWith("6") || cleaned.startsWith("2")) -> true
            cleaned.length == 12 && cleaned.startsWith("237") -> true
            else -> false
        }
    }

    fun formatCameroonPhone(phone: String): String {
        val cleaned = phone.replace(Regex("[^0-9]"), "")
        val local = if (cleaned.startsWith("237") && cleaned.length == 12) {
            cleaned.substring(3)
        } else cleaned

        return if (local.length == 9) {
            "(+237) ${local.substring(0, 3)} ${local.substring(3, 5)} ${local.substring(5, 7)} ${local.substring(7, 9)}"
        } else phone
    }
}
