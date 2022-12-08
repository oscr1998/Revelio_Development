import React, { useEffect, useState } from 'react'
import Backdrop from '../Backdrop'
import { useNavigate } from 'react-router-dom'



export default function Results({handleClose, results}) {

    const navigate = useNavigate()

    return (
        <Backdrop onClick={handleClose}>
            <h1>Results</h1>
            <h3>{results} Side Win!</h3>
            <button onClick={()=>{ navigate('/dashboard') }}>Back to Home</button>
        </Backdrop>
    )
}
