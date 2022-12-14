import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviewList: {
    reviews: [],
    selectedReview: {},
  },
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    getArticleReviews: (state, { payload }) => {
      state.reviewList.reviews = payload.Reviews;

    },
    getAllArticlesReviews: (state, { payload }) => {
      state.reviewList.reviews = payload.AllReviews;

    },
  }},
);


export const { getAllArticlesReviews, getArticleReviews } = reviewsSlice.actions;
export default reviewsSlice.reducer;
