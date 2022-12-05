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
      localStorage.setItem('darkMode', state.darkMode);
    },
    dark: (state) => {
      state.darkMode = true;
      localStorage.setItem('darkMode', state.darkMode);
    },
    toggle: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('darkMode', state.darkMode);
    },
    persist: (state, {payload}) => {
      state.darkMode = payload;
    }
  },
});

export const { light, dark, toggle, persist } = darkmodeSlice.actions;
export default darkmodeSlice.reducer;
