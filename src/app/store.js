import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";
import categories from "../features/categories/Categories";

const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categories,
  },
});

export default store;
