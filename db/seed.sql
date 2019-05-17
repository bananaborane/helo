create table sim3_users (
    user_id serial primary key,
    username varchar(30),
    hash varchar(100),
    profile_pic text
);

create table sim3_posts (
    post_id serial primary key,
    title varchar(50),
    img text,
    content text,
    author_id int,
    foreign key (author_id) references sim3_users (user_id)
    -- one to many relationship, a USER can have MANY POSTS 
);
