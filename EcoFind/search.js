var results = [];
function hndlr(response) {
    for (var i = 0; i < response.items.length; i++) {
        var item = response.items[i];
        // in production code, item.htmlTitle should have the HTML entities escaped.
        results.push(item.link);
        //document.getElementById("content").innerHTML += "<br/>" + item.link;
    }
    for (var j=0; j<response.items.length; j++){
        document.write(results[j]);
    }
}
function search(searchWords) {
    "https://www.googleapis.com/customsearch/v1?key=YOUR_API_KEY&cx=c391cddd12bed7ac3&q=" + searchWords + "&callback=hndlr";
}