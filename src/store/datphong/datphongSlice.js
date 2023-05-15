/* eslint-disable no-empty-pattern */
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isBooked: false,
    dataBook: null,
  },
  reducers: {
    create: (state, action) => {
      console.log(action);
    },
  },
});

// // Action creators are generated for each case reducer function
export const { register } = userSlice.actions;

export default userSlice.reducer;
