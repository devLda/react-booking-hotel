/* eslint-disable no-empty-pattern */
import { createSlice } from "@reduxjs/toolkit";
import * as action from "./asyncAction";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    rooms: null,
    isLoading: false,
    statusPhong: "pending",
  },
  reducers: {},

  // Code logic xử lý async action
  extraReducers: (builder) => {
    builder.addCase(action.getAllRooms.pending, (state) => {
      state.isLoading = true;
      state.statusPhong = "pending";
    });

    builder.addCase(action.getAllRooms.fulfilled, (state, action) => {
      state.isLoading = false;
      state.statusPhong = "resolved";
      state.rooms = action.payload;
    });

    builder.addCase(action.getAllRooms.rejected, (state, action) => {
      state.isLoading = false;
      state.statusPhong = "rejected";
      state.errorMessage = action.payload.message;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = appSlice.actions;

export default appSlice.reducer;
