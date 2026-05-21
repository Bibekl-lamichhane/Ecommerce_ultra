"use client"
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import userReducer from "@/redux/reducerslices/userSlice";
import productReducer from "@/redux/reducerslices/productSlice";
import themeReducer from "@/redux/reducerslices/themeSlice";
import logger from 'redux-logger'
import storage from 'redux-persist/lib/storage'
const persistConfig = {
  key: "root",
  storage,
  whitelist: ['user','product','theme'],
};

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  theme: themeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
});

export const persistor = persistStore(store);