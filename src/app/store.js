// import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/Products";
import categories from "../features/categories/Categories";
import filialReducer from "../features/filial/Filial";
import promocodesReducer from "../features/promocodes/promocodesSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categories,
    filial: filialReducer,
    promocodes: promocodesReducer,
  },
});

export default store;
