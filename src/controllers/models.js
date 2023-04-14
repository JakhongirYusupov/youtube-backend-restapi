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

export default {
  POSTUSER,
  UPDATEUSER,
  DELETEUSER,
  GETUSER,
  LOGIN,
};
