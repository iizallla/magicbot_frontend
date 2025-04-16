import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [
    {
      id: 1,
      title: "Смартфоны и гаджеты",
      description: "<p>High-quality cotton hoodie with a modern fit.</p>",
      price: 49.99,
      items: 20,
      imagePreview:
        "https://humo.fra1.cdn.digitaloceanspaces.com/magicbot/demomarket/categories/N8l4FzruWRZNFL0ONEIPNI0jJXWdTWUbI6hqT002.jpg",
      videoUrl: null,
      profit: 15,
      margin: 33.3,
      taxable: true,
      date: [1, "Aprel", 2025],
    },
    {
      id: 2,
      title: "Аудио и аксессуары",
      description:
        "<p>Noise-canceling over-ear headphones with Bluetooth 5.0.</p>",
      price: 99.99,
      items: 15,
      imagePreview: "https://cdn1.ozone.ru/s3/multimedia-1-r/7132602483.jpg",
      videoUrl: null,
      profit: 30,
      margin: 33.3,
      taxable: true,
      date: [1, "Aprel", 2025],
    },
    {
      id: 3,
      title: "Ноутбуки и компьютеры",
      description:
        "<p>Track your health and fitness with this sleek smartwatch.</p>",
      price: 199.99,
      items: 10,
      imagePreview:
        "https://avatars.mds.yandex.net/i?id=2796348e6608eb7d4dee859fefa1ac27742c7374-10310276-images-thumbs&n=13",
      videoUrl: null,
      profit: 80,
      margin: 40,
      taxable: true,
      date: [1, "June", 2025],
    },
  ],
};

const categoriesSlice = createSlice({
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
  categoriesSlice.actions;
export default categoriesSlice.reducer;
