drop table videos;
drop table users;
create table users(
  id serial primary key  ,
  username varchar(50) unique not null,
  password varchar(1000) not null,
  profile_img varchar(500) unique not null,
  create_at timestamp default current_timestamp
);

create table videos(
  id serial,
  title varchar(500) not null,
  url text not null,
  size smallint not null,
  create_at timestamp default current_timestamp,
  user_id int references users(id) on delete cascade
);