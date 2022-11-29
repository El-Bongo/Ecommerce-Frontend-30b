import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  innerWidth: window.innerWidth,
  innerHeight: window.innerHeight
}

const windowSlice = createSlice({
  name: 'windows',
  initialState,
  reducers: {
    addWidthAndHeight: (state, {payload}) => {
      state.innerHeight = payload.innerHeight;
      state.innerWidth = payload.innerWidth;
    }
  }
})


export const { addWidthAndHeight } = windowSlice.actions;
export default windowSlice.reducer;