import React from "react";
import { Switch, Link, HashRouter, Route } from "react-router-dom";
import App from './App'
import Dashboard from './components/Dashboard/Dashboard'
import Form from './components/Form/Form'
import Auth from './components/Auth/Auth'
import Post from './components/Post/Post'
import Nav from './components/Nav/Nav'





export default (
    <Switch>
        <Route path="/post/:postid" component={Post} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/new" component={Form} />
        <Route exact path="/" component={Auth} />
    </Switch>
)

