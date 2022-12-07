import React, { useEffect } from 'react'
import { config } from '../../game/index'
import { IonPhaser } from '@ion-phaser/react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Game() {

    const navigate = useNavigate()
    const socket = useSelector(state => state.socket.socket)

    useEffect(() => {
        socket.on("endGame", () => {
            navigate("/lobby")
        })
    }, [])
    return (
        <div>
            <IonPhaser game={config} initialize={true} />
        </div>
    )
}
