import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInterceptors';

export const loginUser = createAsyncThunk('user/loginUser', async (data) => {
  try {
    const response = await axiosInstance.post(`/users/sign_in`, data);
   
    return response.data; // This could return user data and token
  } catch (error) {
    throw new Error(error.response ? error.response.data.error : 'Login failed');
  }
});

// Updated logoutUser action with server-side logout (axios.delete)
export const logoutUser = createAsyncThunk('user/logoutUserAsync', async () => {
  try {
    // Optionally, make a request to the server to invalidate the session or token
  
      await axiosInstance.delete(`/users/sign_out`);

    // Clear local storage after logging out from the server
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    window.location.href = "/"
    return; // Return null or some value if needed
  } catch (error) {
    console.error('Error during logout:', error);
  }
});


// User Slice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    status: 'idle', // 'loading' | 'succeeded' | 'failed'
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
        localStorage.setItem('token', action.payload.token); // Save token in localStorage
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
        state.status = 'idle'; // Reset status to idle after logout
      });
  },
});

export default userSlice.reducer;
