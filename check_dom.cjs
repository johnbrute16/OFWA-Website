const fs = require('fs');
const path = require('path');

const logPath = path.join('C:', 'Users', 'JOHN HACKX', '.gemini', 'antigravity-ide', 'brain', '1a8b69f8-bfff-4c59-af91-8fa635b09a8f', '.system_generated', 'logs', 'transcript_full.jsonl');

const lines = fs.readFileSync(logPath, 'utf8').split('\n');

for (const line of lines) {
    if (!line.trim()) continue;
    try {
        const obj = JSON.parse(line);
        if (obj.content && obj.content.includes('_galleryCard') && obj.type !== 'PLANNER_RESPONSE' && obj.type !== 'GREP_SEARCH') {
            console.log("=== Match found in step ===");
            console.log("Type:", obj.type);
            let idx = obj.content.indexOf('_galleryCard');
            console.log(obj.content.substring(Math.max(0, idx - 100), Math.min(obj.content.length, idx + 1000)));
            console.log("------------------------");
        }
    } catch (e) {
        // ignore
    }
}
