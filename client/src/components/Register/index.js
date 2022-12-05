import { React, useState } from 'react'

// TODO: Make a CSS for this model:
//TODO     - position fixed (overlay the whole page)
//TODO     - grey background
//TODO     - white model in the middle of the page

export default function Register({setRegModel={setRegModel}}) {

    const [regInfo, setRegInfo] = useState({
        username: "",
        email: "",
        confirmEmail: "",
        password: "",
        confirmPassword: ""
    })

    function handelRegister(e){
        e.preventDefault();

        if (regInfo.email !== regInfo.confirmEmail){
            //todo render an error msg
        } else if (regInfo.password !== regInfo.confirmPassword) {
            //todo render an error msg
        } else {
            //todo Send register detail to backend
            //todo upon successful post request: 
            //todo      - render a msg: Registered
            //todo      - setRegModel(false)
            //todo if failed:
            //todo      - render an error msg
        }
    }


    return (
        <form onSubmit={handelRegister}>
            <h1>Register</h1>
            <div>
                <button 
                    onClick={() => {
                        setRegModel(false)
                        return false
                    }}
                >x</button>
            </div>

            <label>Username:
                <input 
                    required
                    type="text" 
                    placeholder='Username' 
                    value={regInfo.username} 
                    onChange={(e) => { setRegInfo({...regInfo, username: e.target.value }) }} 
                />
                <br />
            </label>

            <label>Email:
                <input 
                    required
                    type="email" 
                    placeholder='Email' 
                    value={regInfo.email} 
                    onChange={(e) => { setRegInfo({...regInfo, email: e.target.value }) }} 
                />
                <br />
            </label>

            <label>Confirm Email:
                <input 
                    required
                    type="email" 
                    placeholder='Confirm Email' 
                    value={regInfo.confirmEmail} 
                    onChange={(e) => { setRegInfo({...regInfo, confirmEmail: e.target.value }) }} 
                />
                <br />
            </label>

            <label>Password:
                <input 
                    required
                    type="password" 
                    minLength="8"
                    placeholder='Password' 
                    value={regInfo.password} 
                    onChange={(e) => { setRegInfo({...regInfo, password: e.target.value }) }} 
                />
                <br />
            </label>

            <label>Confirm Password:
                <input 
                    required
                    type="password" 
                    minLength="8"
                    placeholder='Confirm Password' 
                    value={regInfo.confirmPassword} 
                    onChange={(e) => { setRegInfo({...regInfo, confirmPassword: e.target.value }) }} 
                />
                <br />
            </label>

            <input type="submit" value="Submit" />

        </form>
    )
}
