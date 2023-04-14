// USER
const POSTUSER = `insert into users(username, password, profile_img) values($1, $2, $3)`;
const UPDATEUSER = `update users u set
username = (
  case when length($1) > 0 then $1 else u.username end
),
password = (
  case when length($2) > 0 then $2 else u.password end
) where u.id = $3 returning *`;

const DELETEUSER = `delete from users where id = $1`;
const GETUSER = `select id, username from users where id = $1`;
const LOGIN = `select id, username, profile_img, create_at from users where username = $1 and password = $2`;

// VIDEO
const POSTVIDEO = `insert into videos(title, url, size, user_id) values($1, $2, $3, $4) returning *`;
const GET_OWN_VIDEO = `select * from videos where title = $1 and user_id = $2`;
const DELETE_VIDEO = `delete from videos where id = $1 returning *`;
const UPDATE_VIDEO = `update videos set title = $1 where id = $2 and user_id = $3 returning *`;

export default {
  POSTUSER,
  UPDATEUSER,
  DELETEUSER,
  GETUSER,
  LOGIN,
  POSTVIDEO,
  GET_OWN_VIDEO,
  DELETE_VIDEO,
  UPDATE_VIDEO,
};
