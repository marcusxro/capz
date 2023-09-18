import React, { useEffect, useRef, useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap'

const SignUp = () => {

  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secPass, setSecPass] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('Get Started Now')
  const [booleanIns, setBooleanIns] = useState(false)
  const [pTag, setPtag] = useState('Welcome in our service, create an account to start your experience')
  const [specialWords, setSpecialWords] = useState([
    "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_",
    "+", "-", "=", "{", "}", "[", "]", "|", "\\", ":", ";",
    "\"", "'", "<", ">", ",", ".", "?", "/", "~", "`"
  ])

  useEffect(() => {


  }, [])

  const errs = {
    errOne: "Passwords do not match",
    errTwo: "Password should be at least 7 characters long",
    errThree: "Password must contain at least one special character.",
    errFour: "Email is already in use. Please use a different email."
  }

  let handleSignUp
  useEffect(() => {
    if (booleanIns) {
      setPtag("head to your Email and verify it!  ")
      gsap.to('.progress', {
        width: "100%",
        duration: 1.5,
        onComplete: () => {
          gsap.to('.secP', {
            color: "green"
          });
        }
      });
    }
  }, [booleanIns]);

  handleSignUp = (e) => {
    e.preventDefault();
    setLoading('Loading...')
    const split = password.split('')
    const finalizedWords = split.some(words => specialWords.includes(words))

    //if pw vars are not match
    if (password !== secPass) {
      setError(errs.errOne);
      setLoading('')
    } else if (password.length <= 8) {
      setError(errs.errTwo);
      setLoading('')
    } else if (!finalizedWords) {
      setError(errs.errThree);
      setLoading('')
    }
    else {
      setError(''); //resets the state
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            setStatus("account created")
            setBooleanIns(true)
          if (userCredentials) {
            sendEmailVerification(auth.currentUser) //email verif
              .then(() => {
                const user = auth.currentUser;
                if (user && !user.emailVerified) { // if not verified
                  navigate('/SignUp'); //transfers to /SignUp page
                  setLoading('')
                  return;
                } else {
                  navigate('/Homepage');
                }
              }).catch((err) => {
                console.log("error: " + err)
              })
          } else {
            navigate('/');
          }
        })
        .catch((err) => {
          if (err.code === 'auth/email-already-in-use') {
            setError(errs.errFour);
            setLoading('')
          } else {
            console.error('Error:', err.message);
          }
        });
    }
  };

  const inputOne = useRef(null)
  const inputTwo = useRef(null)
  const [clicks, setClicks] = useState(0)
  const checkBoxInput = useRef(null)
  const [loading, setLoading] = useState('')

  return (
    <div className="signUpForm">
      <form onSubmit={handleSignUp}>
        <h1>{loading}</h1>
    <div className="greet">
    <h1>{status}</h1>
        <p>{pTag}</p>
    </div>
        <label htmlFor="email">Email</label>
        <input type="email"
          className='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />

       <div className="pwCon">
        <div className="inputPassOne pws">
        <label htmlFor="pw">Password</label>
        <input
              ref={inputOne}
              type="password"
              className='pw'
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
        </div>

    <div className="inputPassTwo pws">
    <label htmlFor="repPw">Repeat Password</label>
        <input
          ref={inputTwo}
          className='repPw'
          type="password"
          placeholder="Confirm your password"
          onChange={(e) => setSecPass(e.target.value)}
          value={secPass}
          required
        />
       </div>
    </div>
        <span className="error">{error}</span>
        <div className="showPass">
          <input
            ref={checkBoxInput}
            className='checks'
            type="checkbox"
            onClick={() => {
              if (!password && !secPass) {
                alert("input password first")
                checkBoxInput.current.checked = false
              } else {
                inputTwo.current.type = "text"
                inputOne.current.type = "text"
                setClicks(clicks + 1)
                if (clicks === 1) {
                  setClicks(0)
                  inputOne.current.type = "password"
                  inputTwo.current.type = "password"
                }
              }
            }} />
          <div className="showPassword">Show Password</div>
        </div>

        <div className="signUpbtn">
          <button type="submit">Submit</button>
        </div>
      </form>
      <div className="botSignUp">
        Already have account? <span onClick={() => {
          navigate('/')
        }}>Sign in here.</span>
      </div>
    </div>
  );
};

export default SignUp;
