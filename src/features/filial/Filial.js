import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  list: [
    {
      id: 1,
      name: "Novza",
      address: "Yunusobod",
      city: "Tashkent",
      status: "active",
    },
  ],
};
const filialReducer = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addFilial: (state, action) => {
      state.list.push(action.payload);
    },
    updateFilial: (state, action) => {
      const index = state.list.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.list[index] = {
          ...state.list[index],
          ...action.payload,
        };
      }
    },
    updateProduct: (state, action) => {
      const index = state.list.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.list[index] = {
          ...state.list[index],
          ...action.payload,
        };
      }
    },
    deleteFilial: (state, action) => {
      state.list = state.list.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addFilial, updateFilial, updateProduct, deleteFilial } =
  filialReducer.actions;
export default filialReducer.reducer;
