import { createSlice } from "@reduxjs/toolkit";

export const watchlistSlice = createSlice({
    name: "watchlist",
    initialState: {
        removeMarket : []
    },
    reducers: {
        saveWatchlist: (state, action) => {
            state.removeMarket = [...state.removeMarket, action.payload]
        },
        removeMarketList: (state) => {
            state.removeMarket = []
        }
    },
});

export const {saveWatchlist, removeMarketList} = watchlistSlice.actions;
export default watchlistSlice.reducer;
