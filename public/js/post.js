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
      var condel = document.createElement("div");
      condel.className = "condel";
      userSpan = document.createElement("span");
      userSpan.textContent = post.user_id;
      userSpan.className = "userName";
      timeSpan = document.createElement("span");

      timeSpan.textContent = post.timestamp.split(".")[0];
      timeSpan.className = "dateTime";

      div = document.createElement("div");
      div.className = "postDiv";
      userDiv = document.createElement("div");
      userDiv.className = "userDiv";

      title = document.createElement("h2");
      title.textContent = post.title;
      title.className = "postTitle";

      span = document.createElement("span");
      span.textContent = post.content;

      userDiv.appendChild(title);
      userDiv.appendChild(userSpan);
      div.appendChild(timeSpan);
      div.appendChild(userDiv);
      condel.appendChild(span);
      if (post.user_id === username) {
        console.log("here");
        var deleteButton = document.createElement("button");
        deleteButton.innerHTML = "X";
        deleteButton.addEventListener("click", function(event) {
          div.setAttribute("id", post.id);

          deletePost(post.id);
        });
        condel.appendChild(deleteButton);
      }

      div.appendChild(condel);
      container.appendChild(div);
      span.className = "postMessage";
      console.log("this is userid", post.user_id);
    });
  } else {
    message = document.createElement("h2");
    message.textContent = "Authentication failed Please login again!";
  }

  function deletePost(postId) {
    fetch(
      "/delete_post?postid=" + postId,
      "GET",
      function(response) {
        if (response.deleted) {
          window.location.reload();
        } else {
          alert("Something happend Unfortunately You can't delete");
        }
      },
      null
    );

    //    document.getElementById(postId).innerHTML = "";
    console.log(postId);
  }
}
