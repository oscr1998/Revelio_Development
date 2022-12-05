import { React, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import './styles.css'

//* Components
import { CreateGame } from '../../components';

//* Redux
import { useSelector, useDispatch } from "react-redux";
import { store_roomID, store_socket, update_players } from '../../actions/socket/socketSlice'

//! DEVELOPMENT ONLY
import io from 'socket.io-client';

export let socket
export let room
//! DEVELOPMENT ONLY

export default function Dashboard() {

    const navigate = useNavigate()
    const dispatch = useDispatch();

    // const socket = useSelector(state => state.socket.socket)

    const [ createGameModel, setCreateGameModel ] = useState(false)
    const [ roomID, setRoomID ] = useState("123")

    function handleJoinRoom(e){
        e.preventDefault();
        room = roomID
        socket.emit('join-room', roomID, msg => { 
            console.log(`ID(${msg.id}) has joined room(${msg.room})`);
            dispatch(store_roomID(roomID))
            navigate('/lobby')
        })
    }

    //! DEVELOPMENT ONLY
    useEffect(()=>{
        socket = io("http://localhost:3030/");
        socket.on('connect', () => { 
            console.log(socket.id);
            dispatch(store_socket(socket))
        })
        socket.on('update-room', (players) => {
            dispatch(update_players(players))
        })
    },[])
    //! DEVELOPMENT ONLY

    return (
        <div id='dashboardContainer'>
            <div id='dash1cont' style={{float:"left"}}>
                <h1 id='h1dashboard'>Player Icon</h1>
                <h1>Username</h1>
                <h2>Stats</h2>
            </div>
            <div id='dash2cont' style={{float:"right"}}>
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
