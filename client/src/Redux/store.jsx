import { configureStore } from "@reduxjs/toolkit";
import LoaderSlice from "./LoaderSlice";
import UserSlice from "./UserSlice";

export default configureStore({
    reducer:{
        loader:LoaderSlice,
        users:UserSlice
    }
})