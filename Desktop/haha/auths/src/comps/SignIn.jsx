import React, { useRef, useState, useEffect } from 'react'
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import GoogleSignIn from '../comps/GoogleSignIn'
import FacebookSIgnIn from '../comps/FacebookSIgnIn'
export let data;

const SignIn = () => {
    const navigate = useNavigate();
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const passLength = useRef(null)
    const [click, setClick] = useState(0)
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        const unSub = onAuthStateChanged(auth, (user) => {
            if (user) {
                if (!user.emailVerified) {
                    navigate('/');
                } else {
                    navigate('/Homepage');
                    setUserList(null)
                }
            }
        });

        return () => unSub(); // Cleanup the listener when the component unmounts
    }, [navigate]);


    const Sign = (e) => {
        e.preventDefault();

        // Check password length
        if (Password.length <= 5) {
            alert("Password should be at least 6 characters long");
            return;
        }

        signInWithEmailAndPassword(auth, Email, Password)
            .then((userCredential) => {
                const user = userCredential.user;
                data = user.uid
                setUserList(user.uid)
                if (user && !user.emailVerified) {
                    alert("Your email is not verified. Please check your email and verify your account.");
                    navigate('/')
                } else {
                    navigate('/Homepage')
                }
            })
            .catch((err) => {
                if (err.code === 'auth/user-not-found') {
                    alert('User not found. Please register.');
                } else if (err.code === 'auth/wrong-password') {
                    alert("Wrong password, please try again.");
                } else if (err.code === 'auth/too-many-requests') {
                    alert("Account temporarily disabled due to too many requests.");
                } else {
                    console.error('Authentication error:', err);
                }
            });
    };
    const checkBox = useRef(null)
    function showPass() {
        passLength.current.type = "text"
        setClick(click + 1)
        checkBox.current.checked = true
        if (click === 1) {
            setClick(0)
            passLength.current.type = "password"
            checkBox.current.checked = false
        }
    }
    return (
        <div className='Container'>
            <form
                className='signInForm'
                onSubmit={Sign}>
                <h1>Sign In</h1>
                <label htmlFor="email">Email</label>
                <input
                    className='email'
                    type="email"
                    onChange={(e) => { setEmail(e.target.value) }}
                    value={Email}
                    required
                />
                <label htmlFor="pw">Password</label>
                <input
                className='pw'
                    ref={passLength}
                    type="password"
                    onChange={(e) => { setPassword(e.target.value) }}
                    value={Password}
                    required
                />
                <div className="checkBox">
                    <div className='chekcs'>
                    <input
                        ref={checkBox}
                        className='check'
                        type="checkbox"
                        onClick={showPass} />

                    <div className="labelForCheck"
                        onClick={showPass}>
                        show password
                    </div>
                    </div>
                    <Link style={{display: 
                    "flex",
                     alignItems: "center", 
                     textDecoration: "none",
                    color: "blue"}}
                    to="/ResetPassword">
                    Forgot your password?
                </Link>
                </div>
                <button
                    className='SignInBtn'
                    type='submit'>
                    <> Sign in</>
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </form>
        </div>
    )
}

export default SignIn
