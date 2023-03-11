import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/userSlice";
import { teamReducer } from "./slices/teamSlice";
import { memberReducer } from "./slices/memberSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    teams: teamReducer,
    members: memberReducer,
  },
});

export * from "./thunks/userThunk";
export * from "./thunks/teamThunk";
export * from "./thunks/memberThunk";
