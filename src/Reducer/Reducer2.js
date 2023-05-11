import { createSlice } from "@reduxjs/toolkit";

export const jobSlice = createSlice({
    name: "value",
    initialState: {
        value:0
    },
    reducers: {
        totaljobs: (state,action)=>{
            state.value = action.payload
        }
    }
})
export const {totaljobs} = jobSlice.actions;
export default jobSlice.reducer;








