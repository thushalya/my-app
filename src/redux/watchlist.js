import { createSlice } from "@reduxjs/toolkit";

export const watchlistSlice = createSlice({
    name: "watchlist",
    initialState: {
        watchlist: [],
    },
    reducers: {
        addToWatchlist: (state, action) => {
            state.watchlist = [...state.watchlist, action.payload];
        },
        removeFromWatchlist: (state, action) => {
            state.watchlist = state.watchlist.filter((item) => item !== action.payload);
        }
    },
});

export const { addToWatchlist, removeFromWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;
