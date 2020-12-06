const cheerio = require("cheerio");
const axios = require("axios");
const siteUrl = "https://directory.goodonyou.eco/?_ga=2.166853623.891805247.1607140600-430399939.1607140600";
let siteName = "";
const categories = new Set();
const tags = new Set();
const locations = new Set();
const positions = new Set();


const fetchData = async () => {
    const result = await axios.get(siteUrl);
    return cheerio.load(result.data);
};
const getResults = async () => {
    const $ = await fetchData();
    siteName = $('.top > .action-post-job').text(); //change line bc specific to job posting
    $(".tags .tag").each((index, element) => {
        tags.add($(element).text());
    });
    $(".location").each((index, element) => {
        locations.add($(element).text());
    });
    $("div.nav p").each((index, element) => {
        categories.add($(element).text());
    });

    $('.company_and_position [itemprop="title"]')
        .each((index, element) => {
            positions.add($(element).text());
        });
    //Convert to an array so that we can sort the results.
    return {
        positions: [...positions].sort(),
        tags: [...tags].sort(),
        locations: [...locations].sort(),
        categories: [...categories].sort(),
        siteName,
    };
};
module.exports = getResults;