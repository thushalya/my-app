import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
    name: "notification",
    initialState: {
       count: 0,
    },
    reducers: {
        increment: (state) => {
            state.count = state.count + 1
        },
        setCount: (state, action) => {
            state.count = action.payload
        },
        decrement: (state) => {
            state.count = state.count - 1
        },
    },
});

export const {increment,setCount, decrement} = notificationSlice.actions;
export default notificationSlice.reducer;
