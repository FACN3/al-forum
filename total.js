(function() {
  listnodes = document.getElementsByClassName("fieldData");
  count = 0;
  for (var i = 0; i < listnodes.length; i++) {
    if (listnodes[i].innerHTML.match(/[0-9]+,[0-9]+|[0-9]+/)) {
      str = listnodes[i].innerHTML.match(/[0-9]+,[0-9]+|[0-9]+/)[0]
    } else {
      continue;
    }
    if (str.indexOf(',') != -1) {

      count = count + Number(str.replace(',', ''));
    } else {
      count = count + Number(str);
    }
  }
  console.log(`total length = ${count / 1000000} million km`)
})();
