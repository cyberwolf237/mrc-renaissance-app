/**
 * MRC Watchdog — Garde le serveur toujours actif
 * Lance : node watchdog.js
 */
const { spawn } = require('child_process');
const path = require('path');

const SERVER = path.join(__dirname, 'server.js');
let restarts = 0;

function startServer() {
    console.log(`[WATCHDOG] Démarrage du serveur MRC... (tentative ${++restarts})`);
    const proc = spawn('node', [SERVER], {
        stdio: 'inherit',
        shell: false
    });

    proc.on('exit', (code, signal) => {
        console.log(`[WATCHDOG] Serveur arrêté (code=${code}, signal=${signal}). Redémarrage dans 3s...`);
        setTimeout(startServer, 3000);
    });

    proc.on('error', (err) => {
        console.error('[WATCHDOG] Erreur:', err.message);
        setTimeout(startServer, 3000);
    });
}

startServer();
console.log('[WATCHDOG] Surveillance active — Le serveur MRC redémarre automatiquement.');
