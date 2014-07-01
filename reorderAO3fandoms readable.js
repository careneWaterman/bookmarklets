/*Reorder AO3 Fandoms pages*/


/*Make sure we're on the right kind of page and we haven't already run the script*/
var fandomGroup = document.querySelectorAll('ol.fandom.index.group');
if (fandomGroup[0] != undefined && fandomGroup[0].classList.contains('zzz-numerical') == false){
  /*add a marker class to the ol and get all the entry elements*/
  fandomGroup[0].classList.add('zzz-numerical');
  var fandomList = document.querySelectorAll('.ul.tags.index.group > li');
  var numericalList = [];

  /*pull relevent portions from fandomList and fill numericalList setting the count as an integer*/
  function extractLinkcounts (inList) {
    var linkCount = fandomList[inList].innerHTML;
    var endOfLink = linkCount.indexOf('</a>') +4;
    var linkOnly = linkCount.slice(linkCount.indexOf('http'), linkCount.indexOf('"', linkCount.indexOf('http')));
    var linkText = linkCount.slice(linkCount.indexOf('>') + 1, linkCount.lastIndexOf('<'));
    var countPortion = linkCount.substr(endOfLink);
    var countOnly = countPortion.slice(countPortion.indexOf('(') + 1, countPortion.indexOf(')'));
    numericalList.push ({href: linkOnly, text: linkText, count: +countOnly});
  }

  for (var i = 0 ; i < fandomList.length; i ++) {
     extractLinkcounts (i);
  }

  /*Sort the list in descending order.  To change to ascending make it: return a.count - b.count.*/
  numericalList.sort(function(a, b) {
      return b.count - a.count;
  });  

  /*blank the navigation and listbox group on the page*/
  var alphabetElems = document.querySelectorAll('.letter.listbox.group, .alphabet.navigation')
  for (var i = 0; i < alphabetElems.length; i ++)  {
    alphabetElems[i].style.display = 'none';
  }

  /*Make a new listbox li, put in a heading and nest in an index group ul.*/
  var fandomNumerical = document.createElement ('li');
  fandomNumerical.setAttribute('class', 'letter listbox group');
  var numericalHeading = document.createElement('h3');
  numericalHeading.setAttribute('class', 'heading');
  numericalHeading.innerHTML = "Descending Order by Number of Works";
  fandomNumerical.appendChild(numericalHeading);
  var fandomIndex = document.createElement('ul');
  fandomIndex.setAttribute('class', 'tags index group');
  fandomGroup[0].appendChild(fandomNumerical);
  fandomNumerical.appendChild(fandomIndex);
  
  /*Make an li for each sorted entry and give them the odd or even class.*/
  for (var i = 0; i < numericalList.length; i ++)  {
    var fandomItem = document.createElement('li');
    if (i % 2 == 0) {
      fandomItem.setAttribute('class', 'odd');
      }
      else {
        fandomItem.setAttribute('class', 'even');
        }
    /*recreate the anchor and count text and put it inside the li (some pages have nothing for number of works, ensure it isn't created with a 0 count*/
    var fandomAnchor = document.createElement('a');
    fandomAnchor.setAttribute('href', numericalList[i].href);
    fandomAnchor.setAttribute('class', 'tag');
    fandomAnchor.innerHTML = numericalList[i].text;
    fandomItem.appendChild(fandomAnchor);
    if (numericalList[i].count > 0) {
      var fandomCount = document.createTextNode('  (' + numericalList[i].count + ')');
      fandomItem.appendChild(fandomCount);
      }
    fandomIndex.appendChild(fandomItem);
  }
}
