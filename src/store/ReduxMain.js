/* eslint-disable no-undef */
import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './cartReducer'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// const stripe = require('stripe')('sk_test_51QAC6P07G9XG7AOiA2H292Y2ggJ7q6ZtVCELGXZiFstiG70ABFAZlO8k6HbiQP8WUX4CGXbJdTHBpAvSqGldw6fn00j9Bi9ofw');

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, cartSlice);

export const store = configureStore({
  reducer: {
    cart: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);