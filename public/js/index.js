/*document.getElementById("logout").addEventListener("submit", function(event) {
  event.preventDefault();
  this.submit();
});*/
var modal = document.getElementById('myModal');
var modalC = document.getElementById('toAdd');
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

logStatus();

function logStatus() {
  fetch(
    "./check_auth",
    "get",
    function(res) {
      console.log("Respond is", res);
      if (res.username) {
        //  document.getElementById("logout").style.display = "block";
        document.getElementById("login").style.display = "none";
        document.getElementById("signup").style.display = "none";
        window.location.replace("/post.html");
        console.log("I was here!");
      } else {
        console.log("Noo!");
        fetch("./get_public_posts", "GET", populate, null);

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
    console.log(xhr.status);
     console.log(xhr.responseText);

    if (xhr.status === 200 && xhr.readyState === 4) {
      cb(JSON.parse(xhr.responseText));
      console.log(xhr.status);
       console.log(xhr.responseText);
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

      timeSpan.textContent = new Date(post.timestamp).toUTCString();
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
  var likesAndDelete = document.createElement("div");
  likesAndDelete.className="likesAndDelete";
 /*  No need to create the delete button
      if (post.user_id === username || response.admin) {
        var deleteButton = document.createElement("button");
        deleteButton.classList.add('delete');
        deleteButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
        deleteButton.addEventListener("click", function(event) {
          div.setAttribute("id", post.id);
          deletePost(post.id);
        });
        likesAndDelete.appendChild(deleteButton);

      }
*/
      var likes;
      if (post.likes) {
        var count = post.likes.length;


        var likers = post.likes.reduce(function(acc, raw) {
          acc.push(raw.user_id);
          return acc;
        }, [])

        //  console.log(post.likes);
        likes = createLike(false, count, post.likes, post.id, likers);

        //  console.log("post id is",post.id);
      } else {
        likes = createLike(false, 0, null, post.id);
      }

      likesAndDelete.appendChild(likes);
      condel.appendChild(likesAndDelete);
      div.appendChild(condel);
      container.appendChild(div);
      span.className = "postMessage";
      //  console.log("this is userid", post.user_id);
    });
  } else {
    message = document.createElement("h2");
    message.textContent = "Authentication failed Please login again!";
  }}
  function createLike(liked, counts, likes, postIdd, likers) {
    //console.log(likers);
  //  console.log("here from likes," + postIdd);
    var likeButton = document.createElement("button");
    var h4 = document.createElement("h4");
    h4.addEventListener('click', function(event) {
      listLikers(modalC, likers);
      modal.style.display = "block";

    });
  //
      likeButton.innerHTML = '<i class="fa fa-hand-o-up" aria-hidden="true"></i>';
      if (counts > 0) {
        h4.innerHTML = counts;

      }

      var likeCon = document.createElement("div");
      likeButton.addEventListener('click', function(event) {
        alert("Not logged in!!, Please log in so you can like a post!");
      });
      likeCon.className="likes";
      likeCon.appendChild(likeButton);
      likeCon.appendChild(h4);

      return likeCon;

    }

    function listLikers(modal, likers) {
      modal.innerHTML = "";
      var htmlContent = "";

      likers.forEach(function(liker) {
        htmlContent += "<br/>";
        htmlContent += liker;
      });
      modal.innerHTML = htmlContent;
    }
