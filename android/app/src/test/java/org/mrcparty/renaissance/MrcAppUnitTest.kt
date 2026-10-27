package org.mrcparty.renaissance

import org.junit.Assert.*
import org.junit.Before
import org.junit.Test
import org.mrcparty.renaissance.data.MrcRepository
import org.mrcparty.renaissance.model.*
import org.mrcparty.renaissance.util.CryptoUtil

class MrcAppUnitTest {

    private lateinit var repository: MrcRepository

    @Before
    fun setUp() {
        repository = MrcRepository()
    }

    @Test
    fun testPhysicalCardSampleIntegrity() {
        val member = Member.sampleMember()
        assertEquals("CYRILLE", member.surname)
        assertEquals("EDOU", member.name)
        assertEquals("CYRILLE EDOU", member.fullName)
        assertEquals("SU00062551", member.memberNumber)
        assertEquals("19/02/2024", member.adhesionDate)
        assertEquals("1.000 F CFA", member.price)
        assertEquals("FD COM SANGMELIMA OWONO MIMBO'O", member.federation)
        assertEquals(MemberStatus.ACTIVE, member.status)
    }

    @Test
    fun testCameroonPhoneValidation() {
        assertTrue("Valid MTN number", CryptoUtil.validateCameroonPhone("674270549"))
        assertTrue("Valid Orange number", CryptoUtil.validateCameroonPhone("659452898"))
        assertTrue("Valid with country code", CryptoUtil.validateCameroonPhone("+237674270549"))
        assertFalse("Too short number", CryptoUtil.validateCameroonPhone("12345"))
        assertFalse("Invalid prefix", CryptoUtil.validateCameroonPhone("334455667"))
    }

    @Test
    fun testDigitalSignatureCryptographicVerification() {
        val num = "SU00062551"
        val surname = "CYRILLE"
        val name = "EDOU"
        val date = "19/02/2024"

        val sig = CryptoUtil.generateDigitalSignature(num, surname, name, date)
        assertNotNull(sig)
        assertEquals(16, sig.length)

        // Verification must succeed with identical fields
        assertTrue(CryptoUtil.verifyCardSignature(num, surname, name, date, sig))

        // Verification must fail if tampered
        assertFalse(CryptoUtil.verifyCardSignature("SU00062552", surname, name, date, sig))
        assertFalse(CryptoUtil.verifyCardSignature(num, "TAMPERED", name, date, sig))
    }

    @Test
    fun testMemberRegistrationFlow() {
        val result = repository.registerMember(
            surname = "Maurice",
            name = "Kamto",
            phone = "674270549",
            email = "contact@mrcparty.org",
            cniOrPassport = "CNI-2025-YDE",
            federation = "FÉDÉRATION DU CENTRE 1 - YAOUNDÉ",
            region = "CENTRE",
            role = MemberRole.CADRE
        )

        assertTrue(result.isSuccess)
        val member = result.getOrNull()
        assertNotNull(member)
        assertEquals("MAURICE", member!!.surname)
        assertEquals("KAMTO", member.name)
        assertTrue(member.memberNumber.startsWith("SU"))
        assertEquals("1.000 F CFA", member.price)
        assertEquals(repository.getCurrentMember()?.id, member.id)
    }

    @Test
    fun testPaymentProcessing() {
        val paymentResult = repository.processPayment(
            amountCfa = 1000L,
            phone = "674270549",
            method = PaymentMethod.MTN_MOMO,
            type = DonationType.MEMBERSHIP_CARD_FEE
        )

        assertTrue(paymentResult.isSuccess)
        val donation = paymentResult.getOrNull()
        assertNotNull(donation)
        assertEquals(1000L, donation!!.amountCfa)
        assertTrue(donation.transactionRef.startsWith("MRC-TX-"))
        assertEquals(1, repository.getDonations().size)
    }

    @Test
    fun testElectoralSentinelIncidentSubmission() {
        val report = repository.submitElectoralReport(
            region = "LITTORAL",
            division = "Wouri",
            pollingStationName = "École Publique Deido - Bureau 04",
            incidentType = IncidentType.REFUS_INSCRIPTION_ELECAM,
            description = "Agent ELECAM refuse d'inscrire des citoyens majeurs sans motif légal."
        )

        assertNotNull(report.id)
        assertTrue(report.id.startsWith("REP_"))
        assertEquals(1, repository.getElectoralReports().size)
    }
}
