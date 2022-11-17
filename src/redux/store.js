import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist';
import alertReducer from "./alert.js"
import profileReducer from "./profile.js"
import watchlistReducer from "./watchlist.js"
import chartReducer from "./chart.js"
import storage from 'redux-persist/lib/storage/session'
import thunk from 'redux-thunk';
import notificationReducer from './notification.js';

const presistAlertConfig = {
    key: 'alerts',
    storage,
}
const presistProfileConfig = {
    key: 'profile',
    storage,
}
const presistWatchlistConfig = {
    key: 'watchlist',
    storage,
}
const presistNotificationConfig = {
    key: 'notification',
    storage,
}

const presistProfileReducer = persistReducer(presistProfileConfig, profileReducer)
const presistAlertReducer = persistReducer(presistAlertConfig, alertReducer)
const presistWatchlistReducer = persistReducer(presistWatchlistConfig, watchlistReducer)
const presistNotificationReducer = persistReducer(presistNotificationConfig, notificationReducer)

export const store = configureStore({
  reducer: {
    alert: presistAlertReducer,
    profile: presistProfileReducer,
    watchlist: presistWatchlistReducer,
    chart: chartReducer,
    notification: presistNotificationReducer,
  },
  middleware: [thunk],
});

export const presistor = persistStore(store)
