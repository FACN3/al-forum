var form = document.getElementById("login");
form.addEventListener("submit", function(event) {
  event.preventDefault();
  document.getElementById("errorMessage").innerHTML = "";
  username = document.getElementById("username").value;
  if (username) {
    checkUser(username);
  } else {
    errorMessage("Please fill out the username!");
  }
});

function checkUser(username) {
  fetch(
    "/check_user?username=" + username,
    "GET",
    function(response) {
      var result = JSON.parse(response);

      if (!result.state) {
        checkPassword(username);
      } else {
        //  checkName(username);

        console.log("result.state is false!!");
        errorMessage("UserName does not Exists!");
      }
    },
    null
  );
}

function fetch(url, method, cb, parameters) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.status === 200 && xhr.readyState === 4) {
      cb(xhr.responseText);
      console.log(xhr.status);
      console.log(xhr.responseText);
    }
  };

  xhr.open(method, url, true);
  xhr.send(parameters);
}

function checkPassword(username) {
  var password = document.getElementById("password");
  if (password) {
    form.submit();
  } else {
    errorMessage("Please fill out the password");
  }
}

function errorMessage(err_message) {
  var message = document.createElement("p");
  message.innerHTML = err_message;
  document.getElementById("errorMessage").appendChild(message);
}
