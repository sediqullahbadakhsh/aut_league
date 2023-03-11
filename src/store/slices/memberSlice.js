import { createSlice } from "@reduxjs/toolkit";
import {
  fetchMember,
  addMember,
  updateMember,
  removeMember,
} from "../thunks/memberThunk";

const teamSlice = createSlice({
  name: "members",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  extraReducers(builder) {
    builder.addCase(fetchMember.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchMember.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchMember.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(addMember.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addMember.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload);
    });
    builder.addCase(addMember.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(updateMember.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateMember.fulfilled, (state, action) => {
      state.isLoading = false;
      const updatedUserIndex = state.data.findIndex(
        (user) => user.id === action.payload.id
      );
      state.data[updatedUserIndex] = action.payload;
    });
    builder.addCase(updateMember.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(removeMember.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(removeMember.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = state.data.filter((user) => user.id !== action.payload.id);
    });
    builder.addCase(removeMember.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const memberReducer = teamSlice.reducer;
