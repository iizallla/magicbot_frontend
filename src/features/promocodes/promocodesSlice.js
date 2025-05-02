import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  list: [
    {
      id: uuidv4(),
      code: "WELCOME10",
      discountType: "percent",
      discountValue: 10,
      usageLimit: 1,
      client: "",
      startDate: null,
      endDate: null,
      status: "active",
    },
  ],
};

const promocodesSlice = createSlice({
  name: "promocodes",
  initialState,
  reducers: {
    addPromocode: (state, action) => {
      state.list.push({ id: uuidv4(), ...action.payload });
    },
    updatePromocode: (state, action) => {
      const index = state.list.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...action.payload };
      }
    },
    deletePromocode: (state, action) => {
      state.list = state.list.filter((p) => p.id !== action.payload);
    },
  },
});

export const { addPromocode, updatePromocode, deletePromocode } =
  promocodesSlice.actions;

export default promocodesSlice.reducer;
