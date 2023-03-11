import { createSlice } from "@reduxjs/toolkit";
import {
  fetchTeam,
  addTeam,
  updateTeam,
  removeTeam,
} from "../thunks/teamThunk";

const teamSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  extraReducers(builder) {
    builder.addCase(fetchTeam.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTeam.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchTeam.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(addTeam.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addTeam.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload);
    });
    builder.addCase(addTeam.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(updateTeam.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateTeam.fulfilled, (state, action) => {
      state.isLoading = false;
      const updatedUserIndex = state.data.findIndex(
        (user) => user.id === action.payload.id
      );
      state.data[updatedUserIndex] = action.payload;
    });
    builder.addCase(updateTeam.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(removeTeam.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(removeTeam.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = state.data.filter((user) => user.id !== action.payload.id);
    });
    builder.addCase(removeTeam.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const teamReducer = teamSlice.reducer;
