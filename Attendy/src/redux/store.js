import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import searchReducer from "./search/searchSlice";
import geolocationReducer from "./geolocation/geolocationSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    geolocation: geolocationReducer
  },
});

export default store;
