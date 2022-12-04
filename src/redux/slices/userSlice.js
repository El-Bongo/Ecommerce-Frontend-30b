import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    email: "email",
    nickname: "Nickname",
    id: 0,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    inputUserData: (state, { payload }) => {
      state.data = payload || [];
    },
  },
});

export const { inputUserData } = userSlice.actions;
export default userSlice.reducer;
