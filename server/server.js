require('dotenv').config();
const { SESSION_SECRET, CONNECTION_STRING } = process.env;
const massive = require('massive');
const express = require('express');
const app = express();
const PORT = 4000;
const controller = require('./controller')

// server top level middleware competency
app.use(express.json()) // at the top of our file as it will parse out any incoming json object

massive(CONNECTION_STRING).then(db =>{
    app.set('db', db);
    app.listen(PORT, ()=>console.log(`server is running on port: ${PORT}`))
    console.log(`db connected, you may now try for requests`)
})


app.post(`/register`, controller.register)
app.post(`/login`, controller.login)
app.get(`/displayposts`, controller.displayPosts)


app.get(`/api/middleware`, requestLevelMiddleware function(req, res){
    console.log('world')
})


// server request level middleware competency
function requestLevelMiddleware(req, res, next){
    // could have code to prove admin access, etc but for simplicities' sake:
    console.log('hello')
    next();
}


// req.query competency
app.get(`/searchpost?search=post`, (req, res)=>{
    // req.query looks like: { search: post }
    // can be destructured like so:
    const { search } = req.query;
})











