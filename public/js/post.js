fetch("get_posts", "GET", populate, null);
var form = document.getElementById("postForm");
var username = "";
var modal = document.getElementById('myModal');
var modalC = document.getElementById('toAdd');

/*form.addEventListener("submit", function(event) {
  event.preventDefault();
  add_post(username);
});*/
function fetch(url, method, cb, parameters) {
  console.log("Erer");
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

      if (post.user_id === username || response.admin) {
        var deleteButton = document.createElement("button");
        deleteButton.classList.add('delete');
        deleteButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
        deleteButton.addEventListener("click", function(event) {
          div.setAttribute("id", post.id);
          deletePost(post.id);
        });
        condel.appendChild(deleteButton);

      }

      var likes;
      if (post.likes) {
        var count = post.likes.length;

        var liked = post.likes.reduce(function(acc, like) {
          acc.push(like.user_id);
          return acc;
        }, []).includes(username);
        var likers = post.likes.reduce(function(acc, raw) {
          acc.push(raw.user_id);
          return acc;
        }, [])

        //  console.log(post.likes);
        likes = createLike(liked, count, post.likes, post.id, likers);

        //  console.log("post id is",post.id);
      } else {
        likes = createLike(false, 0, null, post.id);
      }

      condel.appendChild(likes);
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
    if (liked) {
      likeButton.innerHTML = '<i class="fa fa-thumbs-up" aria-hidden="true"></i>';
      //  fetch("unlike?id="+post, "GET", populate, null);

      h4.innerHTML = counts;

    } else {
      likeButton.innerHTML = '<i class="fa fa-hand-o-up" aria-hidden="true"></i>';
      if (counts > 0) {
        h4.innerHTML = counts;

      }}

      var likeCon = document.createElement("div");
      likeButton.addEventListener('click', function(event) {

        document.getElementById("loader").style.display = "block";

        if (liked) {

          var id = likes.reduce(function(acc, like) {
            if (like.user_id === username) {
              acc = like.id;
            }
            return acc;
          }, 0);
          deleteLike(id, function(result) {

            if (result) {
              liked = !liked;
              likeButton.innerHTML = '<i class="fa fa-hand-o-up" aria-hidden="true"></i>';
              document.getElementById("loader").style.display = "none";
              if (counts == 1) {
                h4.innerHTML = "";
                likers = [];
                //listLikers(modal, likers);

              } else {
                h4.innerHTML = counts - 1;
              }
              likers.splice(likers.indexOf(username), 1);
              //listLikers(modal, likers);
              counts -= 1;

            }
          });

        } else {

          addLike(postIdd, function(result) {
            if (result.done) {
              liked = !liked;
              likeButton.innerHTML = '<i class="fa fa-thumbs-up" aria-hidden="true"></i>';
              document.getElementById("loader").style.display = "none";
              counts += 1;
              h4.innerHTML = counts;
            //  modal.innerHTML = modal.innerHTML + "<br>" + username;
              likers.push(username)
            }

          });
        }

      });
      likeCon.appendChild(likeButton);
      likeCon.appendChild(h4);

      return likeCon;

    }

    function deleteLike(likeId, cb) {
      fetch("/delete_like?likeid=" + likeId, "GET", cb);
    }

    function addLike(likeId, cb) {

      fetch("/like_post?likeid=" + likeId, "GET", cb);
    }

    function deletePost(postId) {
      fetch("/delete_post?postid=" + postId, "GET", function(response) {
        if (response.deleted) {
          window.location.reload();
        } else {
          alert("Something happend Unfortunately You can't delete");
        }
      }, null);

      //    document.getElementById(postId).innerHTML = "";
      //  console.log(postId);
    }


  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
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
