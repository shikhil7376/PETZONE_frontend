import { createSlice } from "@reduxjs/toolkit";

const getStoredAdminInfo = ()=>{
    const storedAdminInfo = localStorage.getItem('adminInfo')
    try {
        return storedAdminInfo ?JSON.parse(storedAdminInfo) : null
    } catch (error) {
        console.error('error parsing stored admin info:',error)
        localStorage.removeItem('adminInfo')
        return null
    }
}

const initialState = {
    adminInfo:getStoredAdminInfo()
}

const adminAuthSlice = createSlice({
    name:'adminAuth',
    initialState,
    reducers:{
        setAdminCredential:(state,action)=>{
            state.adminInfo = action.payload
            localStorage.setItem('adminInfo',JSON.stringify(action.payload))
        },
        adminLogout:(state)=>{
            state.adminInfo = null
            localStorage.removeItem('adminInfo')
        }
    }
})

export const {setAdminCredential,adminLogout} = adminAuthSlice.actions
export default adminAuthSlice.reducer