import { createSlice } from "@reduxjs/toolkit";

export const mySlice = createSlice({
    name: "countVal",
    initialState : {
        count: 0

        
    },
    reducers:{
        getCount:(state, action)=>{
            state.count = action.payload
        }

    } 
})
export const {getCount} = mySlice.actions;
export default mySlice.reducer;

