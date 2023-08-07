import { createSlice } from "@reduxjs/toolkit";

export const userSlice=createSlice({
    name:"users",
    initialState:{
        user:null

    },
    reducers:{
        SetUser:(state,action)=>{
            state.user=action.payload
            console.log(state.user)
        }

    }
})

export const {SetUser}=userSlice.actions
export default userSlice.reducer