// import './search.js';
var results = [];
function hndlr(response) {
    document.getElementById("content").innerHTML += "<br/>" + "bye";
    // for (var i = 0; i < response.items.length; i++) {
    //     var item = response.items[i];
    //     // in production code, item.htmlTitle should have the HTML entities escaped.
    //     results.push(item.link);
    //     //document.getElementById("content").innerHTML += "<br/>" + item.link;
    // }
    // for (var j=0; j<response.items.length; j++){
    //     document.getElementById("content").innerHTML += "<br/>" + results[j];
// }
    document.getElementById("content").innerHTML += "<br/>" + response;
    
}
function search(searchWords) {
    //document.getElementById("content").innerHTML += "<br/>" + "bye";
    
    //"https://www.googleapis.com/customsearch/v1?key=YOUR_API_KEY&cx=c391cddd12bed7ac3&q=" + searchWords + "&callback=hndlr";
    const Http = new XMLHttpRequest();
    const url = "https://www.googleapis.com/customsearch/v1?key=YOUR_API_KEY&cx=c391cddd12bed7ac3&q=" + searchWords + "&callback=hndlr";
    Http.open('GET',url);
    Http.send();
    Http.onreadystatechange=(e)=>{
        //if (this.readyState===4)
            hndlr(Http.responseText);
    }
}

document.addEventListener('DOMContentLoaded', function(){

    var title, tablink, brand;
    chrome.tabs.getSelected(null,function(tab) {
        //find url and title of page
        tablink = tab.url;
        title = tab.title;
        document.getElementById("content").innerHTML += "<br/>" + title;
        document.getElementById("content").innerHTML += "<br/>" + tablink;
        //brand = brand.hostName;

        //print to chrome extension
        // document.write(tablink+"\n");
        // document.write(title);

        //alert(title);
    });
    // var alternateItemsButton = document.getElementById('alternate');
    // alternateItemsButton.addEventListener('click', function(){
    //     alert("These items are more sustainable\n"+tablink+"\n"+title+"\n"+brand);

    // }, false );

    document.getElementById("content").innerHTML += "<br/>" + "hi";
    var searchWords = "blackdress";
    search(searchWords);
    document.getElementById("content").innerHTML += "<br/>" + "hi";
    
}, false);