/**
 * Serveur Full-Stack & Base de Données Persistante du MRC
 * Compatible Node.js 18+ (0 dépendance requise)
 * Prêt pour déploiement gratuit sur Render.com, Railway, Vercel, Koyeb
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.PORT || 3000;
// DB_PATH: sur Render utilise /var/data/ (disque persistant), sinon dossier local
const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'data', 'members_database.json');
const STATIC_DIR = fs.existsSync(path.join(__dirname, 'public')) 
    ? path.join(__dirname, 'public') 
    : path.resolve(__dirname, '..', 'simulator');

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

// Initialisation de la base de données persistante
function loadDatabase() {
    try {
        if (!fs.existsSync(DB_PATH)) {
            const initialData = [
                {
                    numero: "SU00062551",
                    prenom: "CYRILLE",
                    nom: "EDOU",
                    structure: "FD COM SANGMELIMA OWONO MIMBO'O",
                    tel: "659452898",
                    email: "cyrille.edou@militant-mrc.org",
                    date: "2024-02-19",
                    cotisation: "1.000 F CFA",
                    status: "ACTIF / VALIDE",
                    signatureHash: "MRC-9A74E82F10BC",
                    certifications: { nonAppartenance: true, plafondLegal: true, rgpd: true },
                    registeredAt: new Date().toISOString()
                }
            ];
            fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
            fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2), 'utf-8');
            return initialData;
        }
        const raw = fs.readFileSync(DB_PATH, 'utf-8');
        return JSON.parse(raw);
    } catch (e) {
        console.error("Erreur lecture DB, réinitialisation:", e);
        return [];
    }
}

function saveDatabase(data) {
    try {
        fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
        fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
        return true;
    } catch (e) {
        console.error("Erreur écriture DB:", e);
        return false;
    }
}

function sendJson(res, statusCode, payload) {
    res.writeHead(statusCode, {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end(JSON.stringify(payload));
}

// Serveur HTTP Principal
const server = http.createServer((req, res) => {
    // Gestion CORS Preflight
    if (req.method === 'OPTIONS') {
        res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        return res.end();
    }

    const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const pathname = parsedUrl.pathname;

    // ========================================== //
    // API REST BACKEND & BASE DE DONNÉES         //
    // ========================================== //

    // 1. GET /api/members : Liste tous les adhérents (anciens + nouveaux)
    if (req.method === 'GET' && pathname === '/api/members') {
        const members = loadDatabase();
        return sendJson(res, 200, {
            success: true,
            total: members.length,
            members: members
        });
    }

    // 2. GET /api/members/:numero : Consulte un adhérent par son numéro SU
    if (req.method === 'GET' && pathname.startsWith('/api/members/')) {
        const num = pathname.split('/').pop().toUpperCase();
        const members = loadDatabase();
        const found = members.find(m => m.numero.toUpperCase() === num);
        if (found) {
            return sendJson(res, 200, { success: true, member: found });
        } else {
            return sendJson(res, 404, { success: false, message: `Adhérent ${num} introuvable.` });
        }
    }

    // 3. POST /api/members : Enregistre un nouvel adhérent de manière permanente
    if (req.method === 'POST' && pathname === '/api/members') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const data = JSON.parse(body || '{}');

                const prenom = (data.prenom || '').trim().toUpperCase();
                const nom = (data.nom || '').trim().toUpperCase();
                const structure = (data.structure || '').trim();
                const tel = (data.tel || '').trim();
                const email = (data.email || '').trim();
                const cotisation = data.cotisation || '1 000 F CFA';

                if (!prenom || !nom || !structure || !tel) {
                    return sendJson(res, 400, {
                        success: false,
                        message: "Champs obligatoires manquants (nom, prénom, structure, téléphone)."
                    });
                }

                const members = loadDatabase();

                // Génération automatique du numéro SU officiel incrémental
                const maxSeq = members.reduce((acc, m) => {
                    const match = m.numero.match(/SU0*(\d+)/);
                    if (match) {
                        const val = parseInt(match[1]);
                        return val > acc ? val : acc;
                    }
                    return acc;
                }, 62551);

                const newSeq = maxSeq + 1;
                const newNum = `SU000${newSeq}`;
                const todayIso = new Date().toISOString().slice(0, 10);

                // Empreinte cryptographique officielle
                const rawSign = `${newNum}|${prenom}|${nom}|${todayIso}|MRC_OFFICIAL_SECRET_KEY`;
                const hash = "MRC-" + crypto.createHash('sha256').update(rawSign).digest('hex').substring(0, 12).toUpperCase();

                const newMember = {
                    numero: newNum,
                    prenom: prenom,
                    nom: nom,
                    structure: structure,
                    tel: tel,
                    email: email,
                    date: todayIso,
                    cotisation: cotisation.includes('F CFA') ? cotisation : `${parseInt(cotisation).toLocaleString()} F CFA`,
                    status: "ACTIF / VALIDE",
                    signatureHash: hash,
                    certifications: {
                        nonAppartenance: !!data.checkNonAppartenance,
                        plafondLegal: !!data.checkLegalResidance,
                        rgpd: !!data.checkRgpd
                    },
                    registeredAt: new Date().toISOString()
                };

                // Sauvegarde persistante dans le fichier JSON
                members.unshift(newMember);
                saveDatabase(members);

                console.log(`[MRC DB] Nouvel adhérent enregistré : ${newNum} - ${prenom} ${nom} (${structure})`);

                return sendJson(res, 201, {
                    success: true,
                    message: "Adhésion enregistrée avec succès dans la base de données officielle du MRC.",
                    member: newMember,
                    totalMembers: members.length
                });

            } catch (err) {
                return sendJson(res, 500, {
                    success: false,
                    message: "Erreur lors du traitement : " + err.message
                });
            }
        });
        return;
    }

    // 4. GET /api/verify : Contrôle d'authenticité de carte (QR Code)
    if (req.method === 'GET' && pathname === '/api/verify') {
        const num = (parsedUrl.searchParams.get('n') || '').toUpperCase();
        const sig = (parsedUrl.searchParams.get('sig') || '').toUpperCase();
        const members = loadDatabase();
        const found = members.find(m => m.numero.toUpperCase() === num);

        if (found) {
            const isValid = !sig || found.signatureHash.toUpperCase() === sig;
            return sendJson(res, 200, {
                success: true,
                authentic: isValid,
                member: found,
                verifiedAt: new Date().toISOString()
            });
        } else {
            return sendJson(res, 404, {
                success: false,
                authentic: false,
                message: "Numéro de carte non répertorié dans le registre central."
            });
        }
    }

    // 5. GET /api/stats : Statistiques globales du parti
    if (req.method === 'GET' && pathname === '/api/stats') {
        const members = loadDatabase();
        const byStructure = {};
        members.forEach(m => {
            byStructure[m.structure] = (byStructure[m.structure] || 0) + 1;
        });
        return sendJson(res, 200, {
            success: true,
            totalMembers: members.length,
            activeMembers: members.filter(m => m.status.includes('ACTIF') || m.status.includes('PRÉSIDENT')).length,
            byStructure: byStructure
        });
    }

    // ========================================== //
    // SERVEUR DE FICHIERS STATIQUES (FRONTEND)   //
    // ========================================== //
    let filePath = path.join(STATIC_DIR, pathname === '/' ? 'index.html' : pathname);

    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            return res.end('Page ou ressource introuvable');
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        res.writeHead(200, { 'Content-Type': contentType });
        const stream = fs.createReadStream(filePath);
        stream.pipe(res);
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`=======================================================`);
    console.log(`[MRC SERVER] Serveur Full-Stack & Base de Données Actif`);
    console.log(`[MRC SERVER] URL Locale : http://localhost:${PORT}`);
    console.log(`[MRC SERVER] Base de données : ${DB_PATH}`);
    console.log(`=======================================================`);
});
