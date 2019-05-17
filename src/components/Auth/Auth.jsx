import React, { Component } from 'react'
import Nav from './../Nav/Nav'
import axios from 'axios'
import { connect } from 'react-redux';
import { login, register, reduxHandleChange, updateProfilePic } from './../../ducks/reducer'

export class Auth extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = (e)=>{
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  register = ()=>{
    this.props.register(this.state.username, this.state.password)
  }
  
  login = ()=>{
    this.props.login(this.state.username, this.state.password)
  }

  render() {
    let isItTrue = this.props.location.pathname = '/'
    return (
      <div>
        From Auth.jsx
        <div>{ isItTrue ? (null) : (<Nav/>) }</div>

        <input name='username' onChange={(e)=>{this.handleChange(e)}}  placeholder='Enter username here'></input>
        <input type='password' name='password' onChange={(e)=>{this.handleChange(e)}} placeholder='Enter password here'></input>

        <button onClick={()=>{this.login()}}>Login</button>
        <button onClick={()=>{this.register()}}>Register</button>

      </div>
    )
  }
}

function mapStateToProps(reduxState){
  return {
    reducer: reduxState.reducer
  }
}

export default connect(mapStateToProps, { login, register, reduxHandleChange, updateProfilePic })(Auth)
