"use client"
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import userReducer from "@/redux/reducerslices/userSlice";
import productReducer from "@/redux/reducerslices/productSlice";
import logger from 'redux-logger'
import storage from 'redux-persist/lib/storage'
import messageReducer  from "@/redux/reducerslices/messageSlice";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ['user','product'],
};

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  message: messageReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
});

export const persistor = persistStore(store);