import {createSlice} from "@reduxjs/toolkit"

const loaderSlice=createSlice({
    name:"loaders",
    initialState:{
        loading:false
    },
    reducers:{
        SetLoader:(state,action)=>{
            state.loading=action.payload
        }
    }
})

export const {SetLoader}=loaderSlice.actions
export default loaderSlice.reducer