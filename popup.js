docdocument.addEventListener('DOMContentLoaded', function () {
    var alternateItemsButton = document.getElementById('alternate');
    alternateItemsButton.addEventListener('click', function () {
        alert("These items are more sustainable");

    }, false);
}, false);
/*
function getHighlightedITem() {
    var item = "";

    if (typeof window.getSelection != "undefined") {
        item = window.getSelection().toString();
    } else if (typeof window.selection != "undefined" && window.selection.type == "Text") {
        item = window.selection.createRange().text;
    }
    return item;
}

function searchWithHighlightedItem() {
    var highlightedItem = getHighlightedITem();
    if (highlightedItem) {
        //body to be replaced w Search Engine code
        alert("Item highlighted: " + highlightedItem);
    }
}


document.onmouseup = searchWithHighlightedItem;
document.onkeyup = searchWithHighlightedItem;
*/
