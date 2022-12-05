import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";


import { useSelector, useDispatch } from "react-redux";


export default function Lobby() {

    const navigate = useNavigate()

    const roomID = useSelector(state => state.socket.roomID)
    const players = useSelector(state => state.socket.players)
    const socket = useSelector(state => state.socket.socket)

    useEffect(() => {
        socket.on('teleport-players', () => {
            navigate('/game');
        })
    },[])

    function handleStartGame(e){
        e.preventDefault();
        socket.emit('start-game', roomID)
    }

    return (
        <div>
            <h1>{roomID}</h1>
            <h2>Number of Players: {Object.keys(players).length}</h2>
            <button onClick={handleStartGame}>Let's Go</button>
        </div>
    )
}
