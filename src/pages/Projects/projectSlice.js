import {createSlice} from "@reduxjs/toolkit"

const initialState={
    isOpen:true,
    projModal:false,
    reload:true,
    currentProj:null
}


const projectSlice=createSlice({
    name:'project',
    initialState,
    reducers:{
        
        Sidebar:(state,action)=>{
            state.isOpen=action.payload.isOpen;
        },
        AddProj:(state,action)=>{
            state.projModal=action.payload.projModal
        },
        reload:(state,action)=>{
            state.reload=action.payload.reload
        },
        setProj:(state,action)=>{
            state.currentProj=action.payload.currentProj
        }
    }
})

export const {Sidebar,AddProj,reload,setProj} =projectSlice.actions;
export default projectSlice.reducer;