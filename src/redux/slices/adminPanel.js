import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  user: {}
};

const adminPanelSlice = createSlice({
  name: "adminPanel",
  initialState,
  reducers: {
    getUsers: (state, { payload }) => {
      state.users = payload
    },
    getUser: (state, { payload }) => {
      state.user = payload
    },
  },
});

export const {getUsers, getUser} = adminPanelSlice.actions;
export default adminPanelSlice.reducer;
