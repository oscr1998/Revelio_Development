import { React, useState } from 'react'
import { Login, Register } from '../../components'
import { Link } from 'react-router-dom';
import './style.css'
import Zoom from 'react-reveal/Zoom';

export default function Menu() {

    const [ regModel, setRegModel ] = useState(false)

    return (
        <div id='menuContainer'>
        <h1>Logo</h1>
        <Zoom><div className='loginContainer nes-container is-centered'>
            
            <Login />

            <button onClick={() => setRegModel(true)} className="nes-btn is-primary">Register</button>
            {regModel? <Register  setRegModel={setRegModel}/> : null}
            
            <button className="nes-btn">
                <Link to='/leaderboard'>Leaderboard</Link>
            </button>
            
        </div>
        </Zoom>
        </div>
    )
}
