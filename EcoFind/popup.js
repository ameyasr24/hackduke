// var script = document.createElement('script');
// script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
// script.type = 'text/javascript';
// document.getElementsByTagName('head')[0].appendChild(script);

// script = document.createElement('script');
// script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery-csv/0.71/jquery.csv-0.71.min.js';
// script.type = 'text/javascript';
// document.getElementsByTagName('head')[0].appendChild(script);

var results = [];
var count = 0;
function hndlr(response) {
    
    // var formatted = response.substring(response.indexOf("items")-1);
    // var jsonResponse = JSON.parse(formatted);
    if (response && count<1) {
        document.getElementById("content").innerHTML += "<br/>" + response;
        count++;
        var index = response.indexOf("items");
        var remove = response.substring(0,index);
        var result = response.replaceAll(remove,"");
        index = 0;
        for (var i=0;i<3;i++) {
            var info = [];

            // in production code, item.htmlTitle should have the HTML entities escaped.
            //results.push(item.link);

            //find title
            var startIndex = 0, endIndex = index;

            startIndex = result.indexOf('"title"',index);
            if (startIndex > 0) {
                startIndex+=10;
                endIndex = result.indexOf('",',startIndex+1);
                var title = "title "+result.substring(startIndex,endIndex);
                info.push(title);
            }

            //find image
            startIndex = result.indexOf('"image":',index);
            if (startIndex > 0) {
                startIndex+=10;
                endIndex = result.indexOf('",',startIndex+1);
                var picture = "picture " +result.substring(startIndex,endIndex);
                info.push(picture);
            }

            //find link
            startIndex = result.indexOf('"link"',index)+9;
            if (startIndex > 0) {
                startIndex+=9;
                endIndex = result.indexOf('",',startIndex+1);
                var link = "link "+result.substring(startIndex,endIndex);
                info.push(link);
            }

            index = endIndex;

            //add to results
            results.push(info);
        }

        document.getElementById("col1").innerHTML += results[0];
        document.getElementById("col2").innerHTML += results[1];
        document.getElementById("col3").innerHTML += results[2];
        // for (var j=0; j<results.length; j++) {
        //     document.getElementById("content").innerHTML += "<br/>" + results[j];
        // }
    }
}
function search(searchWords) {    
    //"https://www.googleapis.com/customsearch/v1?key=YOUR_API_KEY&cx=c391cddd12bed7ac3&q=" + searchWords + "&callback=hndlr";
    const Http = new XMLHttpRequest();
    const url = "https://www.googleapis.com/customsearch/v1?key=AIzaSyDA2CNUq-0NziDPwx4nmOwlXjDCDfGSeYw&cx=c391cddd12bed7ac3&q=" + searchWords + "&callback=hndlr";
    Http.open('GET',url);
    Http.send();
    Http.onreadystatechange=(e)=>{
            hndlr(Http.responseText);
    }

}

function rating(title){
    var data;
    console.log('hi');
    $.ajax({
      type: "GET",  
      url: "http://localhost:8080/EcoFind/companynamestest.csv",
      dataType: "text",       
      success: function(response)  {
        document.getElementById("link").innerHTML += "hello";
        data = $.csv.toArrays(response);
        console.log(data);
        var company = title;
        // chrome.tabs.getSelected(null,function(tab) {
        //             //find url and title of page
        //             company = tab.title;
        // });
        //var company = "Abercrombie & Fitch | Authentic American clothing since 1892";
        for (var i=0; i<data.length; i++){
            var x = data[i];
            var cName = x[0];
            if (company.includes(cName)) {
                company = cName;
            }
        }
        document.getElementById("link").innerHTML += "hello";
        console.log(company);
        company = company.toLowerCase();
        company = company.replaceAll(" ", "-");
        var ratingLink = "directory.goodonyou.eco/brand/" + company;
        console.log(ratingLink);
        document.getElementById("link").innerHTML += ratingLink;
        }
    });
}

document.addEventListener('DOMContentLoaded', function(){

    var title, tablink, brand;
    chrome.tabs.getSelected(null,function(tab) {
        //find url and title of page
        tablink = tab.url;
        title = tab.title;
        document.getElementById("productName").innerHTML += "<br/>" + title;
        //document.getElementById("content").innerHTML += "<br/>" + tablink+"<br/>";
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

    //document.getElementById("content").innerHTML += "<br/>" + "hi";
    var searchWords = "converseshoes";
    search(searchWords);
    rating(title);
    //document.getElementById("content").innerHTML += "<br/>" + "hi";
    
}, false);
