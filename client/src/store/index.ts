import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistReducer,
    persistStore,
} from 'redux-persist';
import authApi from "../api/auth";
import acountApi from "../api/acount";
import productApi from "../api/product";
const persistConfig = {
    key: 'root',
    storage,
    whitelist: []
}
const rootReducer = combineReducers({
   [authApi.reducerPath]:authApi.reducer,
   [acountApi.reducerPath]:acountApi.reducer,
   [productApi.reducerPath]:productApi.reducer
})
const middleware=[authApi.middleware,acountApi.middleware,productApi.middleware]
const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(middleware)
})
const persistor = persistStore(store);
export { store, persistor };



