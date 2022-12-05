import { createSlice, current } from "@reduxjs/toolkit";

export const socketSlice = createSlice({
    name: 'socket',
    initialState: {
        socket: null,
        roomID: "",
    },
    reducers: {
        store_socket: ( state, action ) => {
            state.socket = action.payload
        },
        store_roomID: (state, action) => {
            state.roomID = action.payload
        },
    },
})

export const { store_socket, store_roomID } = socketSlice.actions

export default socketSlice.reducer
