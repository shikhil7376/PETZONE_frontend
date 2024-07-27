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
        },
        clearKenneldata:(state)=>{
           state.kennelOwnerData = null
        }
      }
})


export const {setKennelCredential,clearKenneldata} = kennelSlice.actions

export default kennelSlice.reducer