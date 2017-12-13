fetch("get_posts", "GET", populate, null);
var form = document.getElementById("postForm");
var username = "";
/*form.addEventListener("submit", function(event) {
  event.preventDefault();
  add_post(username);
});*/
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
  container.innerHTML = "";
  if (response.rows) {
    username = response.username;
    response.rows.forEach(function(post) {
      title = document.createElement("h2");
      title.textContent = post.title;

      span = document.createElement("span");
      span.textContent = post.content;
      container.appendChild(title);
      container.appendChild(span);
    });
  } else {
    message = document.createElement("h2");
    message.textContent = "Authentication failed Please login again!";
  }
}
