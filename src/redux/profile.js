import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
    name: "profile",
    initialState: {
        link : ""
    },
    reducers: {
        saveImage: (state, action) => {
            // console.log("calling redux ", action)
            state.link = action.payload
            // console.log("calling redux link ", state.link)
            // console.log("payload,", action)
        }
    },
});

export const {saveImage} = profileSlice.actions;
export default profileSlice.reducer;
