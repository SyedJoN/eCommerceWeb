import React from 'react'
import { useSelector } from 'react-redux'


function UserAvatar({ width = '40px', height = '40px' }) {
    const avatar = useSelector(state => state.auth.currentUser);

    return (

        <img
            className='border-2 border-green-500 object-cover rounded-full'
            style={{ width, height }}
            src={avatar?.data.avatar.url}
            alt={avatar?.username} />

    )
}

export default UserAvatar