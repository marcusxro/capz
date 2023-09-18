import React, { useEffect, useState } from 'react'
import AuthDetails from '../AuthDetails'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { data } from '../comps/SignIn';
import { ref, set } from 'firebase/database';
import { DB } from '../Database';
import axios from 'axios'
import Result from '../comps/Result';

const HomePage = () => {
  const history = useNavigate();
  const auth = getAuth();
  const [userId, setUserId] = useState([]);
  const [iden, setIden] = useState()
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.displayName ? user.displayName : (user.email ? user.email : ""));
        setIden(user.uid)
        if (!user.emailVerified) {
          history('/NotAllowed');
        }
      } else {
        history('/');
      }
      return () => {unsubscribe()}
    });
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Send a POST request to your server with the user's Firebase UID and activity data
      await axios.post('http://localhost:8000/getId', {activity: inputValue, Uid: iden, email: userId } );
      alert('Activity saved successfully');
    } catch (error) {
      // Log the error to the console for debugging purposes
      console.error('Error saving activity:', error);
      alert('An error occurred while saving the activity. Please try again.');
    }
  };
  

  return (
    <div className='outercon'>
      <h1>HOMEPAGE</h1>
      <form onSubmit={handleSubmit} className='formSubmit'>
        <input
          onChange={(e) => setInputValue(e.target.value)}
          type='text'
          placeholder='whats on your mind?'
          value={inputValue}
        />
        <button type='submit' className='sub'>submit</button>
      </form>
      <AuthDetails />
      <Result />
    </div>
  );
};

export default HomePage;