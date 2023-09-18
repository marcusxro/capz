import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'

const UrActivity = () => {
    const [results, setResults] = useState([]);
    const [user, setUser] = useState()
    const [newContent, setNewContent] = useState('');
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setLoading(true);

        axios.get('http://localhost:8000/database')
            .then((res) => {
                console.log('Data fetched successfully');
                setResults(res.data);
                setLoading(false); // Move setLoading(false) here
            })
            .catch((err) => {
                console.error('Error fetching data:', err);
                setLoading(false); // Move setLoading(false) here as well
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
    const handleEditSubmit = (postId, contentIns) => {
        // Send the updated activity for the specific post to the server
        if (!contentIns) {
            return alert("TANGINA MO BAWAL EMPTY HAHAHA")
        }
        axios.put(`http://localhost:8000/posts/${postId}`, { content: contentIns }) // my activity params
            .then((response) => {
                window.location.reload()
            })
            .catch((error) => {
                alert("You can't edit this post.");
                console.error('Error updating post:', error);
            });
    };

    const deleteData = (mongoData) => {
        axios
            .delete(`http://localhost:8000/posts/${mongoData}`)
            .then(() => {
                window.location.reload()
            })
            .catch((error) => {
                console.log('Error:', error);
            });
    };

    return (
        <div className='actCon'>
            <h1>your activity</h1>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                results
                    .filter((data) => data.Uid === user)
                    .map((data) => (
                        <div key={data.id} className='conss'>
                            <p>By: {data.email}</p>
                            <p>{data.activity}</p>
                            <div className="edit">
                                {data.Uid === user && (
                                    <div>
                                        <div className="btnCon">
                                        <input
                                            type="text"
                                            placeholder='edit ur post'
                                            onChange={(e) => setNewContent(e.target.value)}
                                        />
                                            <button onClick={() => {
                                                handleEditSubmit(data._id, newContent);
                                            }}>
                                                Update
                                            </button>
                                            <button onClick={() => {
                                                deleteData(data._id)
                                            }}>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
            )}
            {!loading && results.filter((data) => data.Uid === user).length === 0 && ( // checks the condition if you have no act
                <div>You don't have any activity at the moment</div>
            )}


        </div>
    );
}

export default UrActivity
