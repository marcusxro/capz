import React, { useEffect } from 'react'
import SignUp from '../comps/SIgnUp'
import gardnerLogo from '../images/GardnerLogo.jpg'
import { gsap } from 'gsap'
const SignUpPage = () => {

   useEffect(() => {
    gsap.to('.progress', {
        duration: 1.5,
        delay: 0.5,
        width: "50%",
        onComplete: () => {
            gsap.to('.firstP', {
                color: "green"
            })
        }
    })
   }, [])

  return (
    <div className='SignUpPageCon'>
        <div className="leftSideOfSIgnUp">
            <div className="firstLeft">
                <div className="textCon">
                    <p className='firstP'>Sign Up</p>
                    <p className='secP'>Sign In</p>
                </div>
        <div className="line">
            <div className="progress"></div>
        </div>
            </div>
            <div className="secLeft">
            <SignUp />
            </div>
        </div>
        <div className="RightSideOfSIgnUp">

            <h1>LET'S MAKE IT HAPPEN TOGETHER!</h1>
                <div className="boxCon">
                    <div className="boxes">FAST</div>
                    <div className="boxes">RELIABLE</div>
                    <div className="boxes">SAFE</div>
                    <div className="boxes"></div>
                </div>
            </div>

    </div>
  )
}

export default SignUpPage
