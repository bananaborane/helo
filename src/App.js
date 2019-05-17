import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { HashRouter, Link, Switch, Route } from "react-router-dom";
import routes from "./routes";
import Dashboard from "./components/Dashboard/Dashboard";
import Nav from "./components/Nav/Nav";

class App extends Component {
  constructor() {
    super();
    this.state = {
      toggle: false
    };
    this.toggleFunction = this.toggleFunction.bind(this); // bind competency
  }

  toggleFunction() {
    this.setState({ toggle: !this.state.toggle });
  }

  render() {
    return (
      <HashRouter>
        <Nav />
        {routes}
        From App.js
      </HashRouter>
    );
  }
}

export default App;
