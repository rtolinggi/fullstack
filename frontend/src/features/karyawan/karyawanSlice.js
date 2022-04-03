import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import karyawanService from "../../helper/karyawanService";

const initialState = {
  data: [],
  isSuccess: false,
  isLoading: false,
};

export const getKaryawan = createAsyncThunk(
  "karyawan/getKaryawan",
  async (arg, { rejectWithValue }) => {
    try {
      const response = await karyawanService.getAllKaryawan();
      const result = await response.data;
      return result;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

export const karyawanSlice = createSlice({
  name: "karyawan",
  initialState,
  reducers: {},
  extraReducers: {
    [getKaryawan.pending]: (state, { payload }) => {
      state.data = [];
      state.isSuccess = false;
      state.isLoading = true;
    },
    [getKaryawan.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.isSuccess = true;
      state.isLoading = false;
    },
    [getKaryawan.rejected]: (state, { payload }) => {
      state.data = [];
      state.isSuccess = false;
      state.isLoading = false;
    },
  },
});

export default karyawanSlice;
