chrome.tabs.executeScript({
  code: "window.getSelection().toString();"
}, function (selection) {
  var query = encodeURIComponent(selection[0] || '汉典')
  document.querySelector('textarea').value = selection[0];

  if (selection[0] == "") {
    document.getElementById("result").innerHTML = "";
  } else {
    console.log("text : " + selection[0])
    loadDoc(selection[0]);
  }
});

function loadDoc(txt) {

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var myObject = JSON.parse(this.responseText);
      myFunction(myObject);
      // document.getElementById('result').innerHTML = myObject;
    }
  };
  url = "http://52.200.38.94/search?inputText=" + txt;
  console.log(url)
  xhttp.open("GET", url, true);
  xhttp.send();

}

function search() {
  text = document.getElementById("text").value
  if(text != ""){
    loadDoc(text)
  }
}

function myFunction(arr) {
  var out = "";
  var i;
  for (i = 0; i < arr.length; i++) {
    title = arr[i].article_title;
    url = arr[i].url;
    sec_title = arr[i].section_title;
    score = arr[i].similarity_score;
    out += '<div id="element"> <dl>' +
      '<dt>' + '<a href="' + url + '" target="_blank">' + title + '</a><br>' + '</dt>' +
      '<dd>' +
      '<div id="sec_tit">' + "Section Title\t:" + sec_title + 
      '</div>'+
      // '</br>' + "Score\t:" + score + 
      '</br>' +
      '</dd > ' + '</dl></div></br>';
  }
  document.getElementById("result").innerHTML = out;
}