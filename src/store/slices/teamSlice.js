import { createSlice } from "@reduxjs/toolkit";
import {
  fetchTeam,
  addTeam,
  updateTeam,
  removeTeam,
} from "../thunks/teamThunk";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

const isPendingAction = (action) => action.type.endsWith("/pending");
const isFulfilledAction = (action) => action.type.endsWith("/fulfilled");
const isRejectedAction = (action) => action.type.endsWith("/rejected");

const teamSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addMatcher(isPendingAction, (state) => {
        state.isLoading = true;
      })
      .addMatcher(isFulfilledAction, (state, action) => {
        state.isLoading = false;
        switch (action.type) {
          case fetchTeam.fulfilled.type:
            state.data = action.payload;
            break;
          case addTeam.fulfilled.type:
            state.data.push(action.payload);
            break;
          case updateTeam.fulfilled.type:
            const updatedUserIndex = state.data.findIndex(
              (user) => user.id === action.payload.id
            );
            state.data[updatedUserIndex] = action.payload;
            break;
          case removeTeam.fulfilled.type:
            state.data = state.data.filter(
              (user) => user.id !== action.payload.id
            );
            break;
          default:
            break;
        }
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export const teamReducer = teamSlice.reducer;
