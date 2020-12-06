const writeFileSync = require("fs").writeFileSync;

/**
 * @function Scraper
 */
const Scraper = async (browser, page) => {
  const url = "https://directory.goodonyou.eco/brand/adidas";

  await page.goto(url, { waitUntil: "domcontentloaded" });

  const standings = await page.evaluate(() =>document.querySelector(
    "#root > div > div.sc-hEsumM.EKgJr > div.sc-ktHwxA.cTYmXB > div:nth-child(1) > div.StyledBox-sc-13pk1d4-0.jtgCKU > div.StyledBox-sc-13pk1d4-0.ezgJqo > div > div.StyledBox-sc-13pk1d4-0.IRSNj > span:nth-child(1)"
    ).getAttribute("data-value"));

  writeToJson(standings);
};

/**
 * @function writeToJson
 */
const writeToJson = standings => {
  writeFileSync("./data/standings.json", JSON.stringify(standings));
};

module.exports = Scraper;