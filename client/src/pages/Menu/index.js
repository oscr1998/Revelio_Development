import { React, useState } from 'react'
import { Login, Register } from '../../components'
import { Link } from 'react-router-dom';



export default function Menu() {

    const [ regModel, setRegModel ] = useState(false)

    return (
        <div>
            <h1>Logo</h1>

            <Login />

            <button onClick={() => setRegModel(true)}>Register</button>
            {regModel? <Register  setRegModel={setRegModel}/> : null}

            
            <button style={{display:"block"}} >
                <Link to='/leaderboard'>Leaderboard</Link>
            </button>
            
        </div>
    )
}
