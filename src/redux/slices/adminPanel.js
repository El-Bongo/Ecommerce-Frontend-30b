import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  usersDeleted: [],
  user: {}
};

const adminPanelSlice = createSlice({
  name: "adminPanel",
  initialState,
  reducers: {
    getUsers: (state, { payload }) => {
      state.users = payload.usuarios
      state.usersDeleted = payload.deletedUsers
    },
    getUser: (state, { payload }) => {
      state.user = payload
    },
    deleteDelete: (state, { payload }) => {
      state.users.forEach((user) => {
        if(user.id === payload){
          user.deletedAt = new Date().toString();
        }
      })
    },
    restore: (state, { payload }) => {
      state.usersDeleted.forEach((article) => {
        if(article.id === payload){
          article.deletedAt = null;
        }
      })
    },
  },
});

export const {getUsers, getUser, deleteDelete, restore} = adminPanelSlice.actions;
export default adminPanelSlice.reducer;
