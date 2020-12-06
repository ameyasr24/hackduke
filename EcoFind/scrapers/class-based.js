const writeFileSync = require("fs").writeFileSync;


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

        this.rating = "";
        this.url = "https://directory.goodonyou.eco/brand/adidas";
    }

    /**
     * @method main
     */
    async main(){
        await this.page.goto(this.url, {waitUntil: "domcontentloaded"})

        this.rating = await this.page.evaluate(() => document.querySelector(
            "#root > div > div.sc-hEsumM.EKgJr > div.sc-ktHwxA.cTYmXB > div:nth-child(1) > div.StyledBox-sc-13pk1d4-0.jtgCKU > div.StyledBox-sc-13pk1d4-0.ezgJqo > div > div.StyledBox-sc-13pk1d4-0.IRSNj > span:nth-child(1)"
            ).getAttribute("data-value"));
        this.writeToJson();
    }

    /**
     * @method writeToJson
     */
    writeToJson(){
        writeFileSync("./data/rating.json", JSON.stringify(this.rating));
    }
};
