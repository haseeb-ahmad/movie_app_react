import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInterceptors';

export const loginUser = createAsyncThunk('user/loginUser', async (data) => {
  try {
    const response = await axiosInstance.post(`/users/sign_in`, data);
    return response.data; 
  } catch (error) {
    throw new Error(error.response ? error.response.data.error : 'Login failed');
  }
});

export const logoutUser = createAsyncThunk('user/logoutUserAsync', async () => {
  try {
    await axiosInstance.delete(`/users/sign_out`);
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    window.location.href = "/"
    return;
  } catch (error) {
    console.error('Error during logout:', error);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    status: 'idle', 
    error: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        localStorage.setItem('token', action.payload.token); 
        state.isLoading = false
        window.location.href = "/movies"
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.isLoading = false
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.status = 'idle'; 
      });
  },
});

export default userSlice.reducer;
