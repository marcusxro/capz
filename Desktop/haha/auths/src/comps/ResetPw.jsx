import React, { useState, useEffect, useRef } from 'react'
import { auth } from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Link } from 'react-router-dom';

const ResetPw = () => {
    const [email, setEmail] = useState('');
    const [resetStatus, setResetStatus] = useState(null);
    const [counter, setCounter] = useState(0)
    const [loading, setLoading] = useState('')
    const [cooldown, setCooldown] = useState(0);
    const cooldownHolder = useRef(null)
    useEffect(() => { //if it reaches 3 requests
        if (counter >= 3) {
            setCooldown(3 * counter); //automatically adds a cooldown based on click
            setLoading('Cooling down...');
        }
    }, [counter]);
    useEffect(() => { //decrement effect
        const intervalId = setInterval(() => {
            if (cooldown > 0) {
                setCooldown(cooldown - 1);
                cooldownHolder.current.placeholder = `wait ${cooldown} to submit again`
                setEmail('')
            } else {
                cooldownHolder.current.placeholder = `Enter your email`
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [cooldown]);

    const resetPassword = (e) => {
        e.preventDefault();
        if (cooldown > 0) {
            console.log("You are in cooldown. Please wait.");
            return; 
        }
        setCounter(counter + 1);
        setLoading('Loading...');
        sendPasswordResetEmail(auth, email)
            .then(() => {
                const user = auth.currentUser;
                if (!user.emailVerified) {
                    setResetStatus('Not verified');
                    setEmail('')
                } else {
                    setResetStatus('Password reset email sent');
                    setEmail('')
                }
                setLoading('');
            })
            .catch((error) => {
                if (error.code === 'auth/user-not-found') {
                    setResetStatus('User does not exist');
                    setEmail('')
                } else {
                    console.error('Error sending password reset email:', error.message);
                    setResetStatus('Error: ' + error.message);
                    setEmail('')
                }
                setLoading('');
            });
    };

    return (
        <div>
            <p>{loading}</p>
            {resetStatus && <p>{resetStatus}</p>}
            <form onSubmit={resetPassword}>
                <input onChange={(e) => { setEmail(e.target.value) }}
                    value={email}
                    placeholder='enter your email'
                    type="email"
                    required
                    ref={cooldownHolder}
                />
                <button type='submit'>submit</button>
            </form>
            <Link to="/">
                Sign up
            </Link>
        </div>
    )
}

export default ResetPw
