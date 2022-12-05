import { React, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

//* Components
import { CreateGame } from '../../components';

//* Redux
import { useSelector, useDispatch } from "react-redux";
import { store_roomID } from '../../actions/socket/socketSlice'

//! DEVELOPMENT ONLY
import io from 'socket.io-client';
let socket
//! DEVELOPMENT ONLY

export default function Dashboard() {

    const navigate = useNavigate()
    const dispatch = useDispatch();

    // const socket = useSelector(state => state.socket.socket)

    const [ createGameModel, setCreateGameModel ] = useState(false)
    const [ roomID, setRoomID ] = useState("123")

    function handleJoinRoom(e){
        e.preventDefault();
        socket.emit('join-room', roomID)
        dispatch(store_roomID(roomID))
        navigate('/lobby')
    }

    //! DEVELOPMENT ONLY
    useEffect(()=>{
        socket = io("https://localhost:5000/");
        socket.on('connect', () => { console.log(socket.id); })
    },[])
    //! DEVELOPMENT ONLY

    return (
        <div>
            <div style={{float:"left"}}>
                <h1>Player Icon</h1>
                <h1>Username</h1>
                <h2>Stats</h2>
            </div>
            <div style={{float:"right"}}>
            <form onSubmit={handleJoinRoom}>
                <input
                    required
                    type="text"
                    placeholder='Room ID' 
                    value={roomID} 
                    onChange={(e) => setRoomID(e.target.value) } 
                />
                <br />
                <input type="submit" value="Join Game" />
            </form>
            <button onClick={() => setCreateGameModel(true)}>Create A Game</button>
            </div>
            { createGameModel? <CreateGame  setCreateGameModel={setCreateGameModel}/> : null }
        </div>
    )
}
