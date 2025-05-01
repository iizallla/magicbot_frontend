// import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/Products";
import categories from "../features/categories/Categories";
import { configureStore } from "@reduxjs/toolkit";
import DeliveringSlice from "../features/sliceDelivering/deliveringSlice"

const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categories,
    delivering :  DeliveringSlice,
  },
});

export default store;
