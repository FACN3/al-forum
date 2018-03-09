const getLikes = require("./getLikes");

const getLikesHelper=(posts, cb)=>   {
  let counts = posts.rows.length;

  for (let i = 0; i < posts.rows.length; i++) {
    if (posts.rows[i].likes != 0) {

      getLikes(posts.rows[i].id, (err, likes) => {
        if (!err) {
          posts.rows[i].likes = likes;
        }
        counts -= 1;

      if (counts == 0) {
        cb(posts);
      }
      });

    } else {
      counts -= 1;

    if (counts == 0) {
      cb(posts);
    }
  }}
}

module.exports = getLikesHelper;
