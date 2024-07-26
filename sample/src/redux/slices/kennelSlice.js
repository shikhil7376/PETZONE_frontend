import { createSlice } from "@reduxjs/toolkit";


const initialState = {
   kennelOwnerData:null
}

export const kennelSlice = createSlice({
      name:'KennelAuth',
      initialState,
      reducers:{
        setKennelCredential:(state,action)=>{
            state.kennelOwnerData = action.payload
        }
      }
})


export const {setKennelCredential} = kennelSlice.actions

export default kennelSlice.reducer