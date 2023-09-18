import React from 'react'
import SignIn from '../comps/SignIn'
import FastAuth from '../comps/FastAuth'
import gardner from '../images/GardnerLandingImage.jpg'
import SchoolLogo from '../images/GardnerLogo.jpg'
import { useNavigate } from 'react-router-dom'
const Home = () => {
    const nav = useNavigate()
    return (
        <div className='Home'>
            <div className="left">
                <div className="leftFirst">
                    <SignIn />
                </div>
                <div className="leftBot">
                    <div className="leftText">
                        Don't have account yet? <span onClick={() => {
                            nav('/SignUp')
                        }}>Join us.</span>
                    </div>
                    <FastAuth />
                </div>
            </div>
            <div className="right">
                <img src={gardner}></img>
            </div>
        </div>
    )
}

export default Home
