import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    list : [
        {
            title:"sdaf"
            
        }
    ]
}
const DeliveringSlice = createSlice({
    name: "Delivering",
    initialState,
    reducers: {
        addProduct: (state, action) => {
          state.list.push(action.payload);
        },
        updateProduct: (state, action) => {
            const index = state.list.findIndex((p) => p.id === action.payload.id);
            if (index !== -1) state.list[index] = action.payload;
          },
          deleteProduct: (state, action) => {
            state.list = state.list.filter((p) => p.id !== action.payload);
          },
        },
})
export const { addProduct, updateProduct, deleteProduct } =
  DeliveringSlice.actions;
export default DeliveringSlice.reducer;