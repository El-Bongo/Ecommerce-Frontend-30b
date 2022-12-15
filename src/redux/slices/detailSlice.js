import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  detailedArticle: {
    id: 0,
    images: [],
    category: { name: "" },
  },
};

const detailSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    insertDataDetails: (state, { payload }) => {
      state.detailedArticle = payload;
    },
    cleanDetails: (state) => {
      state.detailedArticle = {
        images: [],
        category: { name: "" },
      };
    },
  },
});

export const { insertDataDetails, cleanDetails } = detailSlice.actions;
export default detailSlice.reducer;
