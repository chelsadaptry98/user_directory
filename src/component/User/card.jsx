import React from 'react'
import classes from './user.module.scss'
import { useNavigate } from 'react-router-dom'

const UserCard = ({ userData, postCount }) => {
  const navigate = useNavigate()
  return (
    <button className={classes.userCard}
      onClick={() => navigate(`/user/${userData.id}`, { state: { userData: userData } })}>
      <div>Name: {userData.name}</div>
      <div>Posts: {postCount}</div>
    </button>
  )
}

export default UserCard