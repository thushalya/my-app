import { createSlice } from "@reduxjs/toolkit";

export const alertSlice = createSlice({
    name: "alert",
    initialState: {
        token : "",
    },
    reducers: {
        save: (state, action) => {
            state.token = action.payload
        },
    },
});

export const {save} = alertSlice.actions;
export default alertSlice.reducer;
