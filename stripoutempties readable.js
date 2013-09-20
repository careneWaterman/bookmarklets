/*AO3 puts an unbreaking space inside p tags in some circumstances.  Often this is intentional whitespace, but sometimes it shows up as a blank paragraph between every paragraph in a work.  This code strips out the empties.*/

var work = document.getElementById('chapters');
var paragraphs=work.getElementsByTagName('p');
for(var i=0;i<paragraphs.length;i++){
  if(paragraphs[i].innerHTML == '&nbsp;'){
    paragraphs[i].style.display='none'
    }
  }
