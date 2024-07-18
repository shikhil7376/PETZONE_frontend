import { createSlice } from "@reduxjs/toolkit";

const getStoredUserInfo = ()=>{
    const storedUserInfo = localStorage.getItem('userInfo')
    try {
       return storedUserInfo ? JSON.parse(storedUserInfo):null
    } catch (error) {
        console.error('Error parsing stored user info:',error)
        localStorage.removeItem('userInfo')
        return null
    }
}

const initialState = {
    userInfo:getStoredUserInfo()
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setCredential:(state,action)=>{
            state.userInfo = action.payload
            localStorage.setItem('userInfo',JSON.stringify(action.payload))
        },
        userLogout:(state)=>{
            state.userInfo = null
            localStorage.removeItem('userInfo')
        },
        clearUser:(state)=>{
            state.userInfo = null
            localStorage.removeItem('userInfo')
        }
    }
})

export const {setCredential,userLogout,clearUser} = authSlice.actions

export default authSlice.reducer