const fs = require('fs');
const path = 'C:/Users/LENOVO T580/.gemini/antigravity/scratch/mrc_renaissance_app/backend/public/app.js';
let content = fs.readFileSync(path, 'utf-8');

// Replace corrupted line
content = content.replace(
    'if (iEl) iEl.innerHTML = <i class="fa-solid "></i>;',
    'if (iEl) iEl.innerHTML = \'<i class="fa-solid \' + icon + \'"></i>\';'
);

try {
    new Function(content);
    console.log("SUCCESS: app.js is 100% valid JavaScript!");
    fs.writeFileSync(path, content, 'utf-8');
} catch (err) {
    console.error("Syntax error remains:", err);
}
