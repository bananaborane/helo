import React, { Component } from 'react'
import Nav from './../Nav/Nav'


export class Form extends Component {
  render() {
    let { post_id, title, img, content, author_id, match } = this.props
    return (
      <div className='each-post'>
        {title}
        {username}
        {img || null}
        {content}
      </div>
    )
  }
}

export default Form
