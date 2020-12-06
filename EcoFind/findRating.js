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

// const Url='https://directory.goodonyou.eco/brand/adidas';


// (async ()=>{

//     const browser = await puppeteer.launch({headless: true});
//     const page = await browser.newPage();

//     await page.goto(Url, {waitUntil: "domcontentloaded"});
//     await page.waitForSelector('img').then(
        
//     );
//     const html = await page.content();
//     // const response=request.get(Url)
//     const $ = await cheerio.load(html);




//     // const companies=$('div.base.startup').html()
//      const companies=await $('div.base.startup > div.company.column > div > div.text > div.pitch').text()
//     // const companies=document.querySelectorAll('div.base.startup > div.company.column > div > div.text > div.pitch')

//     console.log(companies)
//     await browser.close()

// } )()
