import { createSlice, current } from "@reduxjs/toolkit";

export const flaskSlice = createSlice({
    name: 'flask',
    initialState: {
        isLogin: false,
        loginErrMsg: "",
    },
    reducers: {
        check_auth: ( state, action ) => {
            state.isLogin = action.payload
        },
        login: ( state, action ) => {
            if (action.payload === true){
                state.isLogin = true
                state.loginErrMsg = ""
            } else {
                state.isLogin = false
                state.loginErrMsg = "Incorrect login details"
            }
        }
            
    },
})

export const { check_auth, login } = flaskSlice.actions

export default flaskSlice.reducer

