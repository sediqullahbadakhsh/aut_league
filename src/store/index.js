import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/userSlice";
import { teamApi } from "./slices/teamApi";
import { teamMemberApi } from "./slices/teamMeberApi";
import { memberApi } from "./slices/memberApi";

export const store = configureStore({
  reducer: {
    users: userReducer,
    [teamApi.reducerPath]: teamApi.reducer,
    [teamMemberApi.reducerPath]: teamMemberApi.reducer,
    [memberApi.reducerPath]: memberApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    teamApi.middleware,
    teamMemberApi.middleware,
    memberApi.middleware,
  ],
});
