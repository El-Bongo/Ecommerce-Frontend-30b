import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviewList: {
    reviews: [],
  },
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    getAllReviews: (state, { payload }) => {
      state.reviewList.reviews = payload.Reviews;
    },
  },
});

export const { getAllReviews } = reviewsSlice.actions;
export default reviewsSlice.reducer;
