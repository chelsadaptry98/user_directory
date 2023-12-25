import React from 'react'
import classes from './userProfile.module.scss'

const Post = ({post}) => {
  return (
    <div className={classes.post}>
        <h3>{post.title}</h3>
        <p>
            {post.body}
        </p>
    </div>
  )
}

export default Post