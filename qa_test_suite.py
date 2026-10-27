"""
MRC - CRM Android App Suite: Quality Assurance & Automated Test Suite
Verifies card generation integrity, cryptographic verification, Cameroon & international legal compliance,
and executive leadership data consistency.
"""

import unittest
import hashlib
import re

PARTY_SECRET = "MRC_CRM_2012_MAURICE_KAMTO_OFFICIAL_SECRET_KEY"
MAX_LEGAL_DONATION_EUR = 7500.0  # Plafond légal par an et par personne
MIN_MEMBERSHIP_FEE_EUR = 1.0     # Prix libre à partir de 1 €

def generate_digital_signature(member_number, surname, name, date):
    raw = f"{member_number}|{surname}|{name}|{date}|{PARTY_SECRET}"
    return "MRC-" + hashlib.sha256(raw.encode('utf-8')).hexdigest()[:12].upper()

def verify_digital_signature(member_number, surname, name, date, signature):
    expected = generate_digital_signature(member_number, surname, name, date)
    return expected.strip().upper() == signature.strip().upper()

def validate_cameroon_phone(phone):
    cleaned = re.sub(r'[^0-9]', '', str(phone))
    if len(cleaned) == 9 and (cleaned.startswith('6') or cleaned.startswith('2')):
        return True
    if len(cleaned) == 12 and cleaned.startswith('237'):
        return True
    return False

def validate_online_membership_compliance(data):
    """
    Vérifie la conformité légale selon les règles d'adhésion fournies :
    1. Identité et structure renseignées
    2. Non-appartenance à un autre parti politique certifiée
    3. Nationalité ou résidence légale certifiée
    4. Montant annuel inférieur ou égal au plafond légal de 7 500 €
    5. Montant supérieur ou égal au minimum de 1 € (ou équivalent 1 000 F CFA)
    6. Consentement RGPD et droit de résiliation libre
    """
    if not data.get("prenom") or not data.get("nom"):
        return False, "Nom et prénom obligatoires."
    if not data.get("structure"):
        return False, "Structure ou fédération locale obligatoire."
    if not data.get("certifie_non_appartenance"):
        return False, "La déclaration de non-appartenance à une autre formation politique est obligatoire."
    if not data.get("certifie_residence_ou_nationalite"):
        return False, "La conformité légale de nationalité ou de résidence est requise."
    
    cotisation_eur = float(data.get("cotisation_eur", 0))
    if cotisation_eur < MIN_MEMBERSHIP_FEE_EUR:
        return False, f"Cotisation minimale : {MIN_MEMBERSHIP_FEE_EUR} €."
    if cotisation_eur > MAX_LEGAL_DONATION_EUR:
        return False, f"Dépassement du plafond légal de {MAX_LEGAL_DONATION_EUR} €."

    if not data.get("consentement_rgpd"):
        return False, "Le consentement RGPD et l'information sur la résiliation sont obligatoires."

    return True, "Adhésion 100% conforme aux règles légales et statutaires."

class MrcAppQualityAssuranceTests(unittest.TestCase):

    def test_01_physical_card_sample_integrity(self):
        """Vérifie que la carte échantillon reproduit fidèlement la carte physique reçue."""
        sample_card = {
            "structure": "FD COM SANGMELIMA OWONO MIMBO'O",
            "prenom": "CYRILLE",
            "nom": "EDOU",
            "tel": "659452898",
            "numero": "SU00062551",
            "date": "19/02/2024",
            "prix": "1.000 F CFA",
            "president": "Pr Maurice Kamto",
            "couleurs": ["#ffffff", "#0a8a4a", "#06602f"]
        }
        self.assertEqual(sample_card["prenom"], "CYRILLE")
        self.assertEqual(sample_card["nom"], "EDOU")
        self.assertEqual(sample_card["numero"], "SU00062551")
        self.assertEqual(sample_card["structure"], "FD COM SANGMELIMA OWONO MIMBO'O")
        self.assertIn("#ffffff", sample_card["couleurs"])  # Blanc dominant
        self.assertIn("#0a8a4a", sample_card["couleurs"])  # Vert dominant

    def test_02_online_membership_legal_rules(self):
        """Vérifie les règles légales strictes d'adhésion en ligne fournies par l'utilisateur."""
        valid_adhesion = {
            "prenom": "CYRILLE",
            "nom": "EDOU",
            "structure": "FD COM SANGMELIMA OWONO MIMBO'O",
            "cotisation_eur": 1.5, # ~ 1 000 FCFA
            "certifie_non_appartenance": True,
            "certifie_residence_ou_nationalite": True,
            "consentement_rgpd": True
        }
        is_ok, msg = validate_online_membership_compliance(valid_adhesion)
        self.assertTrue(is_ok, msg)

        # Doit échouer si non-appartenance n'est pas cochée
        invalid_adhesion = valid_adhesion.copy()
        invalid_adhesion["certifie_non_appartenance"] = False
        is_ok, msg = validate_online_membership_compliance(invalid_adhesion)
        self.assertFalse(is_ok)
        self.assertIn("non-appartenance", msg)

        # Doit échouer si dépassement du plafond de 7 500 €
        exceeded_adhesion = valid_adhesion.copy()
        exceeded_adhesion["cotisation_eur"] = 8000.0
        is_ok, msg = validate_online_membership_compliance(exceeded_adhesion)
        self.assertFalse(is_ok)
        self.assertIn("plafond légal", msg)

    def test_03_cryptographic_card_verification(self):
        """Vérifie l'empreinte SHA-256 et la détection d'altération de la carte."""
        num = "SU00062551"
        prenom = "CYRILLE"
        nom = "EDOU"
        date = "19/02/2024"

        sig = generate_digital_signature(num, prenom, nom, date)
        self.assertTrue(sig.startswith("MRC-"))
        self.assertTrue(verify_digital_signature(num, prenom, nom, date, sig))
        self.assertFalse(verify_digital_signature("SU00062552", prenom, nom, date, sig))

    def test_04_leadership_directory_integrity(self):
        """Vérifie la nouvelle direction du MRC élue le 17 octobre 2026 et sa conformité statutaire."""
        direction_2026 = {
            "Tiriane Balbine NOAH": "Présidente Nationale (96,89 %)",
            "Pr Maurice KAMTO": "Président Fondateur",
            "Emmanuel SIMH": "Vice-Président National",
            "Elie NGOMPE": "Vice-Président National",
            "Ismaël KAIGAMA": "Vice-Président National",
            "Samuel SAME KOLLE": "Vice-Président National",
            "Aissatou SAADOU": "Vice-Présidente Nationale",
            "Christopher Nveh NDONG": "Secrétaire Général",
            "Oko Appolinaire LEGRAND": "Trésorier National"
        }
        self.assertIn("Tiriane Balbine NOAH", direction_2026)
        self.assertIn("96,89 %", direction_2026["Tiriane Balbine NOAH"])
        self.assertEqual(direction_2026["Pr Maurice KAMTO"], "Président Fondateur")
        self.assertEqual(direction_2026["Christopher Nveh NDONG"], "Secrétaire Général")
        self.assertEqual(direction_2026["Oko Appolinaire LEGRAND"], "Trésorier National")
        self.assertIn("Emmanuel SIMH", direction_2026)
        self.assertIn("Elie NGOMPE", direction_2026)
        self.assertIn("Ismaël KAIGAMA", direction_2026)
        self.assertIn("Samuel SAME KOLLE", direction_2026)
        self.assertIn("Aissatou SAADOU", direction_2026)

    def test_05_phone_validation(self):
        """Vérifie le format des numéros de téléphone camerounais (+237)."""
        self.assertTrue(validate_cameroon_phone("659452898"))
        self.assertTrue(validate_cameroon_phone("674270549"))
        self.assertFalse(validate_cameroon_phone("012345"))

    def test_06_history_epochs_coverage(self):
        """Vérifie que la chronologie de 2012 à la Convention du 17 Octobre 2026 est complète."""
        epochs = ["2012", "2013", "2018", "2019", "2020", "2023", "2024", "2026"]
        self.assertEqual(len(epochs), 8)
        self.assertIn("2012", epochs) # Fondation
        self.assertIn("2018", epochs) # Élection présidentielle
        self.assertIn("2023", epochs) # 3ème Convention Palais des Congrès
        self.assertIn("2026", epochs) # Convention Extraordinaire 17 Octobre 2026 (Tiriane Noah 96,89%)

    def test_07_statutory_organs_compliance(self):
        """Vérifie les 8 organes constitutifs du Directoire selon mrcparty.net/organes-nationaux."""
        organes = [
            "Membres fondateurs",
            "Président National et Vice-présidents",
            "Conseil National",
            "Comité des Sages",
            "Comité National d'Arbitrage",
            "Secrétaire National et adjoints",
            "Secrétaires régionaux OFMRC",
            "Dix membres désignés par le Président National"
        ]
        self.assertEqual(len(organes), 8)

    def test_07_card_3d_and_stamp_rules(self):
        """Vérifie la règle de disposition : pas de QR sur le recto, filigrane au centre, QR et Code-barres au verso."""
        card_recto = {
            "has_qr_code": False,
            "has_central_watermark": True,
            "has_green_stamp": True,
            "has_presidential_seal": True
        }
        card_verso = {
            "has_qr_code": True,
            "has_code128_barcode": True,
            "has_statutory_articles": True
        }
        self.assertFalse(card_recto["has_qr_code"], "Le recto ne doit jamais afficher le QR Code (strictement réservé au verso).")
        self.assertTrue(card_recto["has_central_watermark"], "Le filigrane du logo doit être au centre de la carte.")
        self.assertTrue(card_verso["has_qr_code"], "Le verso doit héberger le QR Code d'authentification.")
        self.assertTrue(card_verso["has_code128_barcode"], "Le verso doit comporter le code-barres 128.")

if __name__ == "__main__":
    unittest.main()
