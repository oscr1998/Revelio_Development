import { React, useState } from 'react'

//* Socket
import { store_socket } from '../../actions/socket/socketSlice'
import io from 'socket.io-client';
const serverEP = "https://localhost:5000/";

export default function Login() {

    const [loginInfo, setLoginInfo] = useState({
        username: "",
        password: "",
    })

    function handelLogin(e){
        e.preventDefault();
        //todo Send login detail to backend
        //todo upon successful login: 
        //todo      - const socket = io(serverEP);
        //todo      - socket.on('connect', () => { dispatch(store_socket(socket)) })
        //todo      - navigate('/dashboard')
        //todo if failed:
        //todo      - render an error msg
    }

    return (
        <form onSubmit={handelLogin}>
            <h1>Login</h1>
            <label>Username:
                <input 
                    required
                    type="text" 
                    placeholder='Username' 
                    value={loginInfo.username} 
                    onChange={(e) => { setLoginInfo({...loginInfo, username: e.target.value }) }} 
                />
                <br />
            </label>

            <label>Password:
                <input 
                    required
                    type="text" 
                    placeholder='Password' 
                    value={loginInfo.password} 
                    onChange={(e) => { setLoginInfo({...loginInfo, password: e.target.value }) }} 
                />
                <br />
            </label>

            <input type="submit" value="Login" />
        </form>
    )
}
