import React, { useEffect, useState } from 'react'
import UserCard from './card'

const Users = () => {
    const [userData, setUserData] = useState(null)
    const [postData , setPostData] = useState(null)
    const getUserData = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        response.json().then(result => setUserData(result))
    }
    const getPostData = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        const result = await response.json()
        setPostData(result.reduce((acc, item) => {
            const { userId } = item;
            if (acc[userId]) {
              acc[userId]++;
            } else {
              acc[userId] = 1;
            }
            return acc;
        }, {}))
    }
    useEffect(() => {
        getUserData()
        getPostData()
    }, [])
    return (
        <>
            <div style={{margin:'5px', padding:'10px'}}>Directory</div>
            {userData && postData && (
                <>
                    {userData.map(user => {
                        return (
                            <UserCard userData={user} postCount={postData[user.id]} key={user.id}/>
                        )
                    })}
                </>)}
        </>
    )
}

export default Users