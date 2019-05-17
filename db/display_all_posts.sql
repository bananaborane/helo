select sim3_posts.post_id, sim3_posts.title, sim3_posts.img, sim3_posts.content, sim3_users.user_id, sim3_users.username, sim3_users.profile_pic from sim3_users
join sim3_posts on sim3_posts.author_id = sim3_users.user_id -- joins tables posts and users together
