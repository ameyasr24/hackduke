const puppeteer = require("puppeteer");
const Scraper = require("./scrapers/class-based");

/**
 * Run Scrapper
 */
(async () => {
    let browser;
    let page;

    try {
        browser = await puppeteer.launch({
            headless: true
        });

        page = await browser.newPage();

        await new Scraper(browser, page).main();
    } catch (error) {
        console.log(error.stack || error);
    }

    await browser.close();
})();