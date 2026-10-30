/**
 * MRC - MOUVEMENT POUR LA RENAISSANCE DU CAMEROUN
 * Moteur Applicatif & Contrôleur Officiel :: Bilingue (FR/EN)
 * Gestion 3D ISO-7810, Numérotation Luhn, Veille Sentinelle & Directoire 2026
 */

// ─── CONFIGURATION OFFICIELLE ───────────────────────────────────────
const CONFIG = {
  nomFr: "MOUVEMENT POUR LA<br>RENAISSANCE DU CAMEROUN",
  nomEn: "CAMEROON RENAISSANCE<br>MOVEMENT",
  sigle: "MRC",
  sigleEn: "CRM",
  autorisation: "Autorisation MINATD N°000221 du 25 Juillet 2008 / Lettre MINATD N°0002249/LMINATD/DAP/SDE/STP du 02 Août 2012",
  logoUrl: "assets/logo_mrc_round.jpg",
  cachetUrl: "assets/cachet_mrc_exact.png",
  signatureUrl: "assets/signature_kamto_exact.png",
  siteWeb: "www.mrcparty.org",
  contact: "(+237) 674 27 05 49",
  siege: "Siège : Centre Médical d'Odza, Yaoundé",
  prefixeNumero: "MRC",
  validiteAnnees: 3,
  urlVerification: "https://mrcparty.net/verifier?n="
};

// ─── RÉGIONS & DÉPARTEMENTS DU CAMEROUN (10 Régions, 58 Départements)
const REGIONS = {
  "Centre": { code: "CEN", deps: ["Haute-Sanaga", "Lekié", "Mbam-et-Inoubou", "Mbam-et-Kim", "Méfou-et-Afamba", "Méfou-et-Akono", "Mfoundi", "Nyong-et-Kéllé", "Nyong-et-Mfoumou", "Nyong-et-So'o"] },
  "Littoral": { code: "LIT", deps: ["Moungo", "Nkam", "Sanaga-Maritime", "Wouri"] },
  "Ouest": { code: "OUE", deps: ["Bamboutos", "Haut-Nkam", "Hauts-Plateaux", "Koung-Khi", "Menoua", "Mifi", "Ndé", "Noun"] },
  "Sud": { code: "SUD", deps: ["Dja-et-Lobo", "Mvila", "Océan", "Vallée-du-Ntem"] },
  "Adamaoua": { code: "ADA", deps: ["Djérem", "Faro-et-Déo", "Mayo-Banyo", "Mbéré", "Vina"] },
  "Nord": { code: "NRD", deps: ["Bénoué", "Faro", "Mayo-Louti", "Mayo-Rey"] },
  "Extrême-Nord": { code: "EXN", deps: ["Diamaré", "Logone-et-Chari", "Mayo-Danay", "Mayo-Kani", "Mayo-Sava", "Mayo-Tsanaga"] },
  "Nord-Ouest": { code: "NWS", deps: ["Boyo", "Bui", "Donga-Mantung", "Menchum", "Mezam", "Momo", "Ngo-Ketunjia"] },
  "Sud-Ouest": { code: "SWS", deps: ["Fako", "Koupé-Manengouba", "Lebialem", "Manyu", "Meme", "Ndian"] },
  "Est": { code: "EST", deps: ["Boumba-et-Ngoko", "Haut-Nyong", "Kadey", "Lom-et-Djérem"] }
};

// ─── TYPES DE STRUCTURES DU MRC ─────────────────────────────────────
const TYPES_STRUCTURE = {
  comm: { label: "Fédération Communale", abbr: "FD COM", besoin: ["region", "dept", "lieu"], lieuLabel: "Commune / Arrondissement" },
  dept: { label: "Fédération Départementale", abbr: "FD DEP", besoin: ["region", "dept"] },
  reg: { label: "Fédération Régionale", abbr: "FD REG", besoin: ["region"] },
  unite: { label: "Unité de Base", abbr: "UNITÉ", besoin: ["region", "dept", "lieu"], lieuLabel: "Quartier / Village / Unité" },
  diaspora: { label: "Fédération de la Diaspora", abbr: "DIASPORA", besoin: ["lieu"], lieuLabel: "Pays & Ville de Résidence" }
};

// ─── DICTIONNAIRE BILINGUE OFFICIEL (FR / EN) ───────────────────────
const I18N = {
  FR: {
    app_title: "MRC",
    app_subtitle: "Renaissance du Cameroun",
    nav_card: "Ma Carte",
    nav_adhesion: "Adhésion & Profil",
    nav_directoire: "Le Directoire",
    nav_depeches: "Dépêches & Veille",
    nav_histoire: "Histoire (2012-2026)",
    nav_settings: "Paramètres",
    card_front_title_fr: "CARTE DE MEMBRE",
    card_front_title_en: "MEMBERSHIP CARD",
    field_branch: "Structure",
    field_surname: "Prénom",
    field_name: "Nom",
    field_phone: "Tél.",
    field_number: "N°",
    field_date: "Date d'adhésion",
    pres_label: "La Présidente Nationale",
    verso_banner: "CARTE PERSONNELLE ET INCESSIBLE · PERSONAL AND NON-TRANSFERABLE",
    statutes_title: "Droits et devoirs du membre",
    meta_member_no: "N° de membre",
    meta_validity: "Valable jusqu'au",
    meta_structure: "Structure",
    meta_date: "Adhésion",
    member_signature_label: "Signature du titulaire",
    qr_hint: "Scannez pour afficher toutes les informations officielles du membre",
    btn_flip_card: "Retourner la carte (3D)",
    btn_verify: "Contrôle QR",
    form_title: "Formulaire d'Enregistrement Officiel & Attribution du Numéro",
    photo_upload_title: "Photo d'Identité du Membre",
    photo_upload_hint: "Visible sur votre carte d'adhérent numérique officielle (Format JPG/PNG)",
    btn_choose_photo: "Choisir ma photo",
    label_surname: "Prénom",
    label_name: "Nom",
    label_phone: "Téléphone / WhatsApp (+237)",
    label_cni: "N° CNI ou Passeport",
    label_date: "Date d'adhésion",
    label_type_structure: "Type de Structure (Branche)",
    label_region: "Région",
    label_dept: "Département",
    label_commune: "Commune / Arrondissement",
    label_number_auto: "N° de membre (Généré Automatiquement)",
    btn_save_member: "Enregistrer et Mettre à Jour la Carte",
    btn_new_member: "Nouveau Membre",
    dir_badge: "Convention Nationale du 17 Octobre 2026",
    dir_title: "Direction Stratégique du Mouvement pour la Renaissance du Cameroun",
    dir_subtitle: "Élection triomphale de Tiriane Balbine Noah à la Présidence Nationale (96,89%) & Direction collégiale unie.",
    sentinel_active: "Veille Sentinelle Active",
    sentinel_bots_count: "1 240 canaux scrutés en continu • Filtre anti-fake news actif",
    btn_run_scan: "Lancer la Sentinelle (Scan Réseaux)",
    hist_title: "Histoire Complète & Épopée Républicaine du MRC",
    hist_subtitle: "De la fondation fondatrice le 13 août 2012 au passage de témoin historique du 17 octobre 2026. Tout est documenté.",
    set_appearance: "Apparence & Interface",
    set_dark_mode: "Thème Sombre (Dark Mode)",
    set_dark_mode_desc: "Améliore le confort de lecture la nuit et réduit la consommation de batterie",
    set_lang: "Langue de l'application (Bilingue)",
    set_lang_desc: "Français ou English officiel du Cameroun",
    set_security: "Protection & Ligne Juridique",
    set_sos_title: "SOS Militant & Assistance Immédiate",
    set_sos_desc: "Numéro officiel d'urgence du Collectif des Avocats du MRC en cas d'interpellation",
    set_update_title: "Mise à Jour de l'Application",
    set_version_title: "Version installée : 2.0.0",
    set_version_desc: "Mises à jour automatiques transparentes sans désinstallation",
    btn_check_update: "Vérifier",
    set_legal: "Mentions Officielles & Cadre Statutaire"
  },
  EN: {
    app_title: "MRC",
    app_subtitle: "Cameroon Renaissance",
    nav_card: "My Card",
    nav_adhesion: "Join & Profile",
    nav_directoire: "Leadership",
    nav_depeches: "News & Monitor",
    nav_histoire: "History (2012-2026)",
    nav_settings: "Settings",
    card_front_title_fr: "CARTE DE MEMBRE",
    card_front_title_en: "MEMBERSHIP CARD",
    field_branch: "Structure",
    field_surname: "Surname",
    field_name: "Name",
    field_phone: "Phone",
    field_number: "No.",
    field_date: "Membership date",
    pres_label: "The National President",
    verso_banner: "PERSONAL AND NON-TRANSFERABLE · CARTE PERSONNELLE ET INCESSIBLE",
    statutes_title: "Member rights and duties",
    meta_member_no: "Member No.",
    meta_validity: "Valid until",
    meta_structure: "Branch",
    meta_date: "Registration",
    member_signature_label: "Holder's Signature",
    qr_hint: "Scan to display all official member details",
    btn_flip_card: "Flip Card (3D)",
    btn_verify: "QR Verify",
    form_title: "Official Member Registration & Automatic Number Assignment",
    photo_upload_title: "Member Identity Photo",
    photo_upload_hint: "Displayed on your official digital card (JPG/PNG)",
    btn_choose_photo: "Upload Photo",
    label_surname: "First Name / Surname",
    label_name: "Last Name",
    label_phone: "Phone / WhatsApp (+237)",
    label_cni: "National ID / Passport No.",
    label_date: "Registration Date",
    label_type_structure: "Structure Type (Branch)",
    label_region: "Region",
    label_dept: "Division / Department",
    label_commune: "Sub-Division / City",
    label_number_auto: "Member Number (Auto Generated)",
    btn_save_member: "Save & Update Membership Card",
    btn_new_member: "New Member",
    dir_badge: "Extraordinary National Convention - Oct 17, 2026",
    dir_title: "Strategic Executive of Cameroon Renaissance Movement",
    dir_subtitle: "Landslide election of Tiriane Balbine Noah as National President (96.89%) & United leadership.",
    sentinel_active: "Live Sentinel Monitor Active",
    sentinel_bots_count: "1,240 channels monitored continuously • Anti-fake news filter active",
    btn_run_scan: "Trigger Network Scanner",
    hist_title: "Comprehensive History & Republican Journey of the MRC",
    hist_subtitle: "From foundation on August 13, 2012 to democratic transition on October 17, 2026. Every detail documented.",
    set_appearance: "Appearance & Interface",
    set_dark_mode: "Dark Theme (Dark Mode)",
    set_dark_mode_desc: "Improves reading comfort at night and preserves battery",
    set_lang: "App Language (Bilingual)",
    set_lang_desc: "Official French or English of Cameroon",
    set_security: "Legal Defense & Protection",
    set_sos_title: "Activist SOS & Immediate Assistance",
    set_sos_desc: "Official emergency contact for MRC Defense Lawyers in case of arbitrary arrest",
    set_update_title: "App Updates",
    set_version_title: "Installed Version: 2.0.0",
    set_version_desc: "Seamless in-app updates without uninstallation",
    btn_check_update: "Check",
    set_legal: "Legal Notice & Party Statutes"
  }
};

// ─── ÉTAT GLOBAL DE L'APPLICATION ───────────────────────────────────
let appState = {
  lang: localStorage.getItem('mrc_lang') || 'FR',
  theme: localStorage.getItem('mrc_theme') || 'light',
  isCardFlipped: false,
  memberPhoto: localStorage.getItem('mrc_photo') || null,
  member: {
    prenom: "CYRILLE",
    nom: "EDOU",
    tel: "659452898",
    cni: "108945210",
    date: "2024-02-19",
    type: "comm",
    region: "Sud",
    dept: "Dja-et-Lobo",
    lieu: "Sangmélima Owono Mimbo'o",
    numero: "MRC-SUD-24-000001-8"
  }
};

// ─── DIRECTOIRE NATIONAL (CONVENTION OCTOBRE 2026) ──────────────────
const LEADERS = [
  {
    id: "tiriane",
    nom: "Tiriane Balbine Nadège NOAH",
    roleFr: "Présidente Nationale du MRC (Élue à 96,89 %)",
    roleEn: "National President of the CRM (Elected at 96.89%)",
    badge: "PRÉSIDENTE NATIONALE",
    photo: "assets/presidente_tiriane_noah.png",
    bio: "Cadre supérieure de gestion, figure emblématique de la résistance démocratique pacifique. Portée à la présidence du parti lors de la Convention Nationale Extraordinaire du 17 octobre 2026 avec 96,89 % des suffrages exprimés.",
    parcours: "Militante de la première heure, elle a assuré avec sang-froid et courage la direction par intérim du parti en 2019 lors de l'incarcération des leaders à Kondengui. Elle incarne le renouveau, l'unité et la conquête pacifique du pouvoir par les urnes."
  },
  {
    id: "kamto",
    nom: "Pr Maurice KAMTO",
    roleFr: "Président Fondateur du MRC & Membre du Directoire",
    roleEn: "Founding President of CRM & Statutory Board Member",
    badge: "PRÉSIDENT FONDATEUR",
    photo: "assets/president_maurice_kamto.jpg",
    bio: "Agrégé des Facultés de Droit, ancien Doyen de la Faculté de Droit de Yaoundé II, ancien Président de la Commission du Droit International de l'ONU. Artisan de la victoire historique de Bakassi devant la Cour Internationale de Justice.",
    parcours: "Ministre démissionnaire le 30 novembre 2011 par sursaut éthique. Fondateur du MRC en 2012, candidat à la présidentielle de 2018, il a insufflé l'élan historique de la Renaissance camerounaise avant de transmettre les rênes exécutives le 17 octobre 2026."
  },
  {
    id: "simh",
    nom: "Me Emmanuel SIMH",
    roleFr: "1er Vice-Président National (Libertés & Justice)",
    roleEn: "1st National Vice-President (Freedoms & Justice)",
    badge: "VICE-PRÉSIDENT",
    photo: null,
    bio: "Avocat éminent au Barreau du Cameroun, Coordonnateur du Collectif des Avocats du MRC.",
    parcours: "Défenseur acharné des militants face aux juridictions militaires d'exception, il veille à la légalité républicaine et aux libertés fondamentales."
  },
  {
    id: "ngompe",
    nom: "Elie NGOMPE",
    roleFr: "Vice-Président National (Implantation Territoriale)",
    roleEn: "National Vice-President (Territorial Organisation)",
    badge: "VICE-PRÉSIDENT",
    photo: null,
    bio: "Pilier organisationnel du parti et stratège de l'enracinement dans les bassins de population.",
    parcours: "Coordonne l'animation des fédérations départementales et communales à travers l'ensemble du territoire national."
  },
  {
    id: "kaigama",
    nom: "Ismaël KAIGAMA",
    roleFr: "Vice-Président National (Représentation du Septentrion)",
    roleEn: "National Vice-President (Northern Regions Delegate)",
    badge: "VICE-PRÉSIDENT",
    photo: null,
    bio: "Haut responsable politique originaire de la région de l'Extrême-Nord.",
    parcours: "Fédérateur des énergies patriotiques dans le Grand Nord (Adamaoua, Nord, Extrême-Nord), engagé pour la justice sociale et l'accès à l'eau et à l'éducation."
  },
  {
    id: "same",
    nom: "Samuel SAME KOLLE",
    roleFr: "Vice-Président National (Études & Prospective)",
    roleEn: "National Vice-President (Policy Studies & Strategy)",
    badge: "VICE-PRÉSIDENT",
    photo: null,
    bio: "Universitaire, chercheur et économiste du développement.",
    parcours: "Responsable de l'élaboration du programme économique et social de la Renaissance et de l'adaptation du projet de société aux défis contemporains."
  },
  {
    id: "saadou",
    nom: "Aïssatou SAADOU",
    roleFr: "Vice-Présidente Nationale (Mobilisation Féminine & OFMRC)",
    roleEn: "National Vice-President (Women Mobilisation & OFMRC)",
    badge: "VICE-PRÉSIDENTE",
    photo: null,
    bio: "Présidente de l'Organisation des Femmes du MRC (OFMRC), leader communautaire respectée.",
    parcours: "Mobilise les femmes camerounaises pour leur émancipation économique, leur inscription sur les listes électorales et leur participation aux décisions de la nation."
  },
  {
    id: "ndong",
    nom: "Christopher Nveh NDONG",
    roleFr: "Secrétaire Général du Parti",
    roleEn: "Secretary General of the Party",
    badge: "SECRÉTAIRE GÉNÉRAL",
    photo: null,
    bio: "Haut fonctionnaire politique bilingue, cheville ouvrière de l'administration centrale du MRC.",
    parcours: "Garant de l'application scrupuleuse des résolutions du Directoire, de la coordination avec les régions anglophones (Nord-Ouest et Sud-Ouest) et de la discipline statutaire."
  },
  {
    id: "legrand",
    nom: "Oko Appolinaire LEGRAND",
    roleFr: "Trésorier National du MRC",
    roleEn: "National Treasurer of the CRM",
    badge: "TRÉSORIER NATIONAL",
    photo: null,
    bio: "Gestionnaire financier chevronné, responsable de la transparence comptable.",
    parcours: "Assure la gestion rigoureuse des cotisations des membres, des dons légaux et la délivrance des reçus de trésorerie officielle."
  }
];

// ─── FRESQUE HISTORIQUE EXHAUSTIVE (2012 - 2026) ─────────────────────
const HISTOIRE = [
  {
    annee: "13 Août 2012",
    titre: "Fondation du MRC & Le Discours Historique de Maurice Kamto",
    desc: "Le Mouvement pour la Renaissance du Cameroun (MRC) est officiellement porté sur les fonts baptismaux à Yaoundé. Issu de la fusion du Mouvement Républicain et de l'adhésion massive d'intellectuels et patriotes, Maurice Kamto prononce sa déclaration de foi inaugurale : 'Changer l'avenir dans la paix et par les urnes'. Le parti adopte le vert républicain et place la justice sociale et l'État de droit au cœur de son projet."
  },
  {
    annee: "Septembre 2013",
    titre: "Le Baptême du Feu Électoral & Entrée à l'Assemblée Nationale",
    desc: "Un an seulement après sa création, le MRC prend part aux élections législatives et municipales du 30 septembre 2013. Malgré les manœuvres administratives, le parti fait son entrée historique au Parlement avec un député courageux (Hon. Lazare Soub) et conquiert plusieurs conseillers municipaux, démontrant son ancrage national."
  },
  {
    annee: "2014 - 2017",
    titre: "Structuration Nationale & Alertes Prémonitoires sur la Crise Anglophone",
    desc: "Le MRC implante ses fédérations régionales, départementales et communales dans les 10 régions du pays et structure sa diaspora. Face au déclenchement de la crise dans le Nord-Ouest et le Sud-Ouest (NOSO) dès fin 2016, Maurice Kamto est le premier leader politique national à se rendre sur le terrain pour exiger un dialogue inclusif et rejeter la solution militaire."
  },
  {
    annee: "Octobre 2018",
    titre: "La Campagne Triomphale & Le Mémorable Contentieux Électoral",
    desc: "Candidat du MRC et d'une large coalition républicaine, Maurice Kamto mène une campagne électorale sans précédent qui soulève des millions de citoyens (marées humaines à Douala New-Bell, Yaoundé, Bafoussam, Garoua). Face au déni du scrutin, les plaidoiries magistrales du MRC retransmises en direct à la CRTV devant le Conseil Constitutionnel marquent à jamais la conscience collective nationale."
  },
  {
    annee: "26 Janvier 2019",
    titre: "Les Marches Blanches Pacifiques & Les 9 Mois de Prison à Kondengui",
    desc: "En réponse au hold-up électoral et pour réclamer l'arrêt de la guerre civile au NOSO, le MRC organise des marches blanches strictement pacifiques. Le 26 et 28 janvier 2019, Maurice Kamto, Christian Penda Ekoka, Alain Fogue, Albert Dzongang et des centaines de militants sont arrêtés et transférés à la prison centrale de Kondengui. La résistance héroïque des patriotes et la pression internationale contraignent le régime à libérer les dirigeants en octobre 2019."
  },
  {
    annee: "Février 2020",
    titre: "Le Boycott Historique de Principe : L'Éthique au-dessus des Postes",
    desc: "Fidèle à ses principes républicains, le MRC décide le boycott des élections législatives et municipales du 9 février 2020. Le parti refuse d'aller à un vote taché du sang des populations du NOSO sans cessez-le-feu préalable et exige une réforme consensuelle du code électoral camerounais."
  },
  {
    annee: "Avril 2020",
    titre: "L'Initiative Citoyenne et Humanitaire SCSI (Survie Cameroun)",
    desc: "Devant les défaillances de l'État face à la pandémie de Covid-19, Maurice Kamto lance l'initiative non-partisane 'Survie Cameroon Survival Initiative' (SCSI). Malgré les persécutions policières et la saisie arbitraire des fonds et du matériel médical, SCSI distribue des dizaines de milliers de kits sanitaires et de masques à travers le pays."
  },
  {
    annee: "22 Septembre 2020",
    titre: "Les Marches Populaires & La Séquestration de Maurice Kamto",
    desc: "Mobilisation citoyenne pacifique le 22 septembre 2020 pour exiger le retour de la paix au NOSO et la réforme d'ELECAM. Maurice Kamto est immédiatement séquestré et assigné à résidence illégale à son domicile de Santa Barbara pendant 89 jours. Des figures majeures comme Alain Fogue, Bibou Nissack et des dizaines de patriotes sont lourdement condamnés par des tribunaux militaires incompétents."
  },
  {
    annee: "2024 - 2025",
    titre: "L'Opération Inscriptions Massives ELECAM & Sentinelle Citoyenne",
    desc: "Le MRC mène une campagne nationale intense d'enrôlement des jeunes et des femmes sur les listes électorales d'ELECAM, brisant la résignation ambiante. Déploiement des cellules de Sentinelle citoyenne pour surveiller et sécuriser chaque bureau de vote à l'échelle des 360 arrondissements."
  },
  {
    annee: "17 Octobre 2026",
    titre: "Convention Nationale Extraordinaire : Élection de Tiriane Noah à 96,89 %",
    desc: "Moment démocratique historique. À la suite de la démission de Maurice Kamto et Mamadou Mota de la direction exécutive pour impulser une dynamique nouvelle, les délégués des 10 régions élisent Tiriane Balbine Nadège Noah comme Présidente Nationale avec un score éclatant de 96,89 %. Le Pr Maurice Kamto est consacré Président Fondateur et membre statutaire du Directoire. Le MRC affirme sa solidité institutionnelle et se met en ordre de bataille républicain."
  }
];

// ─── DÉPÊCHES OFFICIELLES & FLUX SENTINELLE ──────────────────────────
const DEPECHES = [
  {
    id: 1,
    badge: "COMMUNIQUÉ DU DIRECTOIRE",
    date: "21 Octobre 2026",
    titre: "Investiture Officielle de la Présidente Nationale Tiriane Balbine NOAH",
    contenu: "Le Secrétariat Général du MRC annonce l'entrée en fonction officielle de la Présidente Tiriane Noah, élue avec 96,89% des voix lors de la Convention Nationale. Elle a réaffirmé la priorité absolue accordée à la délivrance des cartes de membre à tous les patriotes camerounais."
  },
  {
    id: 2,
    badge: "TRIBUNE DU PRÉSIDENT FONDATEUR",
    date: "18 Octobre 2026",
    titre: "Pr Maurice Kamto : 'Le flambeau de la Renaissance est entre des mains dignes'",
    contenu: "Dans une déclaration solennelle adressée au peuple camerounais et aux délégations des 10 régions, le Pr Maurice Kamto a félicité la nouvelle équipe dirigeante et a appelé l'ensemble des militants à se mobiliser sans faille derrière la Présidente Tiriane Noah."
  },
  {
    id: 3,
    badge: "ALERTE ELECAM & SENTINELLE",
    date: "12 Octobre 2026",
    titre: "Audit Citoyen des Fichiers Électoraux : Déploiement des Scrutateurs",
    contenu: "La cellule électorale Sentinelle a achevé le recensement préliminaire des bureaux de vote. Le parti exige d'ELECAM la publication intégrale et transparente des listes électorales biométriques dans les antennes communales."
  },
  {
    id: 4,
    badge: "COLLECTIF DES AVOCATS",
    date: "04 Octobre 2026",
    titre: "Me Emmanuel Simh réitère l'exigence de libération des prisonniers d'opinion",
    contenu: "Le Collectif des Avocats du MRC continue sans relâche la bataille judiciaire devant les instances africaines et internationales pour obtenir la libération immédiate et inconditionnelle des patriotes arbitrairement incarcérés depuis septembre 2020."
  }
];

// ─── OUTILS MATHÉMATIQUES & NUMÉROTATION LUHN ────────────────────────
function luhnChecksum(str) {
  let sum = 0, double = true;
  for (let i = str.length - 1; i >= 0; i--) {
    let d = Number(str[i]);
    if (double) { d *= 2; if (d > 9) d -= 9; }
    sum += d; double = !double;
  }
  return (10 - (sum % 10)) % 10;
}

function genererNumeroMembre(regionNom, anneeStr) {
  const regObj = REGIONS[regionNom] || { code: "CEN" };
  const an = (anneeStr || "26").slice(-2);
  const seqBase = "000001"; // Séquence officielle d'adhésion
  const luhn = luhnChecksum(an + seqBase);
  return `${CONFIG.prefixeNumero}-${regObj.code}-${an}-${seqBase}-${luhn}`;
}

// ─── FORMATAGE DE DATES ──────────────────────────────────────────────
function dateIsoEnFr(isoStr) {
  if (!isoStr) return "19/02/2024";
  const [a, m, j] = isoStr.split("-");
  return `${j}/${m}/${a}`;
}

function calculerDateExpiration(dateIsoStr) {
  if (!dateIsoStr) return "19/02/2027";
  const [a, m, j] = dateIsoStr.split("-").map(Number);
  const fin = new Date(a + CONFIG.validiteAnnees, m - 1, j);
  const day = String(fin.getDate()).padStart(2, "0");
  const month = String(fin.getMonth() + 1).padStart(2, "0");
  return `${day}/${month}/${fin.getFullYear()}`;
}

// ─── RENDU DU TEXTE COMPLET POUR LE QR CODE ─────────────────────────
function construireDonneesQR(m) {
  const exp = calculerDateExpiration(m.date);
  const lignes = [
    `${CONFIG.sigle} - CARTE DE MEMBRE OFFICIELLE`,
    `N°: ${m.numero}`,
    `NOM: ${m.nom}`,
    `PRENOM: ${m.prenom}`,
    `CNI: ${m.cni || 'N/A'}`,
    `TEL: ${m.tel}`,
    `STRUCTURE: ${m.structure}`,
    `ADHESION: ${dateIsoEnFr(m.date)}`,
    `VALABLE JUSQU'AU: ${exp}`,
    `PRESIDENCE: Tiriane Balbine NOAH`,
    `PRESIDENT FONDATEUR: Pr Maurice KAMTO`,
    `STATUT: ACTIF ET REGULIER`,
    `VERIFICATION: ${CONFIG.urlVerification}${m.numero}`
  ];
  return lignes.join("\n");
}

// ─── RENDU DE LA CARTE 3D ────────────────────────────────────────────
function actualiserCarte() {
  const m = appState.member;
  
  // Recto
  document.getElementById("cStructure").textContent = m.structure;
  document.getElementById("cPrenom").textContent = m.prenom;
  document.getElementById("cNom").textContent = m.nom;
  document.getElementById("cTel").textContent = m.tel;
  document.getElementById("cNumero").textContent = m.numero;
  document.getElementById("cDate").textContent = dateIsoEnFr(m.date);

  // Verso
  document.getElementById("vNumero").textContent = m.numero;
  document.getElementById("vNumero2").textContent = m.numero;
  document.getElementById("vStructure").textContent = m.structure;
  document.getElementById("vDate").textContent = dateIsoEnFr(m.date);
  document.getElementById("vFin").textContent = calculerDateExpiration(m.date);

  // Photo du membre sur le Recto
  const slotPhoto = document.getElementById("slotPhotoMembre");
  if (appState.memberPhoto) {
    slotPhoto.innerHTML = `<img src="${appState.memberPhoto}" alt="Photo ${m.nom}">`;
  } else {
    slotPhoto.innerHTML = `<i class="fa-solid fa-user photo-titulaire-placeholder"></i>`;
  }

  // QR Code complet au Verso
  const qrBox = document.getElementById("qrBox");
  qrBox.innerHTML = "";
  try {
    new QRCode(qrBox, {
      text: construireDonneesQR(m),
      width: 196,
      height: 196,
      colorDark: "#06602f",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.M
    });
  } catch (err) {
    console.warn("Erreur QRCode library:", err);
  }
}

// ─── ADAPTATION DE L'ÉCHELLE 3D SANS DÉBORDEMENT ─────────────────────
function ajusterEchelleCarte() {
  const wrap = document.getElementById("wrap");
  const scene = document.getElementById("scene");
  if (!wrap || !scene) return;

  const parentWidth = wrap.clientWidth || wrap.parentElement.clientWidth || 360;
  // Largeur maximale garantie pour ne jamais déborder sur mobile
  const scale = Math.min(1, (parentWidth - 16) / 856);
  scene.style.transform = `scale(${scale})`;
  wrap.style.height = `${Math.round(540 * scale)}px`;
}

// ─── RETOURNEMENT 3D PARFAITEMENT IMMOBILE ───────────────────────────
function basculerCarte3D() {
  const carte = document.getElementById("carte3d");
  appState.isCardFlipped = !appState.isCardFlipped;
  if (appState.isCardFlipped) {
    carte.classList.add("is-flipped");
  } else {
    carte.classList.remove("is-flipped");
  }
}

// ─── SYSTÈME DE DIALOGUES MRC PROFESSIONNELS (AUCUN ALERT) ────────────
function showMrcDialog({ title, message, icon = "fa-check", isDanger = false, confirmText = "D'accord", cancelText = null, onConfirm = null }) {
  const backdrop = document.getElementById("mrcDialogBackdrop");
  const titleEl = document.getElementById("mrcDialogTitle");
  const msgEl = document.getElementById("mrcDialogMessage");
  const iconEl = document.getElementById("mrcDialogIcon");
  const btnConfirm = document.getElementById("btnDialogConfirm");
  const btnCancel = document.getElementById("btnDialogCancel");

  titleEl.textContent = title;
  msgEl.textContent = message;
  iconEl.innerHTML = `<i class="fa-solid ${icon}"></i>`;
  iconEl.className = `modal-icon-circle ${isDanger ? 'danger' : ''}`;
  btnConfirm.textContent = confirmText;

  if (cancelText) {
    btnCancel.style.display = "inline-block";
    btnCancel.textContent = cancelText;
  } else {
    btnCancel.style.display = "none";
  }

  backdrop.style.display = "grid";

  btnConfirm.onclick = () => {
    backdrop.style.display = "none";
    if (onConfirm) onConfirm();
  };

  btnCancel.onclick = () => {
    backdrop.style.display = "none";
  };
}

function showMrcToast(message, icon = "fa-circle-check") {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = "mrc-toast";
  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3500);
}

// ─── TRADUCTION & SWITCH BILINGUE FR / EN ─────────────────────────────
function setAppLanguage(lang) {
  appState.lang = lang;
  localStorage.setItem('mrc_lang', lang);
  document.getElementById("currentLangLabel").textContent = lang;
  document.getElementById("selectAppLanguage").value = lang;

  const t = I18N[lang] || I18N.FR;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (t[key]) {
      el.textContent = t[key];
    }
  });

  actualiserListesDirectoire();
}

// ─── GESTION DU THÈME SOMBRE (DARK MODE) ──────────────────────────────
function setAppTheme(theme) {
  appState.theme = theme;
  localStorage.setItem('mrc_theme', theme);
  document.documentElement.setAttribute("data-theme", theme);
  
  const icon = document.getElementById("themeIcon");
  const check = document.getElementById("switchDarkMode");
  if (theme === "dark") {
    icon.className = "fa-solid fa-sun";
    check.checked = true;
  } else {
    icon.className = "fa-solid fa-moon";
    check.checked = false;
  }
}

// ─── LISTES DÉROULANTES DYNAMIQUES DU FORMULAIRE ─────────────────────
function initialiserSelecteursStructure() {
  const selectType = document.getElementById("selectTypeStructure");
  const selectRegion = document.getElementById("selectRegion");
  const selectDept = document.getElementById("selectDept");

  // Remplissage types
  selectType.innerHTML = Object.entries(TYPES_STRUCTURE).map(([k, v]) => 
    `<option value="${k}">${v.label}</option>`
  ).join("");
  selectType.value = appState.member.type || "comm";

  // Remplissage régions
  selectRegion.innerHTML = Object.keys(REGIONS).map(r => 
    `<option value="${r}">${r}</option>`
  ).join("");
  selectRegion.value = appState.member.region || "Sud";

  // Remplissage départements
  actualiserDepartements();

  // Événements
  selectType.addEventListener("change", () => {
    actualiserVisibiliteChamps();
    mettreAJourNumeroAutomatique();
  });
  selectRegion.addEventListener("change", () => {
    actualiserDepartements();
    mettreAJourNumeroAutomatique();
  });
  selectDept.addEventListener("change", mettreAJourNumeroAutomatique);
  document.getElementById("inputDate").addEventListener("change", mettreAJourNumeroAutomatique);

  actualiserVisibiliteChamps();
}

function actualiserDepartements() {
  const regNom = document.getElementById("selectRegion").value;
  const selectDept = document.getElementById("selectDept");
  const deps = REGIONS[regNom] ? REGIONS[regNom].deps : [];
  selectDept.innerHTML = deps.map(d => `<option value="${d}">${d}</option>`).join("");
}

function actualiserVisibiliteChamps() {
  const typeKey = document.getElementById("selectTypeStructure").value;
  const t = TYPES_STRUCTURE[typeKey];
  const gReg = document.getElementById("groupRegion");
  const gDept = document.getElementById("groupDept");
  const gLieu = document.getElementById("groupLieu");
  const lblLieu = document.getElementById("labelLieu");

  gReg.hidden = !t.besoin.includes("region");
  gDept.hidden = !t.besoin.includes("dept");
  gLieu.hidden = !t.besoin.includes("lieu");
  if (t.lieuLabel) lblLieu.textContent = t.lieuLabel;
}

function mettreAJourNumeroAutomatique() {
  const reg = document.getElementById("selectRegion").value;
  const dateVal = document.getElementById("inputDate").value || "2024-02-19";
  const numAuto = genererNumeroMembre(reg, dateVal);
  document.getElementById("inputNumeroAuto").value = numAuto;
}

// ─── RENDU DU DIRECTOIRE ─────────────────────────────────────────────
function actualiserListesDirectoire() {
  const container = document.getElementById("leadersListGrid");
  if (!container) return;
  const isEn = appState.lang === "EN";

  container.innerHTML = LEADERS.map(l => `
    <div class="leader-card" onclick="ouvrirModaleDirigeant('${l.id}')">
      <img src="${l.photo || 'assets/logo_mrc_round.jpg'}" alt="${l.nom}" class="leader-avatar">
      <div class="leader-meta">
        <span class="leader-role-badge">${l.badge}</span>
        <h4>${l.nom}</h4>
        <p style="font-size:11px; color:var(--vert-fonce); font-weight:700; margin-bottom:4px;">
          ${isEn ? l.roleEn : l.roleFr}
        </p>
        <p class="leader-snippet">${l.bio}</p>
      </div>
    </div>
  `).join("");
}

function ouvrirModaleDirigeant(id) {
  const l = LEADERS.find(x => x.id === id);
  if (!l) return;
  const isEn = appState.lang === "EN";
  showMrcDialog({
    title: l.nom,
    message: `${isEn ? l.roleEn : l.roleFr}\n\n${l.bio}\n\nParcours & Engagement :\n${l.parcours}`,
    icon: "fa-award",
    confirmText: isEn ? "Close" : "Fermer"
  });
}

// ─── RENDU DE L'HISTOIRE & DÉPÊCHES ──────────────────────────────────
function actualiserHistoire() {
  const container = document.getElementById("historyTimeline");
  if (!container) return;
  container.innerHTML = HISTOIRE.map((h, i) => `
    <div class="timeline-step ${i === HISTOIRE.length - 1 ? 'highlight' : ''}">
      <div class="timeline-marker"></div>
      <div class="timeline-content">
        <span class="timeline-year-tag">${h.annee}</span>
        <h4>${h.titre}</h4>
        <p>${h.desc}</p>
      </div>
    </div>
  `).join("");
}

function actualiserDepeches() {
  const container = document.getElementById("newsListContainer");
  if (!container) return;
  container.innerHTML = DEPECHES.map(d => `
    <div class="news-item-card" onclick="showMrcDialog({ title: '${d.titre}', message: '${d.contenu}', icon: 'fa-bullhorn' })">
      <div class="news-badge-row">
        <span class="badge-verified-sentinel"><i class="fa-solid fa-circle-check"></i> ${d.badge}</span>
        <span class="news-date">${d.date}</span>
      </div>
      <h4>${d.titre}</h4>
      <p>${d.contenu}</p>
    </div>
  `).join("");
}

// ─── EXPORT DE LA CARTE EN PNG HAUTE DÉFINITION ──────────────────────
async function exporterCartePNG(idElement, nomFichier) {
  showMrcToast(appState.lang === "EN" ? "Generating HD PNG..." : "Génération du PNG HD en cours...", "fa-image");
  try {
    const el = document.getElementById(idElement);
    const canvas = await html2canvas(el, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
      onclone: (doc) => {
        const clone = doc.getElementById(idElement);
        clone.querySelectorAll(".reflet").forEach(r => r.style.display = "none");
        let cur = clone;
        while (cur && cur !== doc.body) {
          cur.style.transform = "none";
          cur.style.perspective = "none";
          cur.style.backfaceVisibility = "visible";
          cur = cur.parentElement;
        }
      }
    });

    const link = document.createElement("a");
    link.download = `MRC-CARTE-${nomFichier}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    showMrcToast(appState.lang === "EN" ? "Card downloaded successfully!" : "Carte téléchargée avec succès !", "fa-circle-check");
  } catch (err) {
    showMrcDialog({
      title: "Export",
      message: "Erreur lors de la capture : " + err.message,
      isDanger: true
    });
  }
}

// ─── INITIALISATION AU CHARGEMENT ────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {

  // Initialisation Langue & Thème
  setAppLanguage(appState.lang);
  setAppTheme(appState.theme);

  // Valeurs initiales formulaire
  document.getElementById("inputDate").value = appState.member.date;
  document.getElementById("inputPrenom").value = appState.member.prenom;
  document.getElementById("inputNom").value = appState.member.nom;
  document.getElementById("inputTel").value = appState.member.tel;
  document.getElementById("inputCni").value = appState.member.cni;
  document.getElementById("inputLieu").value = appState.member.lieu;

  // Initialisation Sélecteurs
  initialiserSelecteursStructure();
  mettreAJourNumeroAutomatique();

  // Photo de profil sauvegardée
  if (appState.memberPhoto) {
    document.getElementById("formPhotoPreview").innerHTML = `<img src="${appState.memberPhoto}" alt="Photo Profil">`;
  }

  // Rendu de la carte & Contenu
  actualiserCarte();
  actualiserListesDirectoire();
  actualiserHistoire();
  actualiserDepeches();
  ajusterEchelleCarte();

  // ─── ÉCOUTEURS D'ÉVÉNEMENTS ──────────────────────────────────────────

  // Retournement 3D
  document.getElementById("scene").addEventListener("click", basculerCarte3D);
  document.getElementById("btnFlipCard").addEventListener("click", basculerCarte3D);

  // Redimensionnement dynamique
  window.addEventListener("resize", ajusterEchelleCarte);

  // Navigation par onglets
  document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", () => {
      document.querySelectorAll(".nav-item").forEach(i => i.classList.remove("active"));
      document.querySelectorAll(".tab-pane").forEach(p => p.classList.remove("active"));

      item.classList.add("active");
      const tabId = item.getAttribute("data-tab");
      const targetPane = document.getElementById(`pane-${tabId}`);
      if (targetPane) targetPane.classList.add("active");

      if (tabId === "carte") {
        setTimeout(ajusterEchelleCarte, 50);
      }
    });
  });

  // Switch Langue Header & Settings
  document.getElementById("btnLangToggle").addEventListener("click", () => {
    const nextLang = appState.lang === "FR" ? "EN" : "FR";
    setAppLanguage(nextLang);
    showMrcToast(nextLang === "FR" ? "Langue : Français" : "Language: English", "fa-globe");
  });
  document.getElementById("selectAppLanguage").addEventListener("change", (e) => {
    setAppLanguage(e.target.value);
  });

  // Switch Thème Header & Settings
  document.getElementById("btnThemeToggle").addEventListener("click", () => {
    const nextTheme = appState.theme === "light" ? "dark" : "light";
    setAppTheme(nextTheme);
  });
  document.getElementById("switchDarkMode").addEventListener("change", (e) => {
    setAppTheme(e.target.checked ? "dark" : "light");
  });

  // Téléversement Photo de Profil
  document.getElementById("photoInput").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        appState.memberPhoto = evt.target.result;
        localStorage.setItem('mrc_photo', appState.memberPhoto);
        document.getElementById("formPhotoPreview").innerHTML = `<img src="${appState.memberPhoto}" alt="Photo">`;
        actualiserCarte();
        showMrcToast(appState.lang === "EN" ? "Profile photo updated!" : "Photo de profil mise à jour !", "fa-camera");
      };
      reader.readAsDataURL(file);
    }
  });

  // Enregistrement Membre depuis le formulaire
  document.getElementById("btnEnregistrerMembre").addEventListener("click", () => {
    const prenom = document.getElementById("inputPrenom").value.trim().toUpperCase();
    const nom = document.getElementById("inputNom").value.trim().toUpperCase();
    const tel = document.getElementById("inputTel").value.trim();
    const cni = document.getElementById("inputCni").value.trim();
    const dateVal = document.getElementById("inputDate").value;
    const typeKey = document.getElementById("selectTypeStructure").value;
    const reg = document.getElementById("selectRegion").value;
    const dept = document.getElementById("selectDept").value;
    const lieu = document.getElementById("inputLieu").value.trim();

    if (!prenom || !nom || !tel) {
      showMrcDialog({
        title: "Validation",
        message: "Veuillez obligatoirement renseigner votre Prénom, Nom et Numéro de Téléphone.",
        icon: "fa-triangle-exclamation",
        isDanger: true
      });
      return;
    }

    const t = TYPES_STRUCTURE[typeKey];
    let structStr = `${t.abbr} ${lieu.toUpperCase()}`;
    if (typeKey === "dept") structStr = `${t.abbr} ${dept.toUpperCase()}`;
    if (typeKey === "reg") structStr = `${t.abbr} ${reg.toUpperCase()}`;

    const numAttribue = genererNumeroMembre(reg, dateVal);

    appState.member = {
      prenom: prenom,
      nom: nom,
      tel: tel,
      cni: cni,
      date: dateVal,
      type: typeKey,
      region: reg,
      dept: dept,
      lieu: lieu,
      structure: structStr,
      numero: numAttribue
    };

    actualiserCarte();

    showMrcDialog({
      title: "Adhésion Enregistrée",
      message: `Félicitations, militant ${prenom} ${nom} !\n\nVotre carte officielle N° ${numAttribue} a été générée et authentifiée sous l'égide de la Présidente Nationale Tiriane Balbine Noah.\n\nStructure : ${structStr}`,
      icon: "fa-circle-check",
      confirmText: "Voir ma Carte 3D",
      onConfirm: () => {
        document.querySelector('[data-tab="carte"]').click();
      }
    });
  });

  // Nouveau membre (réinitialisation formulaire)
  document.getElementById("btnNouveauMembre").addEventListener("click", () => {
    document.getElementById("inputPrenom").value = "";
    document.getElementById("inputNom").value = "";
    document.getElementById("inputTel").value = "";
    document.getElementById("inputCni").value = "";
    document.getElementById("inputLieu").value = "";
    appState.memberPhoto = null;
    localStorage.removeItem('mrc_photo');
    document.getElementById("formPhotoPreview").innerHTML = `<i class="fa-solid fa-user"></i>`;
    document.getElementById("inputPrenom").focus();
    showMrcToast("Formulaire prêt pour un nouveau membre.", "fa-user");
  });

  // Export PNG Recto & Verso
  document.getElementById("btnDownloadRecto").addEventListener("click", () => exporterCartePNG("recto", "RECTO"));
  document.getElementById("btnDownloadVerso").addEventListener("click", () => exporterCartePNG("verso", "VERSO"));

  // Contrôle QR & SOS
  document.getElementById("btnVerifyCard").addEventListener("click", () => {
    showMrcDialog({
      title: "Contrôle d'Authenticité QR",
      message: `Carte N° ${appState.member.numero}\nTitulaire : ${appState.member.prenom} ${appState.member.nom}\nStatut : CERTIFIÉ ACTIF & CONFORME\nPrésidente Nationale : Tiriane Balbine NOAH\nPrésident Fondateur : Pr Maurice KAMTO`,
      icon: "fa-shield-halved"
    });
  });

  document.getElementById("btnSosQuick").addEventListener("click", () => {
    showMrcDialog({
      title: "SOS Militant en Danger",
      message: "En cas d'arrestation arbitraire, d'intimidation ou de garde à vue illégale, contactez immédiatement la permanence officielle du Collectif des Avocats du MRC :\n\n(+237) 674 27 05 49",
      icon: "fa-phone-volume",
      isDanger: true,
      confirmText: "Composer le numéro",
      cancelText: "Fermer",
      onConfirm: () => {
        window.location.href = "tel:+237674270549";
      }
    });
  });

  // Simulation Bots de Veille Réseaux
  document.getElementById("btnRunSentinelScan").addEventListener("click", () => {
    showMrcToast("Scan en direct des réseaux sociaux et flux officiels...", "fa-radar");
    setTimeout(() => {
      showMrcDialog({
        title: "Rapport de Veille Sentinelle",
        message: "Scan complété avec succès sur 1 240 canaux (Réseaux sociaux, ELECAM, MINAT, Dépêches de presse).\n\n• Aucune fausse dépêche détectée sur les canaux officiels du parti.\n• Les déclarations du Directoire et de la Présidente Tiriane Noah sont certifiées conformes.\n• Prochaine synchronisation automatique dans 15 minutes.",
        icon: "fa-radar",
        confirmText: "Fermer"
      });
    }, 1200);
  });

  // Vérificateur de Mises à Jour Automatiques sans désinstallation
  const verifierMisesAJour = async (manuel = false) => {
    if (manuel) {
      showMrcToast(appState.lang === "EN" ? "Checking for updates..." : "Vérification des mises à jour...", "fa-cloud-arrow-down");
    }
    try {
      const res = await fetch("version.json?t=" + Date.now());
      if (res.ok) {
        const data = await res.json();
        const CURRENT_CODE = 2; // Version 2.0.0
        if (data.versionCode > CURRENT_CODE) {
          showMrcDialog({
            title: appState.lang === "EN" ? "🚀 New Version Available!" : "🚀 Nouvelle Version Disponible !",
            message: ${appState.lang === "EN" ? "Version" : "Version"}  ()\n\n\n\n,
            icon: "fa-rocket",
            confirmText: appState.lang === "EN" ? "Update Now" : "Mettre à jour",
            cancelText: appState.lang === "EN" ? "Later" : "Plus tard",
            onConfirm: () => {
              window.location.href = data.apkUrl;
            }
          });
        } else if (manuel) {
          showMrcDialog({
            title: appState.lang === "EN" ? "App is Up to Date" : "Application à Jour",
            message: ${appState.lang === "EN" ? "You are using the latest version of the official MRC app" : "Vous utilisez la dernière version officielle du MRC"} (v2.0.0).\n\n,
            icon: "fa-circle-check",
            confirmText: "Super"
          });
        }
      }
    } catch (e) {
      if (manuel) {
        showMrcToast("Connexion au serveur de mise à jour impossible.", "fa-circle-exclamation");
      }
    }
  };

  const btnUp = document.getElementById("btnCheckUpdates");
  if (btnUp) btnUp.addEventListener("click", () => verifierMisesAJour(true));
  setTimeout(() => verifierMisesAJour(false), 4000);
});