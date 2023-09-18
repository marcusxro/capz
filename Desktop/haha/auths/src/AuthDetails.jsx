import React, { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from './firebase'
import { useNavigate } from 'react-router-dom'

const AuthDetails = () => {
    const nav = useNavigate()

    const [auths, setAuths] = useState(null)

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuths(user)
                nav("/Homepage")
            } else if (user && !user.emailVerified) {
                alert("Your email is not verified. Please check your email and verify your account.");
                nav('/')
            }
            else {
                setAuths(null)
                nav("/")
            }
        })
        return () => {listen()}
    }, [nav])

    const userSignOutConfig = () => {
        signOut(auth)
            .then((msg) => { console.log(msg + "successfully logged out") })
            .catch((err) => { console.log("error" + err) })
            nav('/')
    }
    return (
        <div className='authDetails'>
            {auths ? 
            <>
        <p>{`Signed in as ${auths.displayName ? auths.displayName:
            (auths.email ? auths.email: 'Guest')}`}</p>
                <button
                className='logOut'
                    onClick={userSignOutConfig}>
                    Sign out
                </button>

            </>
            : <p>not signed in</p>}

        </div>
    )
}

export default AuthDetails
