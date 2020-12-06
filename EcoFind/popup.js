
var results = [];
var count = 0;
function hndlr(response) {
    
    // var formatted = response.substring(response.indexOf("items")-1);
    // var jsonResponse = JSON.parse(formatted);
    if (response && count<1) {
        //document.getElementById("content").innerHTML += "<br/>" + response;
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
                var title = "title: "+result.substring(startIndex,endIndex);
                info.push(title);
            }

            //find link
            startIndex = result.indexOf('"link"',index);
            if (startIndex > 0) {
                startIndex+=9;
                endIndex = result.indexOf('",',startIndex+1);
                var link = "link: "+result.substring(startIndex,endIndex);
                info.push(link);
            }

            //find image
            startIndex = result.indexOf('"image":',index);
            if (startIndex > 0) {
                startIndex+=10;
                endIndex = result.indexOf('",',startIndex+1);
                var image = "image: " +result.substring(startIndex,endIndex);
                info.push(image);
            }

            index = endIndex;

            //add to results
            results.push(info);
        }

        for (var i=1;i<=3;i++) {
            var id = "col"+i;
            for (var j=0;j<results[i-1].length;j++) {
                
                switch (results[i-1][j].charAt(0)) {
                    case 't':
                        //document.getElementById(id).innerHTML+= "<br/>"+i+" title: "+results[i-1][j].substring(7);
                        var newHeading = document.createElement("h4");
                        newHeading.innerHTML = results[i-1][j].substring(7);
                        document.getElementById(id).appendChild(newHeading);
                        break;
                    case 'i':
                        //document.getElementById(id).innerHTML+= "<br/>"+i+" img: "+results[i-1][j].substring(7);
                        var img = document.createElement("img");
                        img.src = results[i-1][j].substring(7);
                        document.getElementById(id).appendChild(img);
                        break;
                    case 'l':
                        //document.getElementById(id).innerHTML+= "<br/>"+i+" link: "+results[i-1][j].substring(6);
                        var a = document.createElement('a');
                        a.setAttribute('href',results[i-1][j].substring(6));
                        a.setAttribute('target',"_blank");
                        a.innerHTML = "Click here!";
                        document.getElementById(id).appendChild(a);
                        break;
                }
            }
        }
    }
}
function search(searchWords) {    
    //"https://www.googleapis.com/customsearch/v1?key=YOUR_API_KEY&cx=c391cddd12bed7ac3&q=" + searchWords + "&callback=hndlr";
    const Http = new XMLHttpRequest();
    const url = "https://www.googleapis.com/customsearch/v1?key=APIKEY&cx=c391cddd12bed7ac3&q=" + searchWords + "&callback=hndlr";
    Http.open('GET',url);
    Http.send();
    Http.onreadystatechange=(e)=>{
            hndlr(Http.responseText);
    }

}

function getRating(brandLink){
    $.get(brandLink, null, function(text){
        alert($(text).find('.StyledText-sc-1sadyjn-0 bBUTWf'));
    });
    var request = new XMLHttpRequest();

    request.addEventListener("load", function(evt){
        console.log(evt);
    }, false);

    request.open('GET', brandLink, true),
    request.send();
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
        //             //find url and title of page
        //             company = tab.title;
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

    var title, tablink;
    chrome.tabs.getSelected(null,function(tab) {
        //find url and title of page
        tablink = tab.url;
        title = tab.title;
        document.getElementById("productName").innerHTML += title;

        search(title);
        rating(title);
        getRating("https://directory.goodonyou.eco/brand/abercrombie-and-fitch");
        //document.getElementById("content").innerHTML += "<br/>" + tablink+"<br/>";
        //brand = brand.hostName;

        //alert(title);
    });
    // var alternateItemsButton = document.getElementById('alternate');
    // alternateItemsButton.addEventListener('click', function(){
    //     alert("These items are more sustainable\n"+tablink+"\n"+title+"\n"+brand);

    // }, false );
}, false);