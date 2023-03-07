import { configureStore } from "@reduxjs/toolkit";
// import { customerReducer } from "../store/slices/customerSlice";

export const store = configureStore({
  reducer: {
    // customers: customerReducer,
  },
});
