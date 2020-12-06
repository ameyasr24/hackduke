const writeFileSync = require("fs").writeFileSync;
const cheerio = require("cheerio")
const helperFunctions = () => {
    window.$x = xPath => document
        .evaluate(
            xPath,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        )
        .singleNodeValue;
};

/**
 * @class Scraper
 */
module.exports = class Scraper {
    /**
     * @constructor
     */
    constructor(browser, page) {
        this.browser = browser;
        this.page = page;

        //this.rating = "";
        this.url = "https://directory.goodonyou.eco/brand/adidas";
    }

    /**
     * @method main
     */
    async main(){
        await this.page.goto(this.url, {waitUntil: "domcontentloaded"});
        this.content = await this.page.content();
        
        this.page.evaluate(helperFunctions);
    
        //this.rating = await this.page.evaluate(() => {
            
            //const temp = $x('//*[@id="root"]/div/div[4]/div[1]/div[1]/div[2]/div[2]/div/div[2]/span[1]');
            
            //const temp = document.querySelector('#root > div > div:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > span:nth-child(1)');
            
            const $ = cheerio.load(this.content);
            this.rating = $('#root > div > div:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > span:nth-child(1)');


            //return temp.textContent;
        //}
         
         //);

        
        console.log(this.rating);
        console.log(this.rating.textContext);
        this.writeToJson();
    }

    /**
     * @method writeToJson
     */
    writeToJson(){
        writeFileSync("./data/rating.json", JSON.stringify(this.rating));
    }
};
