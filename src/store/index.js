import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/userSlice";
import { teamReducer } from "./slices/teamSlice";
import { memberReducer } from "./slices/memberSlice";
import { teamMemberReducer } from "./slices/teamMemberSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    teams: teamReducer,
    members: memberReducer,
    teamMembers: teamMemberReducer,
  },
});
