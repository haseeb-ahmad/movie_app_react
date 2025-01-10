import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './movieSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    user: userReducer,
  },
});
