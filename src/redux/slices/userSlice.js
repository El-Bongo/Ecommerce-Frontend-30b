import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    email: "email",
    nickname: "Username",
    id: 0,
    role: "client",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    inputUserData: (state, { payload }) => {
      if (payload) state.data = payload;
      else state = initialState;
    },
  },
});

export const { inputUserData } = userSlice.actions;
export default userSlice.reducer;
