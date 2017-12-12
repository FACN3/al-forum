BEGIN;

CREATE TABLE IF NOT EXISTS USERS(
  id serial PRIMARY KEY,
  username varchar(20) NOT NULL,
  password varchar(30) NOT NULL,
  name varchar(30) NOT NULL,
  admin boolean default false
);

CREATE TABLE IF NOT EXISTS POSTS(
  id SERIAL PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  content TEXT NOT NULL,
  user_id INTEGER NOT NULL,
  likes INTEGER default 0
);

INSERT INTO USERS(username, password, name) VALUES
('Cheetah123', '123456', 'Ghassan abcde'),
('jwlima', 'hello', 'Sophia Lim');

INSERT INTO POSTS(title, content, user_id) VALUES
('Hello everyone', 'hi we are testing this project blah blah blah', 1),
('Who is cooking tonight?', 'I am up for something spicy!!', 2);


COMMIT;
