import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../pages/authentication/authSlice.js';
import projectReducer from '../pages/Projects/projectSlice';
import boardSlicer from "../pages/Board/boardSlice.js"

export const store =configureStore({
    reducer:{
        auth:authReducer,
        project:projectReducer,
        board:boardSlicer
    }
})
