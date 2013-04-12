/*This is the code for the Prewrap bookmarklet.
 * It applies the white-space: pre-wrap style to all pre tags in a page.*/

var preText = document.getElementsByTagName("pre");
for (var i = 0; i < preText.length; i += 1)  {
  preText.item(i).style.whiteSpace = "pre-wrap";
}


