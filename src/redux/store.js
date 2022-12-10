import { configureStore } from "@reduxjs/toolkit";
import articles from "./slices/articlesSlice";
import cart from "./slices/cartSlice";
import details from "./slices/detailSlice";
import favorite from "./slices/favoriteSlice";
import windows from "./slices/windowSlice";
import darkmode from './slices/darkmodeSlice'
import user from './slices/userSlice';
import panel from './slices/adminPanel';

export default configureStore({
  reducer: {
    articles,
    cart,
    details,
    favorite,
    windows,
    darkmode,
    user,
    panel
  },
});
