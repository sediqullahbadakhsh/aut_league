import { createSlice } from "@reduxjs/toolkit";
import { login, addUser, logout } from "../thunks/userThunk";

const userSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  extraReducers(builder) {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(addUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload);
    });
    builder.addCase(addUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(logout.fulfilled, (state) => {
      state.isLoading = false;
    });

    builder.addCase(logout.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const userReducer = userSlice.reducer;
