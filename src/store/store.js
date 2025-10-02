import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../pages/authentication/authSlice.js';

export const store =configureStore({
    reducer:{
        auth:authReducer
    }
})
