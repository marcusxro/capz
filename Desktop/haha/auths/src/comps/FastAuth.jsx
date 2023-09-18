import React from 'react'
import GoogleSignIn from './GoogleSignIn'
import FacebookSIgnIn from './FacebookSIgnIn'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons';


const FastAuth = () => {
    return (
        <div className='authServices'>
           <GoogleSignIn />
          <FacebookSIgnIn />
        </div>
    )
}

export default FastAuth
