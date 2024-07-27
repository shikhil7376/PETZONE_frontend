import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    admindata:null
}

const adminAuthSlice = createSlice({
    name:'adminAuth',
    initialState,
    reducers:{
        setAdminCredential:(state,action)=>{
            state.admindata = action.payload
        },
        clearAdminData:(state)=>{
            state.admindata = null
        }
    }
})

export const {setAdminCredential,clearAdminData} = adminAuthSlice.actions
export default adminAuthSlice.reducer