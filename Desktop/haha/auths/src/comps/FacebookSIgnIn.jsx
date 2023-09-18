import React from 'react'
import { getAuth, signInWithPopup } from 'firebase/auth';
import { FacebookAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons';



const FacebookSIgnIn = () => {

  const SignInUsingFaceBook = () => {

    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((res) => {
        console.log(res.user)
      }).catch((err) => {
        console.error(err)
      })
  }

  return (
    <div>
      <div className="facebook" 
      onClick={SignInUsingFaceBook}>
        <span>
          <FontAwesomeIcon
            icon={faFacebook}
            className='google'
          />
        </span> Login with Facebook
      </div>
    </div>
  )
}

export default FacebookSIgnIn
