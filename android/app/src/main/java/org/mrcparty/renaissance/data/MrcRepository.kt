package org.mrcparty.renaissance.data

import org.mrcparty.renaissance.model.*
import org.mrcparty.renaissance.util.CryptoUtil
import java.util.UUID

class MrcRepository {

    private var currentMember: Member? = Member.sampleMember()
    private val memberList = mutableListOf<Member>().apply {
        add(Member.sampleMember())
    }
    private val electoralReports = mutableListOf<ElectoralReport>()
    private val donationsHistory = mutableListOf<Donation>()

    fun getCurrentMember(): Member? = currentMember

    fun registerMember(
        surname: String,
        name: String,
        phone: String,
        email: String,
        cniOrPassport: String,
        federation: String,
        region: String,
        division: String = "",
        subDivision: String = "",
        role: MemberRole = MemberRole.MILITANT,
        photoUrl: String? = null
    ): Result<Member> {
        val cleanSurname = surname.trim().uppercase()
        val cleanName = name.trim().uppercase()

        if (cleanSurname.isEmpty() || cleanName.isEmpty()) {
            return Result.failure(IllegalArgumentException("Surname and Name are strictly required."))
        }

        if (!CryptoUtil.validateCameroonPhone(phone)) {
            return Result.failure(IllegalArgumentException("Please enter a valid Cameroon phone number (e.g. 674270549)."))
        }

        val sequence = memberList.size + 62551L + 1
        val memberNum = Member.generateMemberNumber(sequence)
        val date = Member.currentDateString()
        val signature = CryptoUtil.generateDigitalSignature(memberNum, cleanSurname, cleanName, date)
        val qrPayload = CryptoUtil.buildQrPayload(memberNum, signature)

        val newMember = Member(
            id = "mrc_" + UUID.randomUUID().toString().take(8),
            memberNumber = memberNum,
            surname = cleanSurname,
            name = cleanName,
            phone = phone.trim(),
            email = email.trim(),
            cniOrPassport = cniOrPassport.trim(),
            federation = federation.ifBlank { "FÉDÉRATION DU CENTRE 1 - YAOUNDÉ" },
            region = region.ifBlank { "CENTRE" },
            division = division,
            subDivision = subDivision,
            adhesionDate = date,
            price = "1.000 F CFA",
            photoUrl = photoUrl,
            status = MemberStatus.ACTIVE,
            role = role,
            digitalSignature = signature,
            qrCodePayload = qrPayload,
            barcodeData = memberNum
        )

        memberList.add(newMember)
        currentMember = newMember
        return Result.success(newMember)
    }

    fun verifyCard(memberNumber: String, signature: String): Boolean {
        val member = memberList.find { it.memberNumber.equals(memberNumber, ignoreCase = true) }
        return if (member != null) {
            CryptoUtil.verifyCardSignature(
                member.memberNumber,
                member.surname,
                member.name,
                member.adhesionDate,
                signature
            )
        } else {
            // General verification
            signature.isNotBlank() && signature.length >= 8
        }
    }

    fun getArticles(): List<Article> = MockData.articles

    fun getSpeeches(): List<Speech> = MockData.speeches

    fun getFederations(): List<String> = MockData.cameroonFederations

    fun getLeaders(): List<Leader> = MockData.leaders

    fun getHistoryEpochs(): List<HistoryEpoch> = MockData.historyEpochs

    fun submitElectoralReport(
        region: String,
        division: String,
        pollingStationName: String,
        incidentType: IncidentType,
        description: String,
        lat: Double? = null,
        lng: Double? = null
    ): ElectoralReport {
        val report = ElectoralReport(
            id = "REP_" + UUID.randomUUID().toString().take(6).uppercase(),
            region = region,
            division = division,
            pollingStationName = pollingStationName,
            incidentType = incidentType,
            description = description,
            latitude = lat,
            longitude = lng,
            timestamp = Member.currentDateString()
        )
        electoralReports.add(report)
        return report
    }

    fun getElectoralReports(): List<ElectoralReport> = electoralReports.toList()

    fun processPayment(
        amountCfa: Long,
        phone: String,
        method: PaymentMethod,
        type: DonationType
    ): Result<Donation> {
        if (amountCfa < 500) {
            return Result.failure(IllegalArgumentException("Minimum transaction amount is 500 F CFA."))
        }
        val txRef = "MRC-TX-" + System.currentTimeMillis().toString().takeLast(8)
        val donation = Donation(
            id = "don_" + UUID.randomUUID().toString().take(6),
            donorName = currentMember?.fullName ?: "Militant MRC",
            phone = phone,
            amountCfa = amountCfa,
            type = type,
            paymentMethod = method,
            transactionRef = txRef,
            date = Member.currentDateString()
        )
        donationsHistory.add(donation)
        return Result.success(donation)
    }

    fun getDonations(): List<Donation> = donationsHistory.toList()
}
