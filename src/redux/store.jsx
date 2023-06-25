import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

export const store = configureStore({
    reducer : {
        user: userSlice // userslice di import dari redux userSlice
    }
})