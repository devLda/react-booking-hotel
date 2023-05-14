/* eslint-disable no-empty-pattern */
import { createSlice } from "@reduxjs/toolkit";
import * as action from "./asyncAction";

export const loaiphongSlice = createSlice({
  name: "loaiphong",
  initialState: {
    loaiphong: null,
    isLoading: false,
    status: "pending",
  },
  reducers: {},

  // Code logic xử lý async action
  extraReducers: (builder) => {
    builder.addCase(action.apiGetAllLoaiPhong.pending, (state) => {
      state.isLoading = true;
      state.status = "pending";
    });

    builder.addCase(action.apiGetAllLoaiPhong.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = "resolved";
      state.loaiphong = action.payload;
    });

    builder.addCase(action.apiGetAllLoaiPhong.rejected, (state, action) => {
      state.isLoading = false;
      state.status = "rejected";
      state.errorMessage = action.payload.message;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = loaiphongSlice.actions;

export default loaiphongSlice.reducer;
