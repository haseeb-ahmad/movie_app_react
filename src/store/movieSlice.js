import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../api/axiosInterceptors"

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async ({currentPage, itemsPerPage}) => {
  const response = await axiosInstance.get(`api/v1/movies?page=${currentPage}&per_page=${itemsPerPage}`);
  return response.data; 
});

export const addMovie = createAsyncThunk('movies/addMovie', async (movieData) => {
  const response = await axiosInstance.post(`api/v1/movies`, movieData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
});

export const updateMovie = createAsyncThunk('movies/updateMovie', async ({ movie, id }) => {
  const response = await axiosInstance.put(`api/v1/movies/${id}`, movie, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
});

export const fetchMovieById = createAsyncThunk('movies/fetchMovieById', async (id) => {
  const response = await axiosInstance.get(`api/v1/movies/${id}`);
  return response.data; 
});

export const deleteMovie = createAsyncThunk('movies/deleteMovie', async (movieId) => {
  await axiosInstance.delete(`api/v1/movies/${movieId}`);
  return movieId; 
});

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    movie: {
      title: "",
      publishing_year: "",
      video: ""
    },
    meta: {},
    status: 'idle', 
    error: null,
    isLoading: false,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload.movies;
        state.meta = action.payload.meta
        state.isLoading = false
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.isLoading = false
      })
      .addCase(addMovie.pending, (state) => {
        state.isLoading = true
        state.status = 'loading';
      })
      .addCase(addMovie.fulfilled, (state) => {
        state.status = 'succeeded';
        state.isLoading = false
        window.location.href = "/movies"
      })
      .addCase(addMovie.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.isLoading = false
      })
      .addCase(updateMovie.pending, (state) => {
        state.isLoading = true
        state.status = 'loading';
      })
      .addCase(updateMovie.fulfilled, (state) => {
        state.status = 'succeeded';
        state.isLoading = false
        window.location.href = "/movies"
      })
      .addCase(updateMovie.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.isLoading = false
      })
      .addCase(fetchMovieById.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movie = action.payload.movie; 
        state.isLoading = false
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.isLoading = false
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.movies = state.movies.filter((movie) => movie.id !== action.payload);
      });
  },
});

export default movieSlice.reducer;
