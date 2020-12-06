
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
    const url = "https://www.googleapis.com/customsearch/v1?key={APIKey}&cx=c391cddd12bed7ac3&q=" + searchWords + "&callback=hndlr";
    Http.open('GET',url);
    Http.send();
    Http.onreadystatechange=(e)=>{
        hndlr(Http.responseText);
    }

}

document.addEventListener('DOMContentLoaded', function(){
    var title, tablink;
    chrome.tabs.getSelected(null,function(tab) {
        //find url and title of page
        tablink = tab.url;
        title = tab.title;
        document.getElementById("productName").innerHTML += title;

        //search for related products
        search(title);
    });
}, false);