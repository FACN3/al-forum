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
      userSpan = document.createElement('span');
      userSpan.textContent = post.user_id;
      userSpan.className = "userName"
      timeSpan = document.createElement('span');
      console.log(post);

      timeSpan.textContent = post.timestamp.split('.')[0];

      div = document.createElement('div');
      div.className = 'postDiv';
      userDiv = document.createElement('div');
      userDiv.className = 'userDiv';

      title = document.createElement("h2");
      title.textContent = post.title;
      console.log(post.title);
      title.className = "postTitle";

      span = document.createElement("span");
      span.textContent = post.content;

      userDiv.appendChild(title);
      userDiv.appendChild(userSpan);
      div.appendChild(timeSpan);
      div.appendChild(userDiv);
      div.appendChild(span);
      container.appendChild(div);
      span.className = "postMessage";
      console.log('this is userid',post.user_id);
    });
  } else {
    message = document.createElement("h2");
    message.textContent = "Authentication failed Please login again!";
  }
}
