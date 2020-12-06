
var results = [];
var count = 0;
function hndlr(response) {
    if (response && count<1) {
        count++;
        var index = response.indexOf("items");
        var remove = response.substring(0,index);
        var result = response.replaceAll(remove,"");
        index = 0;
        for (var i=0;i<3;i++) {
            var info = [];

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

        //add to HTML in proper formatting
        for (var i=1;i<=3;i++) {
            //var id = "col"+i;
            var imgID = "img"+i;
            var infoID = "info"+i;
            for (var j=0;j<results[i-1].length;j++) {
                switch (results[i-1][j].charAt(0)) {
                    //title
                    case 't':
                        var newHeading = document.createElement("h4");
                        newHeading.innerHTML = (results[i-1][j].substring(7).replaceAll('\\"','\"'));
                        //document.getElementById(id).appendChild(newHeading);
                        document.getElementById(infoID).appendChild(newHeading);
                        break;

                    //image
                    case 'i':
                        var img = document.createElement("img");
                        img.src = results[i-1][j].substring(7);
                        // document.getElementById(id).appendChild(img);
                        document.getElementById(imgID).appendChild(img);
                        break;

                    //link
                    case 'l':
                        var a = document.createElement('a');
                        a.setAttribute('href',results[i-1][j].substring(6));
                        a.setAttribute('target',"_blank");
                        a.innerHTML = "Link here!";
                        // document.getElementById(id).appendChild(a);
                        document.getElementById(infoID).appendChild(a);
                        break;
                }
            }
        }
    }
}

function search(searchWords) {
    const Http = new XMLHttpRequest();
    //change {APIkey} to own key
    const url = "https://www.googleapis.com/customsearch/v1?key=AIzaSyBjjgVkPLgeuUAsc7Dd7ZMoU2_LjTAdwL8&cx=c391cddd12bed7ac3&q=" + searchWords + "&callback=hndlr";
    Http.open('GET',url);
    Http.send();
    Http.onreadystatechange=(e)=>{
        hndlr(Http.responseText);
    }

}

// function getRating(brandLink){
//     $.get(brandLink, null, function(text){
//         alert($(text).find('.StyledText-sc-1sadyjn-0 bBUTWf'));
//     });
//     var request = new XMLHttpRequest();

//     request.addEventListener("load", function(evt){
//         console.log(evt);
//     }, false);

//     request.open('GET', brandLink, true),
//     request.send();
// }

function rating(url){
    var data;
    console.log('hi');
    $.ajax({
      type: "GET",  
      url: "http://localhost:8080/EcoFind/companynamestest.csv",
      dataType: "text",       
      success: function(response)  {
        data = $.csv.toArrays(response);
        console.log(data);
        var linkPos = url.indexOf(".com");
        var link = url.substring(0, linkPos);
        console.log(url);
        var rating, company;
        // chrome.tabs.getSelected(null,function(tab) {
        //             //find url and title of page
        //             company = tab.title;
        // });
        //var company = "Abercrombie & Fitch | Authentic American clothing since 1892";
        for (var i=0; i<data.length; i++){
            var x = data[i];
            var compLink = x[0];
            if (link === compLink) {
                company = x[1];
                rating = x[2];
            }
        }
        // document.getElementById("link").innerHTML += "hello";
        // console.log(company);
        // company = company.toLowerCase();
        // company = company.replaceAll(" ", "-");
        // var ratingLink = "directory.goodonyou.eco/brand/" + company;
        console.log(rating);
        if (rating === "1"){
            rating = "We Avoid";
        }
        else if (rating === "2"){
            rating = "Not Good Enough";
        }
        else if (rating === "3"){
            rating = "It's a start";
        }
        else {
            rating = "Good";
        }
        document.getElementById("ratingFont").innerHTML= company + "'s " + document.getElementById("ratingFont").innerHTML + rating;
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
        // document.getElementById("productName").innerHTML += tablink;
        //search for related products
        search(title);
        rating(tablink);
        // getRating("https://directory.goodonyou.eco/brand/abercrombie-and-fitch");
        //document.getElementById("content").innerHTML += "<br/>" + tablink+"<br/>";
        //brand = brand.hostName;

        //alert(title);
    });
    // var alternateItemsButton = document.getElementById('alternate');
    // alternateItemsButton.addEventListener('click', function(){
    //     alert("These items are more sustainable\n"+tablink+"\n"+title+"\n"+brand);

    // }, false );
}, false);