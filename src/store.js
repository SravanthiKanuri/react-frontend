import { configureStore } from "@reduxjs/toolkit";
import  mySlice  from "./Reducer/Reducer";
import jobSlice  from "./Reducer/Reducer2";

export const Store = configureStore({
    reducer : {
        sravanthi : mySlice,
        sravanthijobs : jobSlice
    }
})