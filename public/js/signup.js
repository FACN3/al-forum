document
  .getElementById("signUpForm")
  .addEventListener("submit", function(event) {
    event.preventDefault();
    document.getElementById("errorMessage").innerHTML = "";
    var username = document.getElementById("username").value;
    if (username) {
      checkUser(username);
    } else {
      errorMessage("Please fill the username!");
      document.getElementById("username").style.backgroundColor = "red";
      document.getElementById("password").style.backgroundColor = "";
      document.getElementById("cfpassword").style.backgroundColor = "";
      document.getElementById("fullname").style.backgroundColor = "";
    }
  });

function checkUser(username) {
  fetch(
    "/check_user?username=" + username,
    "GET",
    function(response) {
      var result = JSON.parse(response);

      if (!result.state) {
        console.log("result.state is false!!");
        errorMessage("UserName already Exists!");
        document.getElementById("username").style.backgroundColor = "red";
        document.getElementById("password").style.backgroundColor = "";
        document.getElementById("cfpassword").style.backgroundColor = "";
        document.getElementById("fullname").style.backgroundColor = "";
      } else {
        checkName(username);
      }
    },
    null
  );
}

function errorMessage(err_message) {
  var message = document.createElement("p");
  message.innerHTML = err_message;
  document.getElementById("errorMessage").appendChild(message);
}

function checkName(username) {
  name = document.getElementById("fullname").value;
  if (name) {
    checkPassword(username, name);
  } else {
    errorMessage("Please fill name");
    document.getElementById("username").style.backgroundColor = "";
    document.getElementById("password").style.backgroundColor = "";
    document.getElementById("cfpassword").style.backgroundColor = "";
    document.getElementById("fullname").style.backgroundColor = "red";
  }
}

function checkPassword(username, name) {
  password = document.getElementById("password").value;
  cfpassword = document.getElementById("cfpassword").value;

  if (password === cfpassword && password && cfpassword) {
    signupUser(username, name, password);
  } else {
    errorMessage(
      "The passwords doesn't match or you do not filled the password and/or confirm password field."
    );
    document.getElementById("username").style.backgroundColor = "";
    document.getElementById("fullname").style.backgroundColor = "";
    document.getElementById("password").style.backgroundColor = "red";
    document.getElementById("cfpassword").style.backgroundColor = "red";
  }
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

function signupUser(username, name, password) {
  /*
   fetch("/add_user","POST",function(result){

   },"username="+username+"&name="+name+"&password="+password);
  */
  document.getElementById("signUpForm").submit();
}
