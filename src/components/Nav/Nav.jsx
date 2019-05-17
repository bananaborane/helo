import React, { Component } from 'react'
import axios from 'axios'
import { Link, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux';
import { login, register, reduxHandleChange, updateProfilePic } from './../../ducks/reducer'


export class Nav extends Component {
  constructor(props){
    super(props);
    this.state = {
      profile_pic: ""
    }
    this.logout = this.logout.bind(this)
  }

  goToDashboard = ()=>{
    this.props.history.push('/dashboard')
  }

  goToNewPost = ()=>{
    this.props.history.push('/post')
  }

  updateProfilePic = async ()=>{
    await this.props.updateProfilePic(this.state.profile_pic)
    this.setState({
      profile_pic: ''
    })
  }

  logout(){
    this.props.history.push('/')
  }


  render() {
    return (
      <div>
        {console.log(this.props)}
        From Nav.jsx
        <input onChange={(e)=>{this.handleChange(e)}} name='profile_pic' placeholder='paste in profile pic url here'></input>
        <button onClick={()=>{this.updateProfilePic()}}>Update Profile Pic</button>

        <button onClick={()=>{this.goToDashboard()}}>Go to Dashboard</button>
        <button onClick={()=>{this.goToNewPost()}}>Go to New Post</button>
        <button onClick={()=>{this.logout()}}>Logout</button>
      </div>
    )
  }
}

function mapStateToProps = reduxState => reduxState.reducer


export default connect(mapStateToProps, { login, register, reduxHandleChange, updateProfilePic, })(Nav)
