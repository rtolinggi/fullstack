import { configureStore } from "@reduxjs/toolkit";
import dashboardSlice from "../features/dashboard/dashboardSlice";
import { karyawanSlice } from "../features/karyawan/karyawanSlice";
import tokenSlice from "../features/token/tokenSlice";
import authSlice from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    token: tokenSlice.reducer,
    dashboard: dashboardSlice.reducer,
    karyawan: karyawanSlice.reducer,
  },
});
