// import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/Products";
import categories from "../features/categories/Categories";
import filialReducer from "../features/filial/Filial";
import promocodesReducer from "../features/promocodes/promocodesSlice";
import authReducer from "../features/auth/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categories,
    filial: filialReducer,
    promocodes: promocodesReducer,
    auth: authReducer,
  },
});
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

export default store;
