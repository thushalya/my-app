import { createSlice } from "@reduxjs/toolkit";

export const watchlistSlice = createSlice({
    name: "watchlist",
    initialState: {
        watchlist: [],
    },
    reducers: {
        initWatchlist: (state, action) => {
            state.watchlist = action.payload;
        },
        addToWatchlist: (state, action) => {
            state.watchlist = [...state.watchlist, action.payload];
        },
        removeFromWatchlist: (state, action) => {
            state.watchlist = state.watchlist.filter((item) => item !== action.payload);
        }
    },
});

export const { addToWatchlist, removeFromWatchlist, initWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;
