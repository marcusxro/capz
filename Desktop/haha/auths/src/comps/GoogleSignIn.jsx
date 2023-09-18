import React from 'react'
import { GoogleAuthProvider } from 'firebase/auth'
import { getAuth, signInWithPopup } from 'firebase/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const GoogleSignIn = () => {

  const SignInUsingGoogle = () => {
    const auth = getAuth()
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then((res) => {
        console.log(res.user)
      })
      .catch((err) => {
        console.error(err)
      })
  }
  return (
    <div>
      <div className="google" onClick={SignInUsingGoogle}>
        <span>
          <FontAwesomeIcon
            icon={faGoogle}
            className='google'
          />
        </span> Login with Google
      </div>
    </div>
  )
}

export default GoogleSignIn
