import { createAsyncThunk } from "@reduxjs/toolkit";
import { loaiphong as api } from "../../api";

export const apiGetAllLoaiPhong = createAsyncThunk(
  "app/loaiphong",
  async (data, { rejectWithValue }) => {
    const response = await api.apiGetAllLoaiPhong();

    if (!response.success) return rejectWithValue(response);
    return response.data;
  }
);
