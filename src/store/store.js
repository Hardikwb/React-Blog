import { configureStore } from "@reduxjs/toolkit";
import authService from "../appwrite/auth";
import authSliceReducer from "./authSlice";

const store = configureStore({
    reducer:{
        authSlice:authSliceReducer,
    }
});

export default store