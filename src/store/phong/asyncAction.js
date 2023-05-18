import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api";

export const getAllPhong = createAsyncThunk(
  "app/rooms",
  async (data, { rejectWithValue }) => {
    const response = await api.apiGetAllRoom();

    if (!response.success) return rejectWithValue(response);
    return response.data;
  }
);
