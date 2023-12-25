import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import classes from './userProfile.module.scss'
import Clock from './clock'
import Post from './post'
import moment from 'moment-timezone'

const UserProfile = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { id, name, address, company, email, phone } = state.userData
  const [countries, setCountries] = useState()
  const [time, setTime] = useState(moment(new Date()).format())
  const [paused, setPaused] = useState(false)
  const [allPost, setAllPost] = useState()
  const [ selectedCountry , setSelectedCountry] = useState('Asia/Kolkata')

  const getCountries = async () => {
    const response = await fetch('http://worldtimeapi.org/api/timezone')
    response.json().then(result => setCountries(result))
  }
  const getTime = async (country) => {

    const response = await fetch(`http://worldtimeapi.org/api/timezone/${country}`)
    response.json().then(result => {
      setPaused(false)
      setSelectedCountry(country)
      const t1 = moment(result.datetime)
      setTime(t1.tz(country))
    })
  }


  const getPosts = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    const allPosts = await response.json()
    setAllPost(allPosts.filter(post => post.userId === id))
  }

  useEffect(() => {
    getCountries()
    getPosts()
  }, [])

  return (
    <div className={classes.userProfile}>
      <div className={classes.userHeader}>
        <div>
          <button onClick={() => navigate('/')} style={{ backgroundColor: 'lightskyblue' }}>Go Back</button>
        </div>
        <div>
          <label>Choose a Country:</label>
          <select disabled={countries ? false : true} name="Countries" onChange={(e) => getTime(e.target.value)}>
            {
              countries && countries.map((country) => {
                return <option value={country} key={country}>{country}</option>
              })
            }
          </select>
        </div>
        <div className={classes.clockContainer}>
          <Clock paused={paused} time={time}  setTime={setTime} country={selectedCountry}/>
          <button onClick={() => setPaused(!paused)} className={classes.clockButton}>Start/Pause</button>
        </div>
      </div>
      <div className={classes.userDetails}>
        <div>
          <div className={classes.textMargin}>{name}</div>
          <div>{company.name} | {company.catchPhrase}</div>
        </div>

        <div>
          <div className={classes.textMargin}>{address.suite}, {address.street}, {address.city}-{address.zipcode}</div>
          <div>{email} | {phone}</div>
        </div>
      </div>
      {allPost && (
        <div className={classes.postContainer}>
          {allPost.map((post) => {
            return <Post post={post} key={post.id} />
          })
          }
        </div>
      )
      }
    </div>
  )
}

export default UserProfile