import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false,
};

const darkmodeSlice = createSlice({
  name: "darkmode",
  initialState,
  reducers: {
    light: (state) => {
      state.darkMode = false;
    },
    dark: (state) => {
      state.darkMode = true;
    },
    toggle: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { light, dark, toggle } = darkmodeSlice.actions;
export default darkmodeSlice.reducer;
