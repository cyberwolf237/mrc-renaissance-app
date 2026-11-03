const fs = require('fs');
const path = 'C:/Users/LENOVO T580/.gemini/antigravity/scratch/mrc_renaissance_app/backend/public/app.js';
let content = fs.readFileSync(path, 'utf-8');

// Insert API_BASE definition
if (!content.includes('const API_BASE =')) {
    content = "const API_BASE = window.location.protocol === 'file:' ? 'https://mrc-backend-c11n.onrender.com' : '';\n" + content;
}

// Replace relative fetch endpoints
content = content.replace(/fetch\('\/api\//g, "fetch(API_BASE + '/api/");

try {
    new Function(content);
    console.log("SUCCESS: app.js updated with API_BASE and syntax verified!");
    fs.writeFileSync(path, content, 'utf-8');
} catch (e) {
    console.error("Syntax error:", e);
}
