import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import tokenService from "../../helper/tokenService";

const initialState = {
  token: null,
  isSuccess: false,
  isLoading: false,
  isError: false,
  message: "",
};

export const getToken = createAsyncThunk(
  "token/refreshToken",
  async (arg, { rejectWithValue }) => {
    try {
      return await tokenService.getToken(arg);
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

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    resetToken: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getToken.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.token = payload;
      })
      .addCase(getToken.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
        state.token = null;
      });
  },
});

export const { resetToken } = tokenSlice.actions;
export default tokenSlice;
