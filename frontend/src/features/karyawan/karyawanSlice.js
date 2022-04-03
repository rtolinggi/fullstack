import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import karyawanService from "../../helper/karyawanService";

const initialState = {
  karyawan: null,
  isSuccess: false,
  isLoading: false,
  isError: false,
  message: "",
};

export const getKaryawan = createAsyncThunk(
  "karyawan/getKaryawan",
  async (arg, { rejectWithValue }) => {
    try {
      return await karyawanService.getAllKaryawan(arg);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

export const karyawanSlice = createSlice({
  name: "karyawan",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    //Register
    builder
      .addCase(getKaryawan.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getKaryawan.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.karyawan = payload;
      })
      .addCase(getKaryawan.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
        state.karyawan = null;
      });
  },
});

export default karyawanSlice;
