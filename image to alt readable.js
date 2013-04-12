/*Image to Alt is a bookmarklet that replaces all img tags on a page with a transparent gif.
 * It then adds the image alt text to the page, and puts a border around the original image location, allowing a user to know where to mouseover for title text or other hover effects.
 * The replacement is rerun if a user clicks on the page, allowing for dynamically added content from show/hide features.
 * If an image is inside a link, but contains blank alt text, the work Link is inserted as alt text.
 * This version works on Firefox, Chrome (and likely other webkit browsers) and Opera.  It might work in IE9+. */
 
var forEach = Array.prototype.forEach;
var images = document.getElementsByTagName("img");
function removeImages()  {
  var altSpans = document.querySelectorAll(".alt-text-bookmarklet");
  forEach.call(altSpans, function(span) {
    span.parentNode.removeChild(span);
    });
  forEach.call(images, removal); 
  function removal(img){
    img.setAttribute("src", "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7");
    img.style.border = "solid thin";
    var imageAlt = img.getAttribute("alt");
    if ((imageAlt === "" || imageAlt === " ") && img.parentNode.nodeName.toLowerCase() === 'a') {
        imageAlt = "Link";
        } 
    var  altText = document.createElement("span");
    altText.className = "alt-text-bookmarklet";
    altText.style.fontVariant = "small-caps";
    altText.style.padding = "0 0.25em";
    altText.innerHTML = imageAlt; 
    img.parentNode.insertBefore(altText,img.nextSibling);  
  }
}
function delayedRemoval () {
  window.setTimeout(removeImages, 5000);
  }
document.addEventListener("mousedown", delayedRemoval, false);
removeImages();




