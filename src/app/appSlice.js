import { createSlice } from "@reduxjs/toolkit";
import * as action from './asyncAction'

export const appSlice = createSlice({
  name: "app",
  initialState: {
    rooms: null,
    isLoading: false
  },
  reducers: {},

  // Code logic xử lý async action
  extraReducers: (builder) => {
    // Bắt đầu thực hiện action login (Promise pending)
    // builder.addCase(login.pending, (state) => {
    //   // Bật trạng thái loading
    //   state.isLoading = true;
    // });

    // Khi thực hiện action login thành công (Promise fulfilled)
    builder.addCase(action.getAllRooms.fulfilled, (state, action) => {
      // Tắt trạng thái loading, lưu thông tin user vào store
      state.isLoading = false;
      state.rooms = action.payload;
    });

    // Khi thực hiện action login thất bại (Promise rejected)
    builder.addCase(action.getAllRooms.rejected, (state, action) => {
      // Tắt trạng thái loading, lưu thông báo lỗi vào store
      state.isLoading = false;
      state.errorMessage = action.payload.message;
    });
  },
});
