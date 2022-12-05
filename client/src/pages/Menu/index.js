import { React, useState } from 'react'
import { Login, Register } from '../../components'
import { Link } from 'react-router-dom';
import './style.css'


export default function Menu() {

    const [ regModel, setRegModel ] = useState(false)

    return (
        <div className='loginContainer nes-container is-centered'>
            <h1>Logo</h1>

            <Login />

            <button onClick={() => setRegModel(true)} className="nes-btn is-primary">Register</button>
            {regModel? <Register  setRegModel={setRegModel}/> : null}

            
            <button className="nes-btn">
                <Link to='/leaderboard'>Leaderboard</Link>
            </button>
            
        </div>
    )
}
