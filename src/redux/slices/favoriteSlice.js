import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favItem: [],
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addFav: (state, { payload })=>{
      if (!(state.favItem.filter((x) => x.id === payload.id).length > 0)) {
        state.favItem.push({ ...payload});
        window.localStorage.setItem("favorite", JSON.stringify(state.favItem));
      }
    },
    removeFav: (state, { payload })=>{
      state.favItem = state.favItem.filter((x) => x.id !== payload);
      window.localStorage.setItem("favorite", JSON.stringify(state.favItem));
    },
  },
});

export const {addFav, removeFav} =
  favoriteSlice.actions;
export default favoriteSlice.reducer;