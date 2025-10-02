import {createSlice} from "@reduxjs/toolkit"

const initialState={
    user:'varad',
    token:null,
    isloading:false
}

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        loginSuccess:(state,action)=>{
            state.user=action.payload.user;
            state.token=action.payload.token;
        },
        logOut:(state)=>{
            state.user=null;
            state.token=null
        }
    }
})

export const {loginSuccess,logOut} =authSlice.actions;
export default authSlice.reducer;