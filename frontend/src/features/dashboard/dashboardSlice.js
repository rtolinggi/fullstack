import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSidebar: false,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    closeSidebar: (state) => {
      state.showSidebar = false;
    },
    openSidebar: (state) => {
      state.showSidebar = true;
    },
  },
});

export const { closeSidebar, openSidebar } = dashboardSlice.actions;
export default dashboardSlice;
