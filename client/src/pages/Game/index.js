import React, { useEffect } from 'react'
import { config } from '../../game/index'
import { IonPhaser } from '@ion-phaser/react'
import { Bounce } from 'react-reveal'
import './style.css'

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Game() {

    const navigate = useNavigate()
    const socket = useSelector(state => state.socket.socket)

    useEffect(() => {
        console.log("************ENDGAME NAVIGATION")
        socket.on("endGame", () => {
            console.log("GAME OVER ************")
            navigate("/dashboard")
        })
    }, [])

    return (

        <div id='gameContainer'>
            <Bounce top> <IonPhaser game={config} initialize={true} /> </Bounce>
        </div>

    )
}
