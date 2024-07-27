import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    userdata : null
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setCredential:(state,action)=>{
            state.userdata = action.payload
        },
        clearUserdata:(state)=>{
            state.userdata = null
        }
    }
})

export const {setCredential,clearUserdata} = authSlice.actions

export default authSlice.reducer