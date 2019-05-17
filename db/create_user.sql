insert into sim3_users (
    hash,
    username
) values (
    $1,
    $2
)
returning user_id, username;