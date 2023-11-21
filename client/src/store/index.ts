import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import authApi from "../api/auth";
import acountApi from "../api/acount";
import productApi from "../api/product";
import cartApi from "../api/cart";
import orderApi from "../api/order";
import addressApi from "../api/address";
import commentApi from "../api/comment";
const persistConfig = {
  key: "root",
  storage,
  whitelist: [],
};
const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [acountApi.reducerPath]: acountApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [cartApi.reducerPath]: cartApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [addressApi.reducerPath]: addressApi.reducer,
  [commentApi.reducerPath]: commentApi.reducer,
});
const middleware = [
  authApi.middleware,
  acountApi.middleware,
  productApi.middleware,
  cartApi.middleware,
  orderApi.middleware,
  addressApi.middleware,
  commentApi.middleware,
];
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middleware),
});
const persistor = persistStore(store);
export { store, persistor };
