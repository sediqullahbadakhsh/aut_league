import { createSlice } from "@reduxjs/toolkit";
import { addTeamMember, removeTeamMember } from "../thunks/teamMemberThunk";

const teamMemberSlice = createSlice({
  name: "members",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  extraReducers(builder) {
    builder.addCase(addTeamMember.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addTeamMember.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload);
    });
    builder.addCase(addTeamMember.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    builder.addCase(removeTeamMember.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(removeTeamMember.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = state.data.filter((user) => user.id !== action.payload.id);
    });
    builder.addCase(removeTeamMember.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const teamMemberReducer = teamMemberSlice.reducer;
