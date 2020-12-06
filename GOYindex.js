$ mkdir scraper && cd scrapper
$ npm init - y
$ npm install axios
$ npm install cheerios



const siteUrl = "https://directory.goodonyou.eco/?_ga=2.166853623.891805247.1607140600-430399939.1607140600";
const axios = require("axios");
const fetchData = async () => {
    const result = await axios.get(siteUrl);
    return cheerio.load(result.data);
};


//deleted job button line

const express = require("express");
const router = express.Router();
const getResults = require("../scraper");
/* GET home page. */
router.get("/", async function (req, res, next) {
    const result = await getResults();
    res.render("index", result);
});
module.exports = router;

