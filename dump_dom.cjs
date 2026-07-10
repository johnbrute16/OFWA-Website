const { chromium } = require('playwright');

async function main() {
    console.log("Launching browser...");
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    
    console.log("Navigating to http://localhost:5173/gallery...");
    await page.goto('http://localhost:5173/gallery');
    
    console.log("Waiting 4 seconds for images/data to load...");
    await page.waitForTimeout(4000);
    
    console.log("Getting outerHTML of gallery cards...");
    const cardsHtml = await page.evaluate(() => {
        const cards = Array.from(document.querySelectorAll('[class*="galleryCard"]'));
        return cards.map((c, i) => {
            return `Card ${i}:\nOuterHTML:\n${c.outerHTML}\ninnerText:\n${c.innerText}\n`;
        });
    });
    
    console.log(`Found ${cardsHtml.length} cards:`);
    cardsHtml.forEach((html, i) => {
        if (i < 3) {
            console.log(html);
            console.log("==========================================");
        }
    });
    
    await browser.close();
}

main().catch(console.error);
