import { createSlice } from "@reduxjs/toolkit";
import { deleteFromWishlist, wishlistAssign } from "../actions";

const initialState = {
  favItem: [],
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addFav: (state, { payload }) => {
      if (!(state.favItem.filter((x) => x.id === payload.articleData.id).length > 0)) {
        let dataWish = {
          userId: payload.userId,
          articleId: payload.articleData.id
        }
        wishlistAssign(dataWish)
        state.favItem.push({ ...payload.articleData });
      }
    },
    removeFav: (state, { payload }) => {
      state.favItem = state.favItem.filter((x) => x.id !== payload.id);
      deleteFromWishlist(payload.wish)
    },
    getWishes: (state, { payload }) => {
      state.favItem = payload || [];
    },
  },
});

export const { addFav, removeFav, getWishes } = favoriteSlice.actions;
export default favoriteSlice.reducer;
