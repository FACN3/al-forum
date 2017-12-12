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
    }
  });

function checkUser(username) {
  fetch('/check_user?username='+username,"GET",function(result){
    if (!result.state) {
      console.log("result.state is false!!");
      errorMessage("UserName already Exists!");
    } else {
      checkName(username);
    }
  },null);

}

function errorMessage(err_message) {
  var message = document.createElement("p");
  message.innerHTML = err_message;
  document.getElementById("errorMessage").appendChild(message);
}

function checkName(username){
  name = document.getElementById("fullname").value;

  if(name){
    checkPassword(username,name);
  }else{
    errorMessage("Please fill name");
  }}

  function checkPassword(username,name){

    password = document.getElementById("password").value;
    cfpassword = document.getElementById("cfpassword").value;


    if(password === cfpassword && password && cfpassword){
      signupUser(username,name,password);
    }else{
      errorMessage("The passwords doesn't match or you do not filled the password and/or confirm password field.")
    }

  }

function fetch(url,method,cb,parameters){

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.status === 200 && xhr.readyState === 4) {
      var result = JSON.parse(xhr.responseText);
         cb(result);
    }
  };

  xhr.open(method, url, true);
  xhr.send(parameters);
}

function signupUser(username,name,password){

 fetch("/add_user","POST",function(result){

 },"username="+username+"&name="+name+"&password="+password);

}
