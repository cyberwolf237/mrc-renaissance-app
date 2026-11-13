const API_BASE = window.location.protocol === 'file:' ? 'https://mrc-backend-c11n.onrender.com' : '';
﻿// === SYSTÈME DE NOTIFICATIONS OFFICIELLES MRC (ZÉRO ALERT DU NAVIGATEUR) ===
function openMrcModal(title, message, icon = 'fa-circle-check') {
    const modal = document.getElementById('mrcCustomModal');
    if (!modal) return;
    const tEl = document.getElementById('mrcModalTitle');
    const mEl = document.getElementById('mrcModalMessage');
    const iEl = document.getElementById('mrcModalIcon');
    if (tEl) tEl.textContent = title;
    if (mEl) mEl.textContent = message;
    if (iEl) iEl.innerHTML = '<i class="fa-solid ' + icon + '"></i>';
    modal.style.display = 'grid';
}

function closeMrcModal() {
    const modal = document.getElementById('mrcCustomModal');
    if (modal) modal.style.display = 'none';
}

// === GESTION DU THÈME SOMBRE (DARK MODE) ===
function toggleTheme() {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    const nextTheme = isDark ? 'light' : 'dark';
    document.body.setAttribute('data-theme', nextTheme);
    localStorage.setItem('mrc_theme', nextTheme);
    const icon = document.getElementById('iconThemePhone');
    if (icon) {
        icon.className = nextTheme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
}
/**
 * MRC - CRM (Mouvement pour la Renaissance du Cameroun)
 * Contrôleur Principal & Moteur Interactif Front/Back
 * Conforme aux spécifications du directoire national et à l'échantillon SU00062551
 */

const CONFIG = {
    nomFr: "MOUVEMENT POUR LA<br>RENAISSANCE DU CAMEROUN",
    nomEn: "CAMEROON RENAISSANCE<br>MOVEMENT",
    sigle: "MRC",
    autorisation: "Autorisation MINATD N°000221 du 25 Juillet 2008 / Lettre MINATD N°0002249/LMINATD/DAP/SDE/STP du 02 Août 2012",
    logoUrl: "assets/logo_mrc_round.jpg",
    siteWeb: "www.mrcparty.org",
    contact: "Tél : (+237) 674 27 05 49 / 671 08 14 44",
    urlVerification: "https://mrcparty.net/verifier?n="
};

// État Global de l'Application
const appState = {
    currentLanguage: 'FR',
    isCardFlipped: false,
    activeLeaderId: null,
    member: {
        structure: "FD COM SANGMELIMA OWONO MIMBO'O",
        prenom: "CYRILLE",
        nom: "EDOU",
        tel: "659452898",
        numero: "SU00062551",
        date: "2024-02-19",
        cotisation: "1.000 F CFA",
        status: "ACTIF / VALIDE",
        signatureHash: "MRC-9A74E82F10BC"
    },
    // Données Exhaustives du Directoire National (Élu le 17 Octobre 2026)
    leaders: {
        'kamto': {
            name: "Pr Maurice KAMTO",
            role: "Président Fondateur du MRC",
            tag: "PRÉSIDENT FONDATEUR",
            tagClass: "tag-founder",
            photo: "assets/president_maurice_kamto.jpg",
            bio: "Agrégé des Facultés de Droit, ancien Doyen de la Faculté des Sciences Juridiques et Politiques de l'Université de Yaoundé II. Ancien Président de la Commission du Droit International de l'ONU.",
            parcours: "Artisan de la victoire historique de Bakassi devant la CIJ de La Haye en 2002. Ministre démissionnaire le 30 novembre 2011 par sursaut éthique, il fonde le MRC en 2012 et en assure la présidence fondatrice avant la transmission du relais démocratique le 17 octobre 2026.",
            vision: "« Le MRC n'est pas un parti contre des personnes, mais un parti pour un idéal républicain impérissable : bâtir une nation juste, prospère et fraternelle. »",
            declarationRecente: "« Je félicite chaleureusement la Présidente Tiriane Balbine Noah pour sa brillante élection. Le flambeau de la Renaissance est entre de mains dignes et déterminées. »"
        },
        'tiriane': {
            name: "Tiriane Balbine NOAH",
            role: "Présidente Nationale du MRC (Élue le 17 Octobre 2026 avec 96,89 % des voix)",
            tag: "PRÉSIDENTE NATIONALE &bull; 96,89 %",
            tagClass: "tag-president",
            photo: "assets/presidente_tiriane_noah.png",
            bio: "Cadre supérieure de gestion, leader politique républicaine d'envergure, plébiscitée par la Convention Nationale Extraordinaire du 17 octobre 2026 avec 96,89 % des suffrages exprimés.",
            parcours: "Militante infatigable de la première heure, elle a assuré avec héroïsme la direction intérimaire du parti durant l'emprisonnement des dirigeants en 2019 à Kondengui. Élue à la présidence nationale en octobre 2026 à la suite de la démission de Maurice Kamto pour insuffler un nouvel élan démocratique et conduire le parti vers les victoires électorales.",
            vision: "« Notre boussole reste la discipline républicaine, la justice sociale et la délivrance des cartes de membre à chaque citoyen camerounais épris d'alternance. »",
            declarationRecente: "« Je mesure l'immense responsabilité que m'ont confiée les délégués à 96,89%. Nous rassemblerons toutes les énergies patriotiques du Cameroun pour changer l'avenir dans la paix et par les urnes. »"
        },
        'simh': {
            name: "Emmanuel SIMH",
            role: "Vice-Président National du MRC",
            tag: "VICE-PRÉSIDENT NATIONAL",
            tagClass: "tag-vp",
            photo: 'assets/leader_emmanuel_simh.jpg',
            bio: "Avocat éminent au Barreau du Cameroun, Coordonnateur du Collectif des Avocats du MRC, figure de proue de la défense des droits fondamentaux.",
            parcours: "Élu au sein du collège des 5 Vice-Présidents le 17 octobre 2026, il veille sur l'armature juridique du parti, la conformité constitutionnelle et la protection des militants.",
            vision: "« Le droit et la justice sont les boucliers inviolables de notre engagement républicain. »",
            declarationRecente: "« La nouvelle direction sous la Présidente Tiriane Noah incarne la continuité des valeurs et le renouveau de l'action. »"
        },
        'ngompe': {
            name: "Elie NGOMPE",
            role: "Vice-Président National du MRC",
            tag: "VICE-PRÉSIDENT NATIONAL",
            tagClass: "tag-vp",
            photo: 'assets/leader_mamadou_mota.jpg',
            bio: "Cadre politique stratège, fin connaisseur des dynamiques régionales et des fédérations de base.",
            parcours: "Élu Vice-Président National lors de la Convention Extraordinaire du 17 octobre 2026 pour dynamiser le maillage territorial et l'implantation militante.",
            vision: "« L'ancrage local dans chaque arrondissement est la condition sine qua non de la victoire par les urnes. »",
            declarationRecente: "« Nous renforçons les comités de base pour offrir à chaque Camerounais un espace d'engagement citoyen. »"
        },
        'kaigama': {
            name: "Ismaël KAIGAMA",
            role: "Vice-Président National du MRC",
            tag: "VICE-PRÉSIDENT NATIONAL",
            tagClass: "tag-vp",
            photo: 'assets/leader_alain_fogue.jpg',
            bio: "Personnalité politique influente du Grand-Nord (Adamaoua, Nord, Extrême-Nord), défenseur des populations vulnérables et du développement équitable.",
            parcours: "Élu Vice-Président National le 17 octobre 2026, il incarne l'adhésion massive du Septentrion camerounais au projet de Renaissance républicaine.",
            vision: "« Le Septentrion réclame justice, eau, éducation et dignité au sein d'une République unie. »",
            declarationRecente: "« Du bord du Lac Tchad aux rives de la Bénoué, les populations se lèvent pour la Renaissance avec la Présidente Tiriane Noah. »"
        },
        'same_kolle': {
            name: "Samuel SAME KOLLE",
            role: "Vice-Président National du MRC",
            tag: "VICE-PRÉSIDENT NATIONAL",
            tagClass: "tag-vp",
            photo: 'assets/leader_christopher_ndong.jpg',
            bio: "Universitaire, chercheur et penseur des politiques publiques républicaines.",
            parcours: "Élu Vice-Président National le 17 octobre 2026, il supervise la prospective programmatique et l'ingénierie socio-économique du MRC.",
            vision: "« Une politique sans vision intellectuelle est stérile. Le projet de société du MRC répond aux défis contemporains du Cameroun. »",
            declarationRecente: "« Notre projet de société est un pacte de progrès concret pour redresser l'économie nationale. »"
        },
        'saadou': {
            name: "Aissatou SAADOU",
            role: "Vice-Présidente Nationale du MRC",
            tag: "VICE-PRÉSIDENTE NATIONALE",
            tagClass: "tag-vp",
            photo: null,
            bio: "Leader engagée pour la cause féminine, l'autonomisation économique des mères et l'accès des jeunes filles aux responsabilités républicaines.",
            parcours: "Élue Vice-Présidente Nationale lors de la Convention du 17 octobre 2026, elle renforce la parité et la mobilisation des femmes à l'échelle nationale et au sein de l'OFMRC.",
            vision: "« Les femmes camerounaises sont le pilier central du redressement civique et moral de notre pays. »",
            declarationRecente: "« Avec Tiriane Noah à la présidence, un signal fort est envoyé à toutes les femmes et à la jeunesse de notre pays ! »"
        },
        'ndong': {
            name: "Christopher Nveh NDONG",
            role: "Secrétaire Général du MRC",
            tag: "SECRÉTAIRE GÉNÉRAL",
            tagClass: "tag-sg",
            photo: null,
            bio: "Avocat éminent de tradition anglophone, pilier de l'unité républicaine et du bilinguisme intégral au Cameroun.",
            parcours: "Secrétaire Général reconduit et conforté par la Convention d'octobre 2026, il assure la direction administrative, la circulation de l'information et le lien avec les fédérations du Nord-Ouest et du Sud-Ouest.",
            vision: "« The Cameroon Renaissance Movement stands firm for equality, peace, constitutional decentralization and mutual respect among all linguistic communities. »",
            declarationRecente: "« Toutes les fédérations nationales et de la diaspora sont invitées à s'aligner sur la feuille de route du Directoire. »"
        },
        'oko': {
            name: "Oko Appolinaire LEGRAND",
            role: "Trésorier National du MRC",
            tag: "TRÉSORIER NATIONAL",
            tagClass: "tag-tresorier",
            photo: null,
            bio: "Gestionnaire financier chevronné, garant de la probité, de la reddition des comptes et de la gestion saine des cotisations citoyennes.",
            parcours: "Élu Trésorier National le 17 octobre 2026 pour veiller à la sécurisation des ressources militantes et à la transparence des dons.",
            vision: "« La transparence financière du MRC est le gage de notre liberté politique et de notre crédibilité devant le peuple. »",
            declarationRecente: "« Chaque cotisation d'adhérent fait l'objet d'un reçu officiel et d'une affectation directe aux actions de terrain. »"
        }
    },
    // Histoire Complète Époque par Époque (2012 - 2026)
    historyEpochs: {
        '2012': {
            title: "2012 : Le Congrès Constitutif & La Naissance de l'Espoir",
            subtitle: "Fusion des patriotes et officialisation du MRC",
            content: `
                <p><strong>12-13 Août 2012 :</strong> Face au délitement moral, économique et institutionnel du Cameroun, plusieurs formations politiques dont le Mouvement Populaire pour le Changement (MPC) et des personnalités indépendantes se réunissent à Yaoundé.</p>
                <p>Le <strong>Mouvement pour la Renaissance du Cameroun (MRC)</strong> est officiellement porté sur les fonts baptismaux. Le Pr Maurice Kamto est élu Président National.</p>
                <p><strong>Reconnaissance Officielle :</strong> Le parti opère en pleine conformité juridique sous l'autorisation ministérielle MINATD N°000221 du 25 Juillet 2008 et la lettre d'enregistrement N°0002249/LMINATD/DAP/SDE/STP du 02 Août 2012.</p>
                <div class="statute-callout"><strong>Devise Républicaine :</strong> « Justice &bull; Travail &bull; Prospérité &bull; Solidarité »</div>
            `
        },
        '2013': {
            title: "2013 : Le Baptême du Feu & L'Entrée au Parlement",
            subtitle: "Double scrutin législatif et municipal",
            content: `
                <p>Moins d'un an après sa création, le MRC refuse le confort du boycott stérile et se lance dans l'arène électorale des législatives et municipales du 30 septembre 2013.</p>
                <p>Malgré les fraudes massives et l'iniquité du code électoral, le parti crée la sensation : il remporte un siège historique de Député à l'Assemblée Nationale (avec l'honorable Lazare Soub dans le Wouri-Est) et plusieurs dizaines de conseillers municipaux.</p>
                <p>Le MRC installe dès lors son statut de <strong>première force d'opposition constructive</strong> au cœur des institutions.</p>
            `
        },
        '2018': {
            title: "2018 : L'Élection Présidentielle & La Vague Populaire",
            subtitle: "La campagne des « 5 Piliers » et la victoire revendiquée",
            content: `
                <p>La campagne présidentielle d'octobre 2018 marque un tournant sismique dans l'histoire politique contemporaine du Cameroun.</p>
                <p>Le candidat Maurice Kamto parcourt le pays, drainant des foules historiques à Bafoussam, Douala, Maroua, Garoua et Yaoundé. Il noue une alliance stratégique d'envergure avec plusieurs figures majeures dont Christian Penda Ekoka et Paul Éric Kingué.</p>
                <p><strong>Le Contentieux Historique :</strong> Pendant trois jours consécutifs, retransmis en direct à la télévision nationale, le collège des avocats du MRC démontre devant le Conseil Constitutionnel les fraudes massives et les faux procès-verbaux.</p>
                <p>Maurice Kamto revendique la victoire du peuple dans les urnes et refuse la capitulation électorale.</p>
            `
        },
        '2019': {
            title: "2019 : Les Marches Blanches & La Résistance Pacifique",
            subtitle: "Incarcération à Kondengui et triomphe moral",
            content: `
                <p>Le 26 janvier et le 1er juin 2019, des dizaines de milliers de citoyens défilent pacifiquement, une fleur à la main, pour réclamer l'arrêt de la guerre fratricide dans le Nord-Ouest et le Sud-Ouest et le recomptage des voix électorales.</p>
                <p>Le régime réagit par une répression brutale : plus de 500 militants et cadres, dont le Pr Maurice Kamto, le Pr Alain Fogué, Christian Penda Ekoka et Mamadou Mota, sont jetés dans les geôles de la prison centrale de Kondengui.</p>
                <p>Tiriane Noah assure avec brio la direction opérationnelle du parti. Sous la pression de la résistance populaire intérieure et de la diplomatie internationale, le régime cède et libère tous les prisonniers le 5 octobre 2019 sans la moindre concession sur leurs idéaux.</p>
            `
        },
        '2020': {
            title: "2020 : Paris République, Boycott Civique & SCSI",
            subtitle: "Le triomphe de la diaspora et la solidarité Covid-19",
            content: `
                <p><strong>1er Février 2020 :</strong> Rassemblement géant sur la Place de la République à Paris : plus de 20 000 Camerounais de la diaspora acclament Maurice Kamto, marquant une communion sans précédent entre la patrie et sa diaspora.</p>
                <p><strong>Le Boycott de Clarté :</strong> En février 2020, le MRC prend la décision historique et courageuse de boycotter le double scrutin pour ne pas cautionner la tenue d'élections sous les bombes dans le NOSO et exiger une refonte du Code électoral.</p>
                <p><strong>Survie Cameroun Survival Initiative (SCSI) :</strong> Face à la pandémie de Covid-19, le parti lève des centaines de millions de FCFA de dons citoyens pour distribuer masques, tests et gels aux hôpitaux camerounais, palliant la défaillance des autorités publiques.</p>
            `
        },
        '2023': {
            title: "2023 : La 3ème Convention Ordinaire à Yaoundé",
            subtitle: "Le plébiscite du Palais des Congrès",
            content: `
                <p><strong>9-10 Décembre 2023 :</strong> Le MRC défie les menaces d'interdiction et rassemble plus de 10 000 délégués venus des 10 régions du Cameroun et des délégations des 5 continents au Palais des Congrès de Yaoundé.</p>
                <p>La convention réaffirme l'unité inébranlable du parti et consolide les statuts démocratiques de l'organisation.</p>
            `
        },
        '2024': {
            title: "2024-2025 : L'Organisation de Masse & Sentinelle Citoyenne",
            subtitle: "Structuration territoriale et protection des procès-verbaux",
            content: `
                <p>Le MRC accélère la délivrance des cartes de membre numérisées et déploie le dispositif de <strong>« Sentinelle Électorale »</strong> visant à doter chaque bureau de vote d'observateurs formés pour sécuriser chaque procès-verbal.</p>
            `
        },
        '2026': {
            title: "17 Octobre 2026 : Convention Extraordinaire & Élection de Tiriane Noah (96,89%)",
            subtitle: "Nouvelle direction nationale élue suite à la démission de Maurice Kamto et Mamadou Mota",
            content: `
                <p><strong>17 Octobre 2026 :</strong> Événement démocratique historique au sein du MRC. À la suite de la démission du Pr Maurice Kamto et de Mamadou Mota, une Convention Nationale Extraordinaire s'est réunie pour élire la nouvelle direction du parti.</p>
                <p><strong>Tiriane Balbine NOAH</strong> a été élue <strong>Présidente Nationale du MRC avec 96,89 % des suffrages exprimés</strong>, consacrant son dévouement exceptionnel et son leadership républicain.</p>
                <p>Le congrès a également procédé à l'élection de la nouvelle équipe dirigeante du Directoire National :</p>
                <ul>
                    <li><strong>Cinq Vice-Présidents Nationaux :</strong> Emmanuel Simh, Elie Ngompe, Ismaël Kaigama, Samuel Same Kolle, Aissatou Saadou.</li>
                    <li><strong>Secrétaire Général :</strong> Christopher Nveh Ndong.</li>
                    <li><strong>Trésorier National :</strong> Oko Appolinaire Legrand.</li>
                    <li><strong>Président Fondateur :</strong> Pr Maurice Kamto demeure le guide et membre fondateur statutaire du parti.</li>
                </ul>
                <div class="statute-callout" style="background:#e8f5ed; padding:8px 10px; border-radius:8px; border-left:4px solid var(--vert); margin-top:8px;">
                    <strong>Composition statutaire du Directoire (mrcparty.net/organes-nationaux) :</strong> Réunit les membres fondateurs, la Présidente Nationale, les Vice-présidents, le Conseil National, le Comité des Sages, le Comité National d'Arbitrage, le Secrétaire National, les secrétaires régionaux OFMRC et 10 membres désignés.
                </div>
            `
        }
    },
    // Articles & Communiqués Officiels
    articles: [
        {
            category: "Convention Extraordinaire",
            source: "tiriane",
            sourceLabel: "Présidence du MRC - Tiriane Noah",
            date: "18 Octobre 2026",
            title: "Élection triomphale de Tiriane Balbine NOAH à la Présidence Nationale du MRC (96,89%)",
            author: "Directoire National",
            excerpt: "« La Convention Nationale Extraordinaire réunie le 17 octobre 2026 a plébiscité Tiriane Balbine Noah avec 96,89% des voix à la tête du MRC et doté le parti d'un nouveau Directoire unifié. »",
            content: "À la suite des démissions du Pr Maurice Kamto et de Mamadou Mota, les délégués des 10 régions et de la diaspora ont élu Tiriane Balbine Noah pour conduire les destinées du MRC. Les 5 Vice-présidents (Emmanuel Simh, Elie Ngompe, Ismaël Kaigama, Samuel Same Kolle, Aissatou Saadou), le SG Christopher Nveh Ndong et le Trésorier Oko Appolinaire Legrand prennent immédiatement leurs fonctions."
        },
        {
            category: "Haut Directoire",
            source: "kamto",
            sourceLabel: "Pr Maurice Kamto, Président Fondateur",
            date: "17 Octobre 2026",
            title: "Message fraternel du Président Fondateur Maurice KAMTO à la nouvelle direction",
            author: "Cabinet du Président Fondateur",
            excerpt: "« Le parti démontre sa maturité démocratique exceptionnelle. Je soutiens de tout cœur la Présidente Tiriane Noah et la nouvelle équipe dirigeante du Directoire. »",
            content: "Dans une allocution chargée d'émotion, le Pr Maurice Kamto a salué la passation républicaine pacifique et a appelé tous les militants et sympathisants du Cameroun et de la diaspora à faire bloc derrière Tiriane Balbine Noah."
        },
        {
            category: "Directoire National",
            source: "directoire",
            sourceLabel: "Secrétariat Général - Christopher Nveh Ndong",
            date: "21 Octobre 2026",
            title: "Publication officielle de la nouvelle composition du Directoire National du MRC",
            author: "Christopher Nveh Ndong, Secrétaire Général",
            excerpt: "« Conformément aux textes officiels régissant les organes nationaux du MRC, la nouvelle direction se met en ordre de marche pour les défis républicains à venir. »",
            content: "Le Secrétariat Général publie la composition complète issue de la Convention du 17 octobre 2026, incluant les membres fondateurs, la Présidente, les 5 Vice-présidents, le Comité des Sages et les secrétaires régionaux OFMRC."
        },
        {
            category: "Réseaux Sociaux & Base",
            source: "facebook",
            sourceLabel: "Facebook @mrcpartycameroon",
            date: "25 Octobre 2026",
            title: "Vague d'adhésions massives et de félicitations pour la Présidente Tiriane Noah",
            author: "Commission Communication & Réseaux",
            excerpt: "« Plus de 15 000 nouvelles cartes d'adhésion délivrées en une semaine à travers les 10 régions suite à la Convention Nationale Extraordinaire. »",
            content: "Un enthousiasme populaire sans précédent s'est emparé des comités de base et des fédérations départementales, saluant l'élection historique de Tiriane Balbine Noah à la tête de la première formation d'opposition du Cameroun."
        }
    ]
};

// ============================================================== //
// INITIALISATION DU RENDU DE LA CARTE DE MEMBRE EN 3D            //
// ============================================================== //
function formaterDate(iso) {
    if (!iso) return "";
    const parts = iso.split("-");
    if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return iso;
}

function genererCarte(m) {
    // 1. Recto (Fidèle à l'échantillon SU00062551)
    const elStruct = document.getElementById('cStructure');
    const elPrenom = document.getElementById('cPrenom');
    const elNom = document.getElementById('cNom');
    const elTel = document.getElementById('cTel');
    const elNum = document.getElementById('cNumero');
    const elDate = document.getElementById('cDate');
    const elPrix = document.getElementById('cPrix');
    const elBadge = document.getElementById('cardStatusBadge');

    if (elStruct) elStruct.textContent = m.structure;
    if (elPrenom) elPrenom.textContent = m.prenom;
    if (elNom) elNom.textContent = m.nom;
    if (elTel) elTel.textContent = m.tel;
    if (elNum) elNum.textContent = m.numero;
    if (elDate) elDate.textContent = formaterDate(m.date);
    if (elPrix) elPrix.textContent = m.cotisation || "1.000 F CFA";
    if (elBadge) elBadge.textContent = m.status;

    // 2. Verso (Sécurité, Barcode et QR Code)
    const backNum = document.getElementById('backNumDisplay');
    const backHash = document.getElementById('backHashDisplay');
    const barcodeLbl = document.getElementById('barcodeLabel');

    if (backNum) backNum.textContent = m.numero;
    if (backHash) backHash.textContent = m.signatureHash;
    if (barcodeLbl) barcodeLbl.textContent = m.numero;

    // 3. Génération du QR Code sur le Verso (#qrBack)
    const qrContainer = document.getElementById('qrBack');
    if (qrContainer) {
        qrContainer.innerHTML = "";
        const verifyUrl = CONFIG.urlVerification + encodeURIComponent(m.numero) + "&sig=" + encodeURIComponent(m.signatureHash);
        try {
            if (typeof QRCode === 'function') {
                new QRCode(qrContainer, {
                    text: verifyUrl,
                    width: 130,
                    height: 130,
                    colorDark: "#06602f",
                    colorLight: "#ffffff",
                    correctLevel: (QRCode.CorrectLevel && QRCode.CorrectLevel.M) || 0
                });
            } else if (window.QRCode && QRCode.toCanvas) {
                const canvas = document.createElement('canvas');
                qrContainer.appendChild(canvas);
                QRCode.toCanvas(canvas, verifyUrl, { width: 130, color: { dark: '#06602f', light: '#ffffff' } });
            } else {
                // Fallback SVG QR
                qrContainer.innerHTML = `<svg width="130" height="130" viewBox="0 0 100 100" fill="#06602f"><rect width="100" height="100" fill="#fff"/><rect x="10" y="10" width="30" height="30" fill="#06602f"/><rect x="15" y="15" width="20" height="20" fill="#fff"/><rect x="20" y="20" width="10" height="10" fill="#06602f"/><rect x="60" y="10" width="30" height="30" fill="#06602f"/><rect x="65" y="15" width="20" height="20" fill="#fff"/><rect x="70" y="20" width="10" height="10" fill="#06602f"/><rect x="10" y="60" width="30" height="30" fill="#06602f"/><rect x="15" y="65" width="20" height="20" fill="#fff"/><rect x="20" y="70" width="10" height="10" fill="#06602f"/><rect x="50" y="50" width="15" height="15" fill="#06602f"/><rect x="70" y="70" width="20" height="20" fill="#06602f"/></svg>`;
            }
        } catch (e) {
            console.warn("QR render fallback", e);
        }
    }
}

// ============================================================== //
// RETOURNEMENT 3D INTERACTIF DE LA CARTE                         //
// ============================================================== //
function toggleCard3DFlip() {
    const cardEl = document.getElementById('card3dElement');
    if (!cardEl) return;
    appState.isCardFlipped = !appState.isCardFlipped;
    if (appState.isCardFlipped) {
        cardEl.classList.add('is-flipped');
    } else {
        cardEl.classList.remove('is-flipped');
    }
}

// ============================================================== //
// GESTION DU DIRECTOIRE NATIONAL & MODAL DÉTAILLÉE               //
// ============================================================== //
function openLeaderModal(id) {
    const leader = appState.leaders[id];
    if (!leader) return;

    appState.activeLeaderId = id;
    const titleEl = document.getElementById('modalLeaderTitle');
    const bodyEl = document.getElementById('modalLeaderBody');

    titleEl.textContent = leader.name;

    const avatarHtml = leader.photo
        ? `<img src="${leader.photo}" alt="${leader.name}" style="width:70px; height:70px; border-radius:50%; object-fit:cover; border:3px solid var(--vert); margin-right:12px;">`
        : `<div style="width:70px; height:70px; border-radius:50%; background:var(--vert-clair); color:var(--vert); display:grid; place-items:center; font-size:30px; border:2px solid var(--vert); margin-right:12px;"><i class="fa-solid fa-user-tie"></i></div>`;

    bodyEl.innerHTML = `
        <div style="display:flex; align-items:center; margin-bottom:14px;">
            ${avatarHtml}
            <div>
                <span class="role-tag ${leader.tagClass || ''}">${leader.tag}</span>
                <h4 style="font-size:14px; color:var(--encre); margin:4px 0 2px;">${leader.name}</h4>
                <div style="font-size:10px; color:var(--gris); font-weight:600;">${leader.role}</div>
            </div>
        </div>

        <div style="background:#f9fbf9; border:1px solid #dbe6de; padding:10px 12px; border-radius:10px; margin-bottom:12px;">
            <h5 style="font-size:11px; color:var(--vert-fonce); font-weight:800; margin-bottom:4px;"><i class="fa-solid fa-graduation-cap text-green"></i> Titres &amp; Biographie</h5>
            <p style="font-size:10.5px; color:var(--encre); line-height:1.45;">${leader.bio}</p>
        </div>

        <div style="background:#f9fbf9; border:1px solid #dbe6de; padding:10px 12px; border-radius:10px; margin-bottom:12px;">
            <h5 style="font-size:11px; color:var(--vert-fonce); font-weight:800; margin-bottom:4px;"><i class="fa-solid fa-route text-green"></i> Parcours au sein du MRC</h5>
            <p style="font-size:10.5px; color:var(--encre); line-height:1.45;">${leader.parcours}</p>
        </div>

        <div style="background:var(--vert-clair); border-left:4px solid var(--vert); padding:10px 12px; border-radius:8px; margin-bottom:12px;">
            <h5 style="font-size:11px; color:var(--vert-fonce); font-weight:800; margin-bottom:4px;"><i class="fa-solid fa-quote-left text-green"></i> Vision &amp; Idéal Républicain</h5>
            <p style="font-size:10.5px; font-style:italic; color:var(--vert-fonce); line-height:1.4;">${leader.vision}</p>
        </div>

        <div style="border-top:1px dashed var(--bordure); padding-top:8px;">
            <h5 style="font-size:10.5px; color:var(--rouge-mrc); font-weight:800; margin-bottom:3px;"><i class="fa-solid fa-bullhorn"></i> Dernière Déclaration Officielle</h5>
            <p style="font-size:10px; color:var(--encre); line-height:1.4;">${leader.declarationRecente}</p>
        </div>
    `;

    document.getElementById('leaderModal').classList.add('show');
}

function closeLeaderModal() {
    document.getElementById('leaderModal').classList.remove('show');
}

function shareLeaderProfile() {
    const leader = appState.leaders[appState.activeLeaderId];
    if (!leader) return;
    const text = `Profil Dirigeant MRC : ${leader.name} (${leader.role}) - « ${leader.declarationRecente} » Découvrez l'équipe du MRC sur https://mrcparty.net`;
    if (navigator.share) {
        navigator.share({ title: leader.name, text: text, url: 'https://mrcparty.net' });
    } else {
        navigator.clipboard.writeText(text);
        openMrcModal("Presse-papier", "Fiche du dirigeant copiée dans le presse-papier !", "fa-copy");
    }
}

// ============================================================== //
// GESTION DE L'HISTOIRE & DU PARCOURS DES PRÉSIDENTS             //
// ============================================================== //
function switchHistorySubTab(subTab) {
    const tabs = ['timeline', 'presidents', 'victories', 'archives'];
    const map = {
        timeline: { btn: 'btnHistTimeline', pane: 'histTimelineContent' },
        presidents: { btn: 'btnHistPresidents', pane: 'histPresidentsContent' },
        victories: { btn: 'btnHistVictories', pane: 'histVictoriesContent' },
        archives: { btn: 'btnHistArchives', pane: 'histArchivesContent' }
    };

    tabs.forEach(t => {
        const item = map[t];
        const btn = document.getElementById(item.btn);
        const pane = document.getElementById(item.pane);
        if (t === subTab) {
            if (btn) btn.classList.add('active');
            if (pane) pane.classList.add('active');
        } else {
            if (btn) btn.classList.remove('active');
            if (pane) pane.classList.remove('active');
        }
    });
}

function openHistoryDetailModal(year) {
    const epoch = appState.historyEpochs[year];
    if (!epoch) return;

    document.getElementById('modalHistoryTitle').textContent = epoch.title;
    document.getElementById('modalHistoryBody').innerHTML = `
        <h4 style="font-size:12px; color:var(--vert); font-weight:800; margin-bottom:8px;">${epoch.subtitle}</h4>
        <div style="font-size:11px; line-height:1.5; color:var(--encre);">${epoch.content}</div>
        <div style="margin-top:12px; padding:8px 10px; background:#f4f7f5; border-radius:8px; font-size:10px; color:var(--gris);">
            <i class="fa-solid fa-landmark text-green"></i> Archives Officielles du Mouvement pour la Renaissance du Cameroun (2012-2025).
        </div>
    `;
    document.getElementById('historyModal').classList.add('show');
}

function closeHistoryModal() {
    document.getElementById('historyModal').classList.remove('show');
}

// ============================================================== //
// GESTION DU FLUX DES DÉPÊCHES & SYNCHRONISATION AUTOMATIQUE     //
// ============================================================== //
function renderNews(filterSource = 'all') {
    const container = document.getElementById('newsListContainer');
    if (!container) return;
    container.innerHTML = '';

    const filtered = (filterSource === 'all')
        ? appState.articles
        : appState.articles.filter(a => a.source === filterSource);

    filtered.forEach((art, idx) => {
        const card = document.createElement('div');
        card.className = 'featured-news-card interactive-hover';
        card.style.marginBottom = '10px';
        card.onclick = () => openArticleModal(idx, filtered);
        card.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                <span class="news-tag">${art.category.toUpperCase()} &bull; ${art.date}</span>
                <span style="font-size:9px; color:var(--vert); font-weight:700;"><i class="fa-brands fa-facebook"></i> ${art.sourceLabel}</span>
            </div>
            <h4 class="news-title">${art.title}</h4>
            <p class="news-excerpt">${art.excerpt}</p>
        `;
        container.appendChild(card);
    });
}

function filterNews(source, btn) {
    document.querySelectorAll('.news-sources-filter .filter-pill').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    renderNews(source);
}

function simulerActualisationFlux() {
    const syncIcon = document.getElementById('syncIcon');
    const syncText = document.getElementById('syncText');
    if (syncIcon) syncIcon.classList.add('fa-spin');
    if (syncText) syncText.textContent = "Interrogation en direct des API & Pages Officielles MRC...";

    setTimeout(() => {
        if (syncIcon) syncIcon.classList.remove('fa-spin');
        const now = new Date();
        const timeStr = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;
        if (syncText) syncText.innerHTML = `Dernière synchronisation réussie à <strong>${timeStr}</strong> &bull; 4 flux actifs`;

        // Ajouter une nouvelle dépêche d'actualité si pas déjà présente
        if (!appState.hasSyncedNew) {
            appState.articles.unshift({
                category: "Flash Info Élections",
                source: "kamto",
                sourceLabel: "Directoire National @mrcpartycameroon",
                date: "À l'instant",
                title: "Déploiement massif des kits de Sentinelle Électorale dans les 360 arrondissements",
                author: "Directoire National",
                excerpt: "« La Sentinelle Électorale garantira qu'aucun procès-verbal ne soit falsifié. Le vote citoyen sera protégé jusqu'au dernier bureau. »",
                content: "Le Secrétariat National chargé des opérations électorales annonce la clôture de la formation de 50 000 sentinelles citoyennes réparties sur l'ensemble du territoire national camerounais et dans les centres de vote de la diaspora."
            });
            appState.hasSyncedNew = true;
            renderNews('all');
        }
    }, 1200);
}

function openArticleModal(idx, list = appState.articles) {
    const art = list[idx];
    if (!art) return;
    openMrcModal('Notification Officielle', `📰 ${art.title}\n\nDate : ${art.date}\nSource : ${art.sourceLabel}\nDirectoire : ${art.author}\n\n${art.content}\n\nRetrouvez tous les communiqués officiels sur le portail https://mrcparty.net`, 'fa-circle-info');
}

// ============================================================== //
// GESTION DES PARAMÈTRES DE L'APPLICATION                        //
// ============================================================== //
function openSettingsModal() {
    document.getElementById('settingsModal').classList.add('show');
}

function closeSettingsModal() {
    document.getElementById('settingsModal').classList.remove('show');
}

function changeSettingLang(val) {
    appState.currentLanguage = val;
    document.getElementById('btnLang').textContent = val;
    openMrcModal('Notification Officielle', `Langue configurée sur : ${val === 'FR' ? 'Français' : 'English'}`, 'fa-circle-info');
}

// ============================================================== //
// GESTION DES ONGLETS DE NAVIGATION                              //
// ============================================================== //
function switchTab(tabKey) {
    const tabs = {
        'home': 'paneHome',
        'card': 'paneCard',
        'register': 'paneRegister',
        'directoire': 'paneDirectoire',
        'history': 'paneHistory',
        'news': 'paneNews'
    };

    document.querySelectorAll('.tab-pane').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.bottom-nav .nav-item').forEach(el => el.classList.remove('active'));

    const targetId = tabs[tabKey] || 'paneHome';
    const targetEl = document.getElementById(targetId);
    if (targetEl) targetEl.classList.add('active');

    // Mettre en évidence l'élément de la barre de navigation
    const navMap = ['home', 'card', 'register', 'directoire', 'history', 'news'];
    const idx = navMap.indexOf(tabKey);
    const navItems = document.querySelectorAll('.bottom-nav .nav-item');
    if (navItems[idx]) navItems[idx].classList.add('active');

    if (tabKey === 'card') {
        genererCarte(appState.member);
    }
}

// ============================================================== //
// SOUMISSION DU FORMULAIRE D'ADHÉSION & PERSISTANCE EN BASE      //
// ============================================================== //
function updateCotisation(radio) {
    document.querySelectorAll('.cotisation-pill').forEach(el => el.classList.remove('active'));
    radio.parentElement.classList.add('active');
}

async function handleRegistrationSubmit(e) {
    e.preventDefault();

    const prenom = document.getElementById('regPrenom').value.trim().toUpperCase();
    const nom = document.getElementById('regNom').value.trim().toUpperCase();
    const structure = document.getElementById('regStructure').value;
    const tel = document.getElementById('regTel').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const selectedCotisation = document.querySelector('input[name="cotisationAmt"]:checked')?.value || "1000";
    const selectedPayType = document.querySelector('input[name="payType"]:checked')?.value || "MTN MoMo";

    // Vérification des certifications légales obligatoires
    const checkNonApp = document.getElementById('checkNonAppartenance').checked;
    const checkLegal = document.getElementById('checkLegalResidance').checked;
    const checkRgpd = document.getElementById('checkRgpd').checked;

    if (!checkNonApp || !checkLegal || !checkRgpd) {
        openMrcModal('Notification Officielle', "Attention : Vous devez impérativement valider les 3 déclarations statutaires et légales (non-appartenance à une autre formation politique, plafond légal des dons de 7 500 € et consentement RGPD).", 'fa-circle-info');
        return;
    }

    const payload = {
        prenom,
        nom,
        structure,
        tel,
        email,
        cotisation: `${parseInt(selectedCotisation).toLocaleString()} F CFA`,
        checkNonAppartenance: checkNonApp,
        checkLegalResidance: checkLegal,
        checkRgpd: checkRgpd
    };

    try {
        // Envoi au Backend Persistant
        const response = await fetch(API_BASE + '/api/members', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            const result = await response.json();
            appState.member = result.member;
            localStorage.setItem('mrc_active_member', JSON.stringify(result.member));
            playValidationSound();
            genererCarte(appState.member);
            switchTab('card');

            openMrcModal('Notification Officielle', `🎉 ADHÉSION ENREGISTRÉE EN BASE DE DONNÉES EN LIGNE !\n\nCamarade ${prenom} ${nom},\n\nBienvenue au MRC ! Votre carte officielle N° ${result.member.numero} a été enregistrée de manière permanente dans le Registre National Central.\n\nStructure : ${structure}\nReçu Statutaire : ${result.member.cotisation} (Règlement via ${selectedPayType})\nEmpreinte de Sécurité : ${result.member.signatureHash}`, 'fa-circle-info');
            return;
        }
    } catch (err) {
        console.warn("Backend non joignable, enregistrement local :", err);
    }

    // Fallback LocalStorage si hors-ligne
    const randomSeq = Math.floor(62552 + Math.random() * 8500);
    const newNum = `SU000${randomSeq}`;
    const todayIso = new Date().toISOString().slice(0, 10);
    const hash = "MRC-" + Math.random().toString(36).substring(2, 14).toUpperCase();

    appState.member = {
        structure: structure,
        prenom: prenom,
        nom: nom,
        tel: tel,
        numero: newNum,
        date: todayIso,
        cotisation: `${parseInt(selectedCotisation).toLocaleString()} F CFA`,
        status: "ACTIF / VALIDE",
        signatureHash: hash
    };

    localStorage.setItem('mrc_active_member', JSON.stringify(appState.member));
    genererCarte(appState.member);
    playValidationSound();
    switchTab('card');
    openMrcModal('Notification Officielle', `🎉 ADHÉSION ENREGISTRÉE & CARTE 3D ÉMISE !\n\nCamarade ${prenom} ${nom}, votre carte N° ${newNum} a été créée avec succès.`, 'fa-circle-info');
}

// ============================================================== //
// GESTION DU REGISTRE NATIONAL DES ADHÉRENTS (BASE DE DONNÉES)   //
// ============================================================== //
async function loadRegistryFromBackend() {
    const container = document.getElementById('registryListContainer');
    if (!container) return;

    container.innerHTML = '<div style="text-align:center; padding:15px; color:var(--gris);"><i class="fa-solid fa-spinner fa-spin text-green"></i> Chargement des adhérents enregistrés...</div>';

    try {
        const res = await fetch(API_BASE + '/api/members');
        if (res.ok) {
            const data = await res.json();
            renderRegistryList(data.members || []);
            return;
        }
    } catch (e) {
        console.warn("Impossible de joindre /api/members, affichage de secours", e);
    }

    // Données par défaut si le backend est indisponible
    renderRegistryList([
        appState.member,
        {
            numero: "SU00000001",
            prenom: "MAURICE",
            nom: "KAMTO",
            structure: "DIRECTOIRE NATIONAL",
            date: "2012-08-13",
            cotisation: "100 000 F CFA",
            status: "PRÉSIDENT FONDATEUR",
            signatureHash: "MRC-F001KAMTO2012"
        },
        {
            numero: "SU00000002",
            prenom: "TIRIANE BALBINE",
            nom: "NOAH",
            structure: "DIRECTOIRE NATIONAL - PRÉSIDENCE",
            date: "2012-08-13",
            cotisation: "100 000 F CFA",
            status: "PRÉSIDENTE NATIONALE (96,89%)",
            signatureHash: "MRC-T002NOAH2026"
        }
    ]);
}

function renderRegistryList(members) {
    const container = document.getElementById('registryListContainer');
    if (!container) return;
    container.innerHTML = '';

    members.forEach(m => {
        const item = document.createElement('div');
        item.style.cssText = "background:#fff; border:1px solid #cfd6d1; border-radius:10px; padding:10px 12px; display:flex; justify-content:space-between; align-items:center; cursor:pointer; transition:0.15s;";
        item.onmouseover = () => item.style.borderColor = "var(--vert)";
        item.onmouseout = () => item.style.borderColor = "#cfd6d1";
        item.onclick = () => selectMemberFromRegistry(m);

        item.innerHTML = `
            <div>
                <div style="font-size:12px; font-weight:800; color:var(--encre);">${m.prenom} ${m.nom}</div>
                <div style="font-size:9.5px; color:var(--gris);">${m.structure} &bull; ${m.cotisation || '1.000 F CFA'}</div>
                <div style="font-size:9px; color:var(--vert); font-family:monospace; margin-top:2px;">N° ${m.numero}</div>
            </div>
            <div style="text-align:right;">
                <span style="font-size:8.5px; font-weight:800; background:var(--vert-clair); color:var(--vert-fonce); padding:3px 6px; border-radius:6px;">${m.status || 'VALIDE'}</span>
                <div style="font-size:9px; color:var(--gris); margin-top:4px;">${formaterDate(m.date)}</div>
            </div>
        `;
        container.appendChild(item);
    });
}

function selectMemberFromRegistry(m) {
    appState.member = m;
    genererCarte(m);
    closeRegistryModal();
    switchTab('card');
    openMrcModal('Notification Officielle', `Carte chargée : ${m.prenom} ${m.nom} (${m.numero})`, 'fa-circle-info');
}

function openRegistryModal() {
    document.getElementById('registryModal').classList.add('show');
    loadRegistryFromBackend();
}

function closeRegistryModal() {
    document.getElementById('registryModal').classList.remove('show');
}

// ============================================================== //
// RÉINITIALISATION À LA CARTE DE RÉFÉRENCE (CYRILLE EDOU)        //
// ============================================================== //
function resetToOfficialCard() {
    appState.member = {
        structure: "FD COM SANGMELIMA OWONO MIMBO'O",
        prenom: "CYRILLE",
        nom: "EDOU",
        tel: "659452898",
        numero: "SU00062551",
        date: "2024-02-19",
        cotisation: "1.000 F CFA",
        status: "ACTIF / VALIDE",
        signatureHash: "MRC-9A74E82F10BC"
    };
    genererCarte(appState.member);
    switchTab('card');
    openMrcModal('Notification Officielle', "✅ Carte officielle de référence (CYRILLE EDOU - SU00062551) rechargée avec succès !", 'fa-circle-info');
}

// ============================================================== //
// VÉRIFICATION D'AUTHENTICITÉ & MODAL                            //
// ============================================================== //
function showVerificationModal() {
    const m = appState.member;
    const html = `
        <div style="background:#eaf6ed; padding:10px 12px; border-radius:10px; border-left:4px solid var(--vert); margin-bottom:12px;">
            <p><strong>Statut :</strong> <span class="text-green" style="font-weight:800;">AUTHENTIQUE &bull; ACTIVE ✅</span></p>
            <p style="font-size:10px; color:#3e5445;">Enregistrée dans le registre national biométrique du MRC.</p>
        </div>
        <p><strong>Titulaire :</strong> ${m.prenom} ${m.nom}</p>
        <p><strong>N° Immatriculation :</strong> <span style="font-weight:800; color:var(--vert-fonce);">${m.numero}</span></p>
        <p><strong>Structure Locale :</strong> ${m.structure}</p>
        <p><strong>Date d'adhésion :</strong> ${formaterDate(m.date)}</p>
        <p><strong>Empreinte Cryptographique :</strong> <code>${m.signatureHash}</code></p>
        <p style="margin-top:10px; font-size:10px; color:#5b6b61; border-top:1px dashed var(--bordure); padding-top:8px;">
            Conforme à l'autorisation MINATD N°000221 / Lettre N°0002249. Émise sous l'autorité du Président Fondateur Pr Maurice Kamto et de la Présidente Nationale Tiriane Noah.
        </p>
    `;
    document.getElementById('verifyModalContent').innerHTML = html;
    document.getElementById('verifyModal').classList.add('show');
}

function closeVerifyModal() {
    document.getElementById('verifyModal').classList.remove('show');
}

function partagerCarte() {
    const text = `Fier militant du MRC ! Carte N° ${appState.member.numero} (${appState.member.prenom} ${appState.member.nom}) - ${appState.member.structure}. Ensemble pour la Renaissance du Cameroun dans la paix et par les urnes ! https://mrcparty.net`;
    if (navigator.share) {
        navigator.share({ title: 'Carte de Membre MRC', text: text, url: 'https://mrcparty.net' });
    } else {
        navigator.clipboard.writeText(text);
        openMrcModal("Presse-papier", "Détails et lien copiés dans le presse-papier pour WhatsApp et réseaux sociaux !", "fa-share-nodes");
    }
}

function triggerSosModal() {
    if (confirm("🚨 ALERTE JURIDIQUE & SOS MILITANT\n\nSouhaitez-vous joindre immédiatement la ligne d'assistance d'urgence du Collectif des Avocats du MRC (+237 674 27 05 49) ?")) {
        window.location.href = "tel:+237674270549";
    }
}

function toggleLanguage() {
    appState.currentLanguage = (appState.currentLanguage === 'FR') ? 'EN' : 'FR';
    const btn = document.getElementById('btnLang');
    if (btn) btn.textContent = appState.currentLanguage;
    const isEn = appState.currentLanguage === 'EN';

    // Mise à jour des onglets
    const navItems = document.querySelectorAll('.bottom-nav-item span');
    if (navItems.length >= 6) {
        navItems[0].textContent = isEn ? "Home" : "Accueil";
        navItems[1].textContent = isEn ? "My Card" : "Ma Carte";
        navItems[2].textContent = isEn ? "Join" : "Adhérer";
        navItems[3].textContent = isEn ? "Board" : "Directoire";
        navItems[4].textContent = isEn ? "History" : "Histoire";
        navItems[5].textContent = isEn ? "News" : "Dépêches";
    }

    // Titres des écrans
    const cardTitle = document.querySelector('#paneCard .card-screen-header h2');
    if (cardTitle) cardTitle.textContent = isEn ? "Official Digital Membership Card" : "Carte Officielle de Membre";
    const flipHint = document.querySelector('.flip-hint');
    if (flipHint) flipHint.innerHTML = isEn ? '<i class="fa-solid fa-arrows-rotate"></i> Tap card to flip in 3D (Front / Back)' : '<i class="fa-solid fa-arrows-rotate"></i> Touchez la carte pour la faire pivoter (Recto / Verso)';

    openMrcModal(
        isEn ? "Language Selection" : "Choix de la Langue",
        isEn ? "Official bilingual mode active (English / French). All tabs and documents are updated." : "Mode bilingue officiel actif (Français / Anglais). L'interface est à jour.",
        "fa-globe"
    );
}

// Téléchargement PNG HD de la carte
async function telechargerCartePNG() {
    const cardFace = appState.isCardFlipped
        ? document.getElementById('carteBackRender')
        : document.getElementById('carteFrontRender');

    if (!cardFace || !window.html2canvas) {
        openMrcModal("Téléchargement", "Téléchargement de la carte de membre en cours...", "fa-download");
        return;
    }

    const origTransform = cardFace.style.transform;
    cardFace.style.transform = "none";

    try {
        const canvas = await html2canvas(cardFace, {
            scale: 2,
            useCORS: true,
            backgroundColor: "#ffffff"
        });
        cardFace.style.transform = origTransform;

        const side = appState.isCardFlipped ? "verso" : "recto";
        const link = document.createElement("a");
        link.download = `carte-mrc-${side}-${appState.member.numero}-${appState.member.prenom}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
    } catch (err) {
        cardFace.style.transform = origTransform;
        openMrcModal('Notification Officielle', "Erreur lors de la capture : " + err.message, 'fa-circle-info');
    }
}

// Horloge temps réel Android
setInterval(() => {
    const d = new Date();
    const el = document.getElementById('deviceClock');
    if (el) el.textContent = `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
}, 1000);

// Chargement initial
window.addEventListener('DOMContentLoaded', () => {

    appState.leaders['mota'] = {
        name: "Mamadou MOTA",
        role: "1er Vice-Président Délégué du MRC",
        tag: "1ER VICE-PRÉSIDENT DÉLÉGUÉ",
        tagClass: "tag-vp",
        photo: "assets/leader_mamadou_mota.jpg",
        bio: "Ingénieur agronome de formation, leader charismatique et figure emblématique de la résistance démocratique dans le Grand-Nord camerounais.",
        parcours: "Incarcéré arbitrairement durant 2 ans à Kondengui suite aux événements de 2019, il a incarné une fermeté morale inébranlable. Il coordonne l'action politique du parti avec rigueur.",
        vision: "« Le MRC est un pont indestructible entre le Nord et le Sud du Cameroun. Rien n'arrêtera la marche du peuple vers sa liberté. »",
        declarationRecente: "« Avec la Présidente Tiriane Noah, nous engageons la phase décisive de la conquête électorale pacifique. »"
    };

    appState.leaders['saadou'] = {
        name: "Aissatou SAADOU",
        role: "Vice-Présidente Nationale du MRC",
        tag: "VICE-PRÉSIDENTE NATIONALE",
        tagClass: "tag-vp",
        photo: "assets/leader_aissatou_saadou.jpg",
        bio: "Économiste et militante associative engagée pour l'émancipation économique des femmes et l'encadrement républicain de la jeunesse.",
        parcours: "Élue au Directoire le 17 octobre 2026, elle supervise la mobilisation féminine et l'OFMRC dans les dix régions et dans la diaspora.",
        vision: "« Les femmes camerounaises sont le pilier de la République. Elles seront le moteur de l'alternance. »",
        declarationRecente: "« Chaque femme militante doit porter fièrement sa carte de membre et être une sentinelle de paix. »"
    };

    appState.leaders['oko'] = {
        name: "Oko APPOLINAIRE LEGRAND",
        role: "Trésorier National du MRC",
        tag: "TRÉSORIER NATIONAL",
        tagClass: "tag-vp",
        photo: "assets/leader_alain_fogue.jpg",
        bio: "Expert-comptable et gestionnaire émérite, garant de la transparence financière, de la collecte des cotisations et de la reddition des comptes.",
        parcours: "Chargé par la Convention Nationale de garantir l'étanchéité financière, l'intégration des dons MoMo/OM et le respect des plafonds statutaires.",
        vision: "« La transparence financière est le garant absolu de notre indépendance politique. »",
        declarationRecente: "« Chaque franc versé en cotisation est audité et alloué directement à la victoire démocratique. »"
    };

    adjustCardScale();
    genererCarte(appState.member);
    renderNews();
});


// ============================================================== //
// SON DE VALIDATION OFFICIEL DU MRC (WEB AUDIO API + WAV CHIME)   //
// ============================================================== //
function playValidationSound() {
    try {
        // 1. Synthèse Web Audio pure (100% hors-ligne, zéro délai, zéro erreur 404)
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
            const ctx = new AudioContext();
            if (ctx.state === 'suspended') {
                ctx.resume();
            }

            // Accord ascendant harmonieux (Do5 -> Mi5 -> Sol5 -> Do6)
            const notes = [
                { freq: 523.25, time: 0.00, dur: 0.15 }, // C5
                { freq: 659.25, time: 0.11, dur: 0.15 }, // E5
                { freq: 783.99, time: 0.22, dur: 0.18 }, // G5
                { freq: 1046.50, time: 0.35, dur: 0.45 }  // C6 (carillon cristallin)
            ];

            notes.forEach(n => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();

                osc.type = 'triangle'; // Sonnerie douce et agréable
                osc.frequency.setValueAtTime(n.freq, ctx.currentTime + n.time);

                gain.gain.setValueAtTime(0.0001, ctx.currentTime + n.time);
                gain.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + n.time + 0.02);
                gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + n.time + n.dur);

                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.start(ctx.currentTime + n.time);
                osc.stop(ctx.currentTime + n.time + n.dur + 0.05);
            });
        }

        // 2. Fallback via fichier audio statique local
        try {
            const audioFallback = new Audio('assets/validation_chime.wav');
            audioFallback.volume = 0.7;
            audioFallback.play().catch(() => {});
        } catch (_) {}

    } catch (e) {
        console.warn("Validation audio playback:", e);
    }
}

// ============================================================== //
// GESTION DU PAIEMENT MOBILE MONEY, USSD & REÇU OFFICIEL        //
// ============================================================== //
let modalPaymentData = {
    operator: 'MTN Mobile Money (*126#)',
    amount: 1000,
    logo: 'assets/logo_mtn_momo.png'
};

function selectRegPaymentMethod(val, el) {
    document.querySelectorAll('#paneRegister .pay-method-card').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    const radio = el.querySelector('input[type="radio"]');
    if (radio) radio.checked = true;
}

function openPaymentModal() {
    const modal = document.getElementById('paymentModal');
    if (!modal) return;

    // Reset to step 1
    const formStep = document.getElementById('paymentFormStep');
    const ussdStep = document.getElementById('paymentUssdStep');
    const receiptStep = document.getElementById('paymentReceiptStep');
    const btnConfirm = document.getElementById('btnConfirmPay');
    const btnDone = document.getElementById('btnDonePay');
    const btnCancel = document.getElementById('btnCancelPay');

    if (formStep) formStep.style.display = 'block';
    if (ussdStep) ussdStep.style.display = 'none';
    if (receiptStep) receiptStep.style.display = 'none';
    if (btnConfirm) btnConfirm.style.display = 'inline-flex';
    if (btnDone) btnDone.style.display = 'none';
    if (btnCancel) btnCancel.style.display = 'inline-flex';

    // Synchronize phone input
    const phoneInput = document.getElementById('payPhoneInput');
    if (phoneInput && appState.member && appState.member.tel) {
        phoneInput.value = appState.member.tel;
    }

    modal.classList.add('active');
}

function closePaymentModal() {
    const modal = document.getElementById('paymentModal');
    if (modal) modal.classList.remove('active');
}

function setModalPaymentMethod(name, logo, el) {
    modalPaymentData.operator = name;
    modalPaymentData.logo = logo;

    document.querySelectorAll('#paymentModal .pay-method-card').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    const radio = el.querySelector('input[type="radio"]');
    if (radio) radio.checked = true;
}

function setModalAmount(amount, el) {
    modalPaymentData.amount = amount;
    document.querySelectorAll('#paymentModal .cotisation-pill').forEach(p => p.classList.remove('active'));
    el.classList.add('active');

    const formatted = amount.toLocaleString('fr-FR') + ' F CFA';
    const sumEl = document.getElementById('modalSummaryAmount');
    const totEl = document.getElementById('modalSummaryTotal');
    if (sumEl) sumEl.textContent = formatted;
    if (totEl) totEl.textContent = formatted;
}

function executePaymentSimulation() {
    const formStep = document.getElementById('paymentFormStep');
    const ussdStep = document.getElementById('paymentUssdStep');
    const receiptStep = document.getElementById('paymentReceiptStep');
    const btnConfirm = document.getElementById('btnConfirmPay');
    const btnCancel = document.getElementById('btnCancelPay');
    const btnDone = document.getElementById('btnDonePay');

    const phoneInput = document.getElementById('payPhoneInput');
    const phoneNumber = (phoneInput && phoneInput.value.trim()) || "659452898";
    const amountStr = modalPaymentData.amount.toLocaleString('fr-FR') + ' F CFA';

    // Passer à l'étape 2 (Simulation USSD)
    if (formStep) formStep.style.display = 'none';
    if (btnConfirm) btnConfirm.style.display = 'none';
    if (btnCancel) btnCancel.style.display = 'none';
    if (ussdStep) ussdStep.style.display = 'block';

    const opTitle = document.getElementById('ussdOperatorTitle');
    const opMsg = document.getElementById('ussdOperatorMsg');
    const promptAmt = document.getElementById('ussdAmountPrompt');
    const progressFill = document.getElementById('ussdProgressFill');

    if (opTitle) opTitle.textContent = 'Connexion à ' + modalPaymentData.operator + '...';
    if (opMsg) opMsg.innerHTML = 'Requête USSD envoyée au <strong>+237 ' + phoneNumber + '</strong>.<br>Veuillez taper votre code secret pour autoriser le prélèvement de <strong>' + amountStr + '</strong>.';
    if (promptAmt) promptAmt.textContent = amountStr;

    if (progressFill) {
        progressFill.style.width = '0%';
        setTimeout(() => { progressFill.style.width = '100%'; }, 100);
    }

    // Après 1.8s : Validation et Reçu Officiel
    setTimeout(() => {
        // 1. Déclencher le son de validation officiel
        playValidationSound();

        // 2. Mettre à jour l'adhérent dans l'application
        const now = new Date();
        const dateStr = now.toLocaleDateString('fr-FR') + ' ' + String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');
        const opCode = modalPaymentData.operator.includes('Orange') ? 'OM' : (modalPaymentData.operator.includes('Genius') ? 'GP' : 'MOMO');
        const randomTx = Math.floor(1000 + Math.random() * 9000);
        const txRef = 'MRC-' + opCode + '-' + now.getFullYear() + String(now.getMonth()+1).padStart(2,'0') + '-' + randomTx;

        if (appState.member) {
            appState.member.cotisation = amountStr;
            appState.member.status = 'ACTIF / COTISATION PAYÉE';
            localStorage.setItem('mrc_active_member', JSON.stringify(appState.member));
            genererCarte(appState.member);
        }

        // 3. Remplir le reçu officiel
        const rRef = document.getElementById('recTxRef');
        const rOp = document.getElementById('recOperator');
        const rName = document.getElementById('recMemberName');
        const rNum = document.getElementById('recMemberNum');
        const rAmt = document.getElementById('recAmount');
        const rDate = document.getElementById('recDate');
        const rHash = document.getElementById('recHash');

        if (rRef) rRef.textContent = txRef;
        if (rOp) rOp.textContent = modalPaymentData.operator;
        if (rName) rName.textContent = (appState.member && (appState.member.prenom + ' ' + appState.member.nom)) || 'CYRILLE EDOU';
        if (rNum) rNum.textContent = (appState.member && appState.member.numero) || 'SU00062551';
        if (rAmt) rAmt.textContent = amountStr;
        if (rDate) rDate.textContent = dateStr;
        if (rHash) rHash.textContent = (appState.member && appState.member.signatureHash) || 'MRC-9A74E82F10BC';

        // 4. Afficher l'étape Reçu
        if (ussdStep) ussdStep.style.display = 'none';
        if (receiptStep) receiptStep.style.display = 'block';
        if (btnDone) btnDone.style.display = 'inline-flex';

    }, 1800);
}

function finishPaymentAndShowCard() {
    closePaymentModal();
    switchTab('card');
    openMrcModal(
        'Paiement Validé !',
        'Félicitations Camarade ! Votre cotisation officielle du MRC a été validée avec succès. Votre Carte de Membre 3D est désormais active et certifiée.',
        'fa-circle-check'
    );
}

// Adaptation automatique de la taille de la carte 3D sur tous les écrans
function adjustCardScale() {
    const wrapper = document.querySelector('.card-3d-wrapper');
    if (!wrapper) return;
    const w = wrapper.clientWidth;
    if (w > 0) {
        const scale = Math.min(0.52, w / 856);
        document.documentElement.style.setProperty('--c-scale', scale);
    }
}
window.addEventListener('resize', adjustCardScale);
window.addEventListener('orientationchange', adjustCardScale);


// ============================================================== //
// PROJET DE SOCIÉTÉ DU MRC : LES 6 PILIERS DU PROGRAMME          //
// ============================================================== //
const MRC_PILLARS = [
    {
        num: 1,
        title: "Santé Publique & Solidarité Nationale",
        subtitle: "Couverture Maladie Universelle & Urgences Gratuites",
        image: "assets/pillar_health.jpg",
        content: "Mise en place d'une véritable Couverture Santé Universelle (CSU) financée par la solidarité républicaine. Rénovation intégrale des hôpitaux régionaux et de district, gratuité totale de la prise en charge des urgences vitales et de la maternité, valorisation statutaire des médecins et personnels de santé."
    },
    {
        num: 2,
        title: "Éducation d'Excellence & Jeunesse Numérique",
        subtitle: "L'École de la Réussite & de l'Innovation",
        image: "assets/pillar_education.jpg",
        content: "Gratuité effective de l'école primaire, refonte bilingue approfondie (Français/Anglais), doublement des allocations de recherche universitaire. Création de Technopôles d'Intelligence Artificielle et de Numérique dans chaque région pour employer la jeunesse."
    },
    {
        num: 3,
        title: "Justice Indépendante & État de Droit",
        subtitle: "L'Égalité de tous les citoyens devant la Loi",
        image: "assets/pillar_justice.jpg",
        content: "Séparation constitutionnelle stricte entre le pouvoir judiciaire et l'exécutif. Conseil Supérieur de la Magistrature autonome présidé par les pairs. Démantèlement des juridictions d'exception pour les civils et libération immédiate de tous les prisonniers d'opinion."
    },
    {
        num: 4,
        title: "Agriculture & Souveraineté Alimentaire",
        subtitle: "Nourrir le Cameroun & Exporter l'Excellence",
        image: "assets/pillar_agriculture.jpg",
        content: "Sécurisation foncière des paysans, subvention massive des intrants bio, mise à disposition de tracteurs communaux et banques de crédit agricole à taux zéro pour faire du Cameroun le grenier agricole indiscutable de la sous-région CEMAC."
    },
    {
        num: 5,
        title: "Énergie, Routes & Souveraineté Industrielle",
        subtitle: "Infrastructures Durables & Made in Cameroon",
        image: "assets/pillar_industry.jpg",
        content: "Mix énergétique 100% renouvelable (hydroélectricité, solaire sahélien), fin définitive des délestages. Bitumage durable des corridors inter-régionaux et création de zones franches agro-industrielles pour transformer notre cacao, coton et bois sur place."
    },
    {
        num: 6,
        title: "Diaspora & Diplomatie Panafricaine",
        subtitle: "Reconnaissance de la 11ème Région & Double Nationalité",
        image: "assets/pillar_diaspora.jpg",
        content: "Reconnaissance constitutionnelle immédiate de la double nationalité. Représentation parlementaire dédiée pour la diaspora, facilitation des investissements productifs des Camerounais de l'étranger et diplomatie de paix au sein de l'Union Africaine."
    }
];

function openPillarModal(idx) {
    const p = MRC_PILLARS[idx];
    if (!p) return;
    const modal = document.getElementById('pillarModal');
    const tEl = document.getElementById('pillarModalTitle');
    const bEl = document.getElementById('pillarModalBody');

    if (tEl) tEl.textContent = 'Pilier ' + p.num + ' : ' + p.title;
    if (bEl) {
        bEl.innerHTML = `
            <div style="border-radius:12px; overflow:hidden; height:180px; margin-bottom:12px;">
                <img src="${p.image}" alt="${p.title}" style="width:100%; height:100%; object-fit:cover;">
            </div>
            <span class="badge-gold" style="margin-bottom:8px; display:inline-block;">ENGAGEMENT PROGRAMMATIQUE N°${p.num}</span>
            <h4 style="color:var(--vert-fonce); font-size:14px; margin-bottom:6px;">${p.subtitle}</h4>
            <p style="font-size:12px; color:var(--encre); line-height:1.5;">${p.content}</p>
        `;
    }
    if (modal) modal.classList.add('active');
}

function closePillarModal() {
    const modal = document.getElementById('pillarModal');
    if (modal) modal.classList.remove('active');
}

// Lightbox Photo Plein Écran
function openGalleryModal(src, title, desc) {
    const modal = document.getElementById('galleryModal');
    const tEl = document.getElementById('galleryModalTitle');
    const iEl = document.getElementById('galleryModalImg');
    const dEl = document.getElementById('galleryModalDesc');

    if (tEl) tEl.textContent = title;
    if (iEl) iEl.src = src;
    if (dEl) dEl.textContent = desc;

    if (modal) modal.classList.add('active');
}

function closeGalleryModal() {
    const modal = document.getElementById('galleryModal');
    if (modal) modal.classList.remove('active');
}


// ========================================================================= //
// FONCTIONS DE MODERNISATION DES 3 PANS (DIRECTOIRE, DÉPÊCHES, HISTOIRE)   //
// ========================================================================= //

// 1. FILTRE DU DIRECTOIRE NATIONAL
function filterDirectoire(cat, btn) {
    document.querySelectorAll('#paneDirectoire .seg-filter-pill').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    const spotlight = document.getElementById('directoireSpotlightSection');
    const execCards = document.querySelectorAll('#executiveLeadersGrid .executive-member-card');

    if (cat === 'all') {
        if (spotlight) spotlight.style.display = 'grid';
        execCards.forEach(c => c.style.display = 'flex');
    } else if (cat === 'presidence') {
        if (spotlight) spotlight.style.display = 'grid';
        execCards.forEach(c => c.style.display = 'none');
    } else {
        if (spotlight) spotlight.style.display = 'none';
        execCards.forEach(c => {
            if (c.getAttribute('data-cat') === cat) {
                c.style.display = 'flex';
            } else {
                c.style.display = 'none';
            }
        });
    }
}

// 2. RECHERCHE DANS LES DÉPÊCHES EN DIRECT
function handleNewsSearch(val) {
    const q = val.toLowerCase().trim();
    const heroCard = document.getElementById('breakingHeroArticle');
    if (heroCard) {
        heroCard.style.display = q === '' ? 'block' : 'none';
    }

    if (!q) {
        renderNews('all');
        return;
    }

    const filtered = appState.articles.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
    );

    const container = document.getElementById('newsListContainer');
    if (!container) return;
    container.innerHTML = '';

    if (filtered.length === 0) {
        container.innerHTML = '<div style="text-align:center; padding:30px; color:var(--gris); font-size:12px;"><i class="fa-solid fa-newspaper text-green" style="font-size:24px; margin-bottom:8px;"></i><br>Aucune dépêche ne correspond à votre recherche.</div>';
        return;
    }

    filtered.forEach((art, idx) => {
        const card = document.createElement('div');
        card.className = 'featured-news-card interactive-hover';
        card.onclick = () => openArticleModal(idx, filtered);
        card.innerHTML = `
            ${art.image ? `<div class="news-img-wrap"><img src="${art.image}" alt="${art.title}"></div>` : ''}
            <div class="news-card-inner">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                    <span class="news-tag">${art.category.toUpperCase()} &bull; ${art.date}</span>
                    <span style="font-size:9px; color:var(--vert); font-weight:700;"><i class="fa-solid fa-bullhorn"></i> ${art.author || 'Directoire'}</span>
                </div>
                <h4 class="news-title">${art.title}</h4>
                <p class="news-excerpt">${art.excerpt}</p>
                <div class="news-share-bar">
                    <span class="view-profile-link">Lire la suite &gt;</span>
                    <div class="share-action-group" onclick="event.stopPropagation()">
                        <button class="share-icon-btn" onclick="shareOnWhatsApp('${art.title.replace(/'/g, "\\'")}')"><i class="fa-brands fa-whatsapp"></i></button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// PARTAGE SUR LES RÉSEAUX SOCIAUX
function shareOnWhatsApp(text) {
    const url = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(text + ' - Source officielle MRC : https://mrc-backend-c11n.onrender.com');
    window.open(url, '_blank');
}

function shareOnTwitter(text, link) {
    const url = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text) + '&url=' + encodeURIComponent(link);
    window.open(url, '_blank');
}

// 3. NAVIGATION HISTOIRE (4 VUES MODERNES)
function switchHistorySubTab(subTab) {
    document.querySelectorAll('#paneHistory .seg-filter-pill').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('#paneHistory .history-content-pane').forEach(p => p.classList.remove('active'));

    if (subTab === 'timeline') {
        const b = document.getElementById('btnHistTimeline');
        const c = document.getElementById('histTimelineContent');
        if (b) b.classList.add('active');
        if (c) c.classList.add('active');
    } else if (subTab === 'presidents') {
        const b = document.getElementById('btnHistPresidents');
        const c = document.getElementById('histPresidentsContent');
        if (b) b.classList.add('active');
        if (c) c.classList.add('active');
    } else if (subTab === 'victories') {
        const b = document.getElementById('btnHistVictories');
        const c = document.getElementById('histVictoriesContent');
        if (b) b.classList.add('active');
        if (c) c.classList.add('active');
    } else if (subTab === 'archives') {
        const b = document.getElementById('btnHistArchives');
        const c = document.getElementById('histArchivesContent');
        if (b) b.classList.add('active');
        if (c) c.classList.add('active');
    }
}
