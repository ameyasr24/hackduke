document.addEventListener('DOMContentLoaded', function(){
    var title, tablink;
    chrome.tabs.getSelected(null,function(tab) {
        //find url and title of page
        tablink = tab.url;
        title = tab.title;

        //print to chrome extension
        // document.write(tablink+"\n");
        // document.write(title);
    });
    var alternateItemsButton = document.getElementById('alternate');
    alternateItemsButton.addEventListener('click', function(){
        alert("These items are more sustainable\n"+tablink+"\n"+title);

    }, false );
    
}, false);