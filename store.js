// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import someReducer from './someReducer'; // Ensure this path matches the filename

const store = configureStore({
  reducer: {
    widgets: someReducer // Key here is 'widgets' to match the slice of state in your app
  },
});

export default store;
