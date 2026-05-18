'use client'
import { combineReducers, configureStore, Tuple } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import userReducer from "@/redux/reducerslices/userSlice";
import productReducer from "@/redux/reducerslices/productSlice";
import logger from 'redux-logger'
import storage from 'redux-persist/lib/storage'
const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware:()=>new Tuple(logger)
});

export const persistor = persistStore(store);