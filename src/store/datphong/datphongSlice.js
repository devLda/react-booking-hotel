/* eslint-disable no-empty-pattern */
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "datphong",
  initialState: {
    isBooked: "pending",
    dataBook: null,
  },
  reducers: {
    create: (state, action) => {
      console.log(action);
      state.isBooked = "resolved";
      state.dataBook = action.payload;
    },
  },
});

// // Action creators are generated for each case reducer function
export const { create } = userSlice.actions;

export default userSlice.reducer;
