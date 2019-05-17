import React, { Component } from 'react'
import Nav from './../Nav/Nav'
import Axios from 'axios';
import Post from './../Post/Post'

export class Dashboard extends Component {
  state = {
    userPosts: true,
    search: "",
    listOfPosts : []
  }

  handleChange = (e)=>{
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(this.state)
  }

  componentDidMount(){
    Axios.get(`/displayposts?userposts=${false}&search=${this.state.search}`)
      .then((res)=>{
        this.setState({
          listOfPosts: res.data
        })
      })
      .catch(err=>console.log(`Something happened while retrieving posts in component mounting: ${err}`));
  }

  resetDisplayPosts = ()=>{
    
  }

  displayPostsWithSearch = ()=>{
    Axios.get(`/displayposts`)
      .then()
      .catch(err=>console.log(`there is an ${err}`))
  }

  toggleMyPostCheckbox = ()=>{
    this.setState((prevState)=>({ userPosts: !prevState.userPosts}))
    console.log(this.state)
  }
  
  render() {
    return (
      <div>
        <Nav/>
        From Dashboard.jsx  
        <input name='search' onChange={(e)=>{this.handleChange(e)}} type='text'></input>
        <button>Search</button>
        <button>Reset</button>

        My posts
        <input onChange={()=>{this.toggleMyPostCheckbox()}} type='checkbox'></input>


        <div>
          {this.state.listOfPosts[0] ? ( <div>{this.state.listOfPosts.map((val, i)=>{ return (
          <Link to={`/post/${val.post_id}`} key={val.title}>
            <Post post_id={val.post_id} title={val.title} img={val.img} content={val.content} author_id={val.author_id}  />
          </Link>) })}</div> ) : ( <div>No Posts to display!</div> )}
        </div>

      </div>
    )
  }
}

export default Dashboard
