fethc("get_posts", "GET", populate, null);

function fetch(url, method, cb, parameters) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.status === 200 && xhr.readyState === 4) {
      cb(JSON.parse(xhr.responseText));
    }
  };

  xhr.open(method, url, true);
  xhr.send(parameters);
}

function populate(response) {
  var container = document.getElementById("container");
  container.innerHTML="";
  if (response.rows) {

     response.rows.forEach(post){
       title =document.createElement("h2");
       title.textContent = post.title;

       span =document.createElement("span");
       span.textContent = post.content;
        container.appendChild(title);
        container.appendChild(span);
     }else{
       message =document.createElement("h2");
       message.textContent = "Authentication failed Please login again!";

     }
  }
}
