const fs = require('fs');
const path = require('path');

const logPath = path.join('C:', 'Users', 'JOHN HACKX', '.gemini', 'antigravity-ide', 'brain', '1a8b69f8-bfff-4c59-af91-8fa635b09a8f', '.system_generated', 'logs', 'transcript_full.jsonl');

const lines = fs.readFileSync(logPath, 'utf8').split('\n');

for (const line of lines) {
    if (!line.trim()) continue;
    try {
        const obj = JSON.parse(line);
        if (obj.content && obj.content.includes('DSCF2597')) {
            console.log("=== Match found in step ===");
            console.log("Type:", obj.type);
            console.log("Status:", obj.status);
            console.log("Content length:", obj.content.length);
            
            // Print occurrences of DSCF2597 and surrounding 200 chars
            let idx = 0;
            while ((idx = obj.content.indexOf('DSCF2597', idx)) !== -1) {
                console.log("--- Snippet ---");
                console.log(obj.content.substring(Math.max(0, idx - 250), Math.min(obj.content.length, idx + 250)));
                idx += 'DSCF2597'.length;
            }
        }
    } catch (e) {
        // ignore
    }
}
