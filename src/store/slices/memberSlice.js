import { createSlice } from "@reduxjs/toolkit";
import {
  fetchMember,
  addMember,
  updateMember,
  removeMember,
} from "../thunks/memberThunk";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

const isPendingAction = (action) => action.type.endsWith("/pending");
const isFulfilledAction = (action) => action.type.endsWith("/fulfilled");
const isRejectedAction = (action) => action.type.endsWith("/rejected");

const teamSlice = createSlice({
  name: "members",
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
          case fetchMember.fulfilled.type:
            state.data = action.payload;
            break;
          case addMember.fulfilled.type:
            state.data.push(action.payload);
            break;
          case updateMember.fulfilled.type:
            const updatedUserIndex = state.data.findIndex(
              (user) => user.id === action.payload.id
            );
            state.data[updatedUserIndex] = action.payload;
            break;
          case removeMember.fulfilled.type:
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

export const memberReducer = teamSlice.reducer;
