/* eslint-disable no-empty-pattern */
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    current: null,
    token: null,
  },
  reducers: {
    register: (state, action) => {
      // console.log(action)
      state.isLoggedIn = action.payload.isLoggedIn;
      state.current = action.payload.userData;
      state.token = action.payload.token;
    },
    login: (state, action) => {
      // console.log(action)
      state.isLoggedIn = action.payload.isLoggedIn;
      state.current = action.payload.userData;
    },
  },

  //   // Code logic xử lý async action
  //   extraReducers: (builder) => {
  //     builder.addCase(action.getAllRooms.pending, (state) => {
  //       state.isLoading = true;
  //     });

  //     builder.addCase(action.getAllRooms.fulfilled, (state, action) => {
  //       state.isLoading = false;
  //       state.rooms = action.payload;
  //     });

  //     builder.addCase(action.getAllRooms.rejected, (state, action) => {
  //       state.isLoading = false;
  //       state.errorMessage = action.payload.message;
  //     });
  //   },
});

// // Action creators are generated for each case reducer function
export const { register, login } = userSlice.actions;

export default userSlice.reducer;
