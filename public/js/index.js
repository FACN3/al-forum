document.getElementById("logout").addEventListener("submit", function(event) {
  event.preventDefault();
  this.submit();
});
logStatus();

function logStatus() {
  fetch(
    "./check_auth",
    "get",
    function(res) {
      console.log("Respond is", res);
      if (res.username) {
        document.getElementById("logout").style.display = "block";
        document.getElementById("login").style.display = "none";
        document.getElementById("signup").style.display = "none";
      } else {
        document.getElementById("logout").style.display = "none";
        document.getElementById("login").style.display = "block";
        document.getElementById("signup").style.display = "block";
      }
    },
    null
  );
}

function fetch(url, method, cb, parameters) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.status === 200 && xhr.readyState === 4) {
      cb(JSON.parse(xhr.responseText));
      //console.log(xhr.status);
      // console.log(xhr.responseText);
    }
  };

  xhr.open(method, url, true);
  xhr.send(parameters);
}
