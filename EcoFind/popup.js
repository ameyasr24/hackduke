document.addEventListener('DOMContentLoaded', function(){
    var alternateItemsButton = document.getElementById('alternate');
    alternateItemsButton.addEventListener('click', function(){
        alert("These items are more sustainable");

    }, false );
    chrome.tabs.getSelected(null,function(tab) {
        //find url and title of page
        var tablink = tab.url;
        var title = tab.title;

        //print to chrome extension
        document.write(tablink+"\n");
        document.write(title);
    });
}, false);