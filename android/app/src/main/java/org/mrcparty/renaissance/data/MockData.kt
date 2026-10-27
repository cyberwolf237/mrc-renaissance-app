package org.mrcparty.renaissance.data

import org.mrcparty.renaissance.model.*

object MockData {

    val articles = listOf(
        Article(
            id = "art_01",
            title = "President Maurice KAMTO warmly thanks the courageous people of Douala for their exceptional welcome upon his return from the MK2025 rally",
            date = "10 June 2025",
            author = "Webmaster",
            excerpt = "Despite the political pressure that will be exerted on the security forces by those in power, I hope they will serve the Constitution, the laws, the Republic, and ultimately, the Cameroonian people.",
            content = "The National President of the MRC, Maurice Kamto, was greeted by tens of thousands of enthusiastic citizens and supporters in Douala upon landing from Paris. Addressing the cheering crowd, President Kamto reiterated his faith in peaceful political transition through the ballot box and called on all Cameroonians to remain mobilized for the historic 2025 presidential election.",
            imageUrl = "https://mrcparty.net/wp-content/uploads/2025/06/Maurice-Kamto-remercie-populations-Douala-reunion-du-8-juin-ngankam-370x270.jpg",
            category = "Rassemblement",
            url = "https://mrcparty.net/en/president-maurice-kamto-warmly-thanks-the-courageous-people-of-douala-for-their-exceptional-welcome-upon-his-return-from-the-mk2025-rally-held-on-may-31-in-paris-despite-the-political-pressure-that/"
        ),
        Article(
            id = "art_02",
            title = "Statement by President Maurice KAMTO on the Moral and Political Responsibility of the United Nations regarding the UN-ELECAM Convention",
            date = "28 May 2025",
            author = "Webmaster",
            excerpt = "The CRM, the PAC and the People of Change call on the UN to make public the Convention signed with ELECAM or else to publicly disassociate itself from it.",
            content = "President Maurice Kamto issued a solemn declaration urging international institutions to guarantee impartiality and transparency in Cameroon's electoral processes. The secret convention signed between ELECAM and the UN system must be published for the public good and constitutional scrutiny.",
            imageUrl = "https://mrcparty.net/wp-content/uploads/2025/05/onu-concubinage-elecam-mrc-maurice-kamto2-370x270.jpg",
            category = "Communiqué Officiel",
            url = "https://mrcparty.net/en/statement-by-president-maurice-kamto-on-the-moral-and-political-responsibility-of-the-united-nations-regarding-the-authoritarian-drift-of-the-cameroonian-regime-and-the-secretly-signed-convention-with/"
        ),
        Article(
            id = "art_03",
            title = "Statement from President Maurice KAMTO on ELECAM’s pre-election fraud during registration on the electoral lists",
            date = "07 April 2024",
            author = "Webmaster",
            excerpt = "The CRM will never allow again its victory in an election to be stolen. ELECAM is openly opposed to the registration of Cameroonians on electoral rolls.",
            content = "Detailed analysis of systemic obstacles encountered by young Cameroonians trying to enroll on the voter rolls. The CRM deployed hundreds of volunteer sentinels across the 10 regions to assist citizens and document irregularities.",
            imageUrl = "https://mrcparty.net/wp-content/uploads/2024/04/elecam-inscriptions-sur-les-listes-electorales-mrc-370x270.jpg",
            category = "Élections & ELECAM",
            url = "https://mrcparty.net/en/statement-from-president-maurice-kamto-on-elecams-pre-election-fraud-during-registration-on-the-electoral-lists-the-crm-will-never-allow-again-its-victory-in-an-election-to-be-stole/"
        ),
        Article(
            id = "art_04",
            title = "President Maurice KAMTO presents the micro-development projects carried out with the remaining funds from Operation SCSI",
            date = "23 January 2024",
            author = "Webmaster",
            excerpt = "I would like to see this surge of solidarity and generosity put to work for our country in all areas tomorrow.",
            content = "Accountability report on the Cameroon Survival Initiative (SCSI), detailing community boreholes, solar lighting for remote clinics, and medical supplies provided to underserved populations without tribal or political discrimination.",
            imageUrl = "https://mrcparty.net/wp-content/uploads/2024/01/scsi-survival-microprojets-realises-mrc-maurice-kamto-370x270.png",
            category = "Solidarité SCSI",
            url = "https://mrcparty.net/en/president-maurice-kamto-presents-the-micro-development-projects-carried-out-with-the-remaining-funds-from-operation-scsi-cameroon-survival-initiative-i-would-like-to-see-this-surge-of-solidarity-an/"
        )
    )

    val speeches = listOf(
        Speech(
            id = "sp_01",
            title = "Discours de Politique Générale au 3ème Congrès Ordinaire du MRC",
            eventName = "3ème Congrès Ordinaire - Palais des Congrès de Yaoundé",
            date = "11 Décembre 2023",
            location = "Yaoundé, Cameroun",
            summary = "Il est grand temps de nous organiser pour agir ensemble dans la dignité, la paix et la ferveur patriotique.",
            fullText = "Militantes, militants, chers compatriotes. Notre engagement politique n'est pas un combat contre des personnes, mais une lutte pour des valeurs. Le Cameroun que nous voulons est une terre de justice, de travail récompensé, d'égalité des chances pour chaque fille et fils de notre nation...",
            audioDurationMinutes = 52,
            keyQuotes = listOf(
                "Le changement dans la paix et par les urnes est le seul chemin d'honneur.",
                "Aucun peuple conscient de son destin ne peut accepter l'asservissement indéfini.",
                "Notre jeunesse n'est pas un fardeau, c'est le trésor énergétique de la Renaissance."
            )
        ),
        Speech(
            id = "sp_02",
            title = "Discours Historique de la Place de la République à Paris",
            eventName = "Rassemblement de la Diaspora pour la Renaissance",
            date = "01 Février 2020",
            location = "Place de la République, Paris, France",
            summary = "Le triomphe de la résistance pacifique et la fraternité indéfectible du peuple camerounais.",
            fullText = "Compatriotes venus de tous les continents. Vous portez haut l'étendard de notre patrie. Le Cameroun vous attend pour bâtir ensemble ses industries, ses universités et ses hôpitaux modernes...",
            audioDurationMinutes = 68,
            keyQuotes = listOf(
                "Nous avons brisé les chaînes de la peur !",
                "Le Cameroun debout ne fléchira devant aucune oppression."
            )
        ),
        Speech(
            id = "sp_03",
            title = "Message du 10 Février à la Jeunesse Camerounaise",
            eventName = "58ème Fête Nationale de la Jeunesse",
            date = "10 Février 2024",
            location = "Yaoundé, Cameroun",
            summary = "Ce régime a bâti toute une stratégie pour maintenir la jeunesse à distance de son avenir.",
            fullText = "Jeunesse camerounaise, réveillez-vous ! L'inscription massive sur les listes électorales est votre arme démocratique absolue...",
            audioDurationMinutes = 35,
            keyQuotes = listOf(
                "Votre vote est votre voix. Ne cédez ni au découragement, ni aux marchands d'illusions."
            )
        )
    )

    val cameroonFederations = listOf(
        "FD COM SANGMELIMA OWONO MIMBO'O (SUD)",
        "FÉDÉRATION DU CENTRE 1 - YAOUNDÉ 1 & 2",
        "FÉDÉRATION DU CENTRE 2 - YAOUNDÉ 3 & 6",
        "FÉDÉRATION DU LITTORAL 1 - WOURI EST (DOUALA)",
        "FÉDÉRATION DU LITTORAL 2 - WOURI OUEST (BONABÉRI)",
        "FÉDÉRATION DE L'OUEST 1 - BAFOUSSAM & HAUTS-PLATEAUX",
        "FÉDÉRATION DE L'OUEST 2 - BAMBOUTOS & MENOUA",
        "FÉDÉRATION DU NORD - BÉNOUÉ & GAROUA",
        "FÉDÉRATION DE L'EXTRÊME-NORD - DIAMARÉ & MAROUA",
        "FÉDÉRATION DE L'ADAMAOUA - VINA & NGAOUNDÉRÉ",
        "FÉDÉRATION DU NORD-OUEST - MEZAM & BAMENDA",
        "FÉDÉRATION DU SUD-OUEST - FAKO & BUEA / LIMBE",
        "FÉDÉRATION DE L'EST - LOM-ET-DJÉREM & BERTOUA",
        "FÉDÉRATION DIASPORA EUROPE (FRANCE, ALLEMAGNE, BELGIQUE, UK)",
        "FÉDÉRATION DIASPORA AMÉRIQUE DU NORD (USA, CANADA)",
        "FÉDÉRATION DIASPORA AFRIQUE & ASIE-OCÉANIE"
    )

    val leaders = listOf(
        Leader(
            id = "kamto",
            name = "Pr Maurice KAMTO",
            role = "Président Fondateur du MRC",
            tag = "PRÉSIDENT FONDATEUR",
            bio = "Agrégé des Facultés de Droit, Doyen honoraire de l'Université de Yaoundé II, Ancien Président de la Commission du Droit International de l'ONU.",
            parcours = "Artisan de la victoire historique de Bakassi à La Haye en 2002. Démissionnaire du gouvernement en 2011 par conviction éthique, fondateur du MRC en 2012 et guide moral de la Renaissance.",
            photoUrl = "president_maurice_kamto.jpg",
            latestStatement = "Je félicite chaleureusement la Présidente Tiriane Balbine Noah pour son élection triomphale."
        ),
        Leader(
            id = "tiriane",
            name = "Tiriane Balbine NOAH",
            role = "Présidente Nationale du MRC (Élue le 17 Octobre 2026 à 96,89 %)",
            tag = "PRÉSIDENTE NATIONALE (96,89%)",
            bio = "Cadre supérieure de gestion, figure centrale de la résistance républicaine.",
            parcours = "Assure la direction par intérim en 2019 lors de l'incarcération des dirigeants. Élue Présidente Nationale le 17 octobre 2026 avec 96,89 % des voix à la suite de la démission de Maurice Kamto.",
            photoUrl = "presidente_tiriane_noah.png",
            latestStatement = "Chaque carte délivrée est une promesse d'alternance et de libération démocratique."
        ),
        Leader(
            id = "simh",
            name = "Emmanuel SIMH",
            role = "Vice-Président National",
            tag = "VICE-PRÉSIDENT NATIONAL",
            bio = "Avocat éminent au Barreau du Cameroun, Coordonnateur du Collectif des Avocats du MRC.",
            parcours = "Défenseur acharné de l'État de droit et de la justice indépendante.",
            latestStatement = "Le droit et la justice sont les boucliers inviolables de notre engagement républicain."
        ),
        Leader(
            id = "ngompe",
            name = "Elie NGOMPE",
            role = "Vice-Président National",
            tag = "VICE-PRÉSIDENT NATIONAL",
            bio = "Cadre politique stratège, expert du maillage territorial partisan.",
            parcours = "Élu Vice-Président lors de la Convention Extraordinaire du 17 octobre 2026.",
            latestStatement = "L'ancrage local dans chaque arrondissement est le gage de la victoire."
        ),
        Leader(
            id = "kaigama",
            name = "Ismaël KAIGAMA",
            role = "Vice-Président National",
            tag = "VICE-PRÉSIDENT NATIONAL",
            bio = "Personnalité politique influente du Grand-Nord (Adamaoua, Nord, Extrême-Nord).",
            parcours = "Élu Vice-Président le 17 octobre 2026, garant de l'unité républicaine dans le Septentrion.",
            latestStatement = "Le Grand-Nord marche résolument avec la Présidente Tiriane Noah."
        ),
        Leader(
            id = "same_kolle",
            name = "Samuel SAME KOLLE",
            role = "Vice-Président National",
            tag = "VICE-PRÉSIDENT NATIONAL",
            bio = "Universitaire, chercheur et penseur des politiques publiques républicaines.",
            parcours = "Élu Vice-Président le 17 octobre 2026, en charge des études et du programme.",
            latestStatement = "Le projet de société du MRC répond aux urgences économiques du Cameroun."
        ),
        Leader(
            id = "saadou",
            name = "Aissatou SAADOU",
            role = "Vice-Présidente Nationale",
            tag = "VICE-PRÉSIDENTE NATIONALE",
            bio = "Leader féministe républicaine, responsable de la mobilisation citoyenne.",
            parcours = "Élue Vice-Présidente Nationale le 17 octobre 2026.",
            latestStatement = "Les femmes et la jeunesse sont le cœur battant de la Renaissance."
        ),
        Leader(
            id = "ndong",
            name = "Christopher Nveh NDONG",
            role = "Secrétaire Général du MRC",
            tag = "SECRÉTAIRE GÉNÉRAL",
            bio = "Avocat éminent de la zone anglophone, artisan de l'unité et du bilinguisme.",
            parcours = "Secrétaire Général du parti, pilote l'administration centrale et le déploiement des fédérations.",
            latestStatement = "The CRM stands for real decentralization, justice and constitutional peace."
        ),
        Leader(
            id = "oko",
            name = "Oko Appolinaire LEGRAND",
            role = "Trésorier National du MRC",
            tag = "TRÉSORIER NATIONAL",
            bio = "Gestionnaire financier chevronné, garant de la reddition des comptes.",
            parcours = "Élu Trésorier National le 17 octobre 2026 pour la transparence des fonds citoyens.",
            latestStatement = "La rigueur et la transparence financière sont nos principes cardinaux."
        )
    )

    val historyEpochs = listOf(
        HistoryEpoch("2012", "Congrès Constitutif", "Fondation du MRC & élection de Maurice Kamto", "Autorisation MINATD N°000221."),
        HistoryEpoch("2013", "Entrée au Parlement", "Élections législatives & municipales", "Premier député MRC élu dans le Wouri-Est."),
        HistoryEpoch("2018", "Élection Présidentielle", "Campagne des 5 Piliers", "Contentieux électoral historique devant le Conseil Constitutionnel."),
        HistoryEpoch("2019", "Résistance Pacifique", "Marches blanches & prison de Kondengui", "Résistance des dirigeants et libération sous clameur populaire."),
        HistoryEpoch("2020", "Place de la République & SCSI", "Meeting géant à Paris & Solidarité Covid-19", "Plus de 20 000 compatriotes mobilisés."),
        HistoryEpoch("2023", "3ème Convention Ordinaire", "Palais des Congrès de Yaoundé", "Consolidation statutaire."),
        HistoryEpoch("2024-2025", "Organisation de Masse & Sentinelle", "Déploiement terrain", "Cap sur la sécurisation des 25 000 bureaux de vote."),
        HistoryEpoch("2026", "Convention Extraordinaire (17 Octobre)", "Nouvelle direction nationale élue", "Élection de Tiriane Balbine Noah Présidente Nationale à 96,89% des voix.", isHighlight = true)
    )
}
