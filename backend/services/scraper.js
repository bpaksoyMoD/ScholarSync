const puppeteer = require('puppeteer');

class ScraperService {
    async fetchDeadlines(url) {
        try {
            const browser = await puppeteer.launch({ headless: "new" });
            const page = await browser.newPage();
            await page.goto(url, { waitUntil: 'networkidle2' });

            // This is a generic scraper logic. In a real world, we'd need specific selectors per site.
            // Here we look for common patterns like "Deadline", dates, etc.
            const data = await page.evaluate(() => {
                const bodyText = document.body.innerText;
                const dateRegex = /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2},?\s+\d{4}\b/gi;
                const dates = bodyText.match(dateRegex) || [];

                return {
                    title: document.title,
                    dates: [...new Set(dates)].slice(0, 5) // Return top 5 unique dates found
                };
            });

            await browser.close();
            return data;
        } catch (error) {
            console.error('Scraping failed:', error);
            throw new Error('Failed to scrape website');
        }
    }
}

module.exports = new ScraperService();
