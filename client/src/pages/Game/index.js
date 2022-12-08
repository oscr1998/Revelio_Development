import React, { useEffect, useState } from 'react'
import { config } from '../../game/index'
import { IonPhaser } from '@ion-phaser/react'
import { Bounce } from 'react-reveal'
import './style.css'

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Results } from '../../components'

export default function Game() {

    const navigate = useNavigate()
    const socket = useSelector(state => state.socket.socket)
    const [resultsModal, setResultsModal] = useState(false)

    useEffect(() => {
        socket.on("endGame", () => {
            setResultsModal(true)
            // navigate("/dashboard")
        })
    }, [])

    return (
        <div>
            <div id='gameContainer'>
                <Bounce top> <IonPhaser game={config} initialize={true} /> </Bounce>
            </div>
            {resultsModal? <Results handleClose={setResultsModal}/> : null}
        </div>

    )
}
