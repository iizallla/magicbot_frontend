import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [
    {
      id: 1,
      title: "Premium Hoodie",
      description: "<p>High-quality cotton hoodie with a modern fit.</p>",
      price: 49.99,
      items: 20,
      imagePreview:
        "https://avatars.mds.yandex.net/i?id=180fb5e58a8e3b77a43379104a8a97f7_l-8386641-images-thumbs&n=13",
      videoUrl: null,
      salePrice: 45,
      comparePrice: 55,
      costPrice: 30,
      profit: 15,
      margin: 33.3,
      taxable: true,
    },
    {
      id: 2,
      title: "Wireless Headphones",
      description:
        "<p>Noise-canceling over-ear headphones with Bluetooth 5.0.</p>",
      price: 99.99,
      items: 15,
      imagePreview: "https://cdn1.ozone.ru/s3/multimedia-1-r/7132602483.jpg",
      videoUrl: null,
      salePrice: 90,
      comparePrice: 120,
      costPrice: 60,
      profit: 30,
      margin: 33.3,
      taxable: true,
    },
    {
      id: 3,
      title: "Smart Watch",
      description:
        "<p>Track your health and fitness with this sleek smartwatch.</p>",
      price: 199.99,
      items: 10,
      imagePreview:
        "https://avatars.mds.yandex.net/i?id=102abc88f489c55bdc2f8344d903b3b6a45c1cb8-5865731-images-thumbs&n=13",
      videoUrl: null,
      salePrice: 180,
      comparePrice: 220,
      costPrice: 100,
      profit: 80,
      margin: 40,
      taxable: true,
    },
  ],
};

const productsSlice = createSlice({
  name: "products",
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
});

export const { addProduct, updateProduct, deleteProduct } =
  productsSlice.actions;
export default productsSlice.reducer;
