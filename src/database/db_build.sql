BEGIN;


CREATE TABLE IF NOT EXISTS USERS( id serial PRIMARY KEY,
                                                    username varchar(20) NOT NULL,
                                                                         password text NOT NULL,
                                                                                       name varchar(30) NOT NULL,
                                                                                                        ADMIN boolean DEFAULT FALSE);


CREATE TABLE IF NOT EXISTS POSTS( id SERIAL PRIMARY KEY,
                                                    title VARCHAR(50) NOT NULL,
                                                                      content TEXT NOT NULL,
                                                                                   user_id INTEGER NOT NULL,
                                                                                                   likes INTEGER DEFAULT 0);


CREATE TABLE LIKES( id serial PRIMARY KEY,
                                      user_id text NOT NULL,
                                                   post_id integer NOT NULL,
                                                                   TYPE integer DEFAULT 0,
                                                                                        TIMESTAMP TIMESTAMP WITHOUT TIME ZONE DEFAULT now());


INSERT INTO USERS(username, password, name)
VALUES ('Cheetah123',
        '123456',
        'Ghassan abcde'), ('jwlima',
                           'hello',
                           'Sophia Lim');


INSERT INTO POSTS(title, content, user_id)
VALUES ('Hello everyone',
        'hi we are testing this project blah blah blah',
        1), ('Who is cooking tonight?',
             'I am up for something spicy!!',
             2);


CREATE OR REPLACE FUNCTION update_like_counts() RETURNS TRIGGER AS $$
begin
if(TG_OP='DELETE') then
update posts set likes = (select count(*) from likes where post_id=OLD.post_id)where id=OLD.post_id;
elsif (TG_OP='INSERT') then
update posts set likes = (select count(*) from likes where post_id=NEW.post_id)where id=NEW.post_id;
 end if;
 return NULL;
end;
$$ LANGUAGE PLPGSQL;


CREATE TRIGGER likes_edit AFTER
INSERT
OR
DELETE ON LIKES
FOR EACH ROW EXECUTE PROCEDURE update_like_counts();


COMMIT;
