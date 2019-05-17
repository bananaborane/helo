const bcrypt = require('bcryptjs')

module.exports = {
  register: async (req, res) => {
    const { password, username } = req.body;
    const db = req.app.get("db");
    const accountArr = await db
      .find_user_by_username([username])
      .catch(err =>
        console.log(`Something happened while finding user by username: ${err}`)
      );
    if (accountArr[0]) {
      return res.status(406).send({ message: "Username already in use." }); // Send HTTP Code Competency
    } // 406: NOT ACCEPTABLE HTTP CODE

    const salt = bcrypt.genSaltSync(10);
    const pepper = bcrypt.hashSync(password, salt);
    let newAccArr = await db
      .create_user([pepper, username])
      .catch(err =>
        console.log(`Something happened while creating user: ${err}`)
      );

    req.session.user = {
      id: newAccArr[0].user_id,
      username: newAccArr[0].username
    };
    // places them in a session after registering by adding them to the req.session object
    // initializes new cart after registering

    return res.status(200).send({
      message: "Register successful, welcome",
      userData: req.session.user,
      loggedIn: true
    });
  },
  login: async (req, res) => {
    const { username, password } = req.body;
    const db = req.app.get("db");
    const accountArr = await db.find_user_by_username([username])
      .catch(err=>console.log(`Something happened while finding user by username: ${err}`))
    if (!accountArr[0]){
        return res.status(400).send({ message:'Username not found, have you tried registering?' }); // Send HTTP Code Competency

    }
    const result = bcrypt.compareSync(password, accountArr[0].hash); // checks if passwords match up, evaluates to true or false
    if(!result){ // if result is false and IS THEN FLIPPED TO TRUE, then code below runs
        return res.status(401).send({ message: 'incorrect email & password combo, who dis?' })
    }

    // server - auth competency
    // user info is stored on req.session in a user object
    req.session.user = {  
      id: accountArr[0].user_id, 
      username: accountArr[0].username,
      };
 

    return res.status(200).send({ 
      message: 'Login successful',
      userData: req.session.user ,
      loggedIn: true 
    })
  },
  displayPosts: async (req, res)=>{
    const { id } = req.session.user;
    const db = req.app.get('db');

    if(req.query.userposts && req.query.search){
      let searchedUsersPosts = await db.display_search_users_posts([id, req.query.search])
        .catch(err=>console.log(`An error with searching through users posts: ${err}`))
        return res.status(200).send({
          message: 'A list of searched post with only users posts has been sent',
          userData: req.session.user,
          loggedIn: true,
          payload: searchedUsersPosts
        })
    }

    if(req.query.search){
      let searchedPosts = await db.display_search_posts(req.query.search)
        .catch(err=>console.log(`An error with searching through all the posts: ${err}`))
        return res.status(200).send({
          message: "A list of searched posts from all posts has been sent",
          userData: req.session.user,
          loggedIn: true,
          payload: searchedPosts
        })
    }

    if(req.query.userposts){
      let usersPosts = await db.display_users_posts(id)
        .catch(err=>console.log(`Something happened while retrieving all users posts: ${err}`))
        return res.status(200).send({
          message: 'A list of only users posts has been sent',
          userData: req.session.user,
          loggedIn: true,
          payload: usersPosts
        })
    }

    let allPosts = await db.display_all_posts()
      .catch(err=>console.log(`Something happened while retrieving all of the posts: ${err}`))
      return res.status(200).send({
        message: `A list of all of the posts has been sent`,
        userData: req.session.user,
        loggedIn: true,
        payload: allPosts
      })

  }
};
