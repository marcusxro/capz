import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'
import UrActivity from './UrActivity';

const Result = () => {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState()

    useEffect(() => {
        axios.get('http://localhost:8000/database')
            .then((res) => {
                setResults(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user.uid)
            if (results === user.uid) {
                alert("good")
            }
        })
    }, []);

    return (
        <div className='conParent'>
            <h1>Posts</h1>
            {results.map((data) => (
                <div className="conss" key={data.id}>
                    <p>By: {data.email}</p>
                    <p>{data.activity}</p>
                </div>
            ))}
            <UrActivity />
        </div>
    );
}

export default Result;
