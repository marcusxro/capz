import React from 'react'
import { useNavigate } from 'react-router-dom'

const Sneak = () => {
    const nav = useNavigate()
  return (
    <div>
      <h1>ARE YOU TRYING TO GO INISDE? YOU SNEAKY BASTARD.</h1>
        <div className="goHome">
            nice try, now head back to <span onClick={() => {
                nav('/')
            }}>Home.</span>
        </div>
    </div>
  )
}

export default Sneak
