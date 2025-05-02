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
    {
      id: 4,
      title: "Leather Backpack",
      description:
        "<p>Stylish and durable leather backpack for everyday use.</p>",
      price: 89.99,
      items: 8,
      imagePreview:
        "https://images.unsplash.com/photo-1606813905267-599a67f51d6f",
      videoUrl: null,
      salePrice: 80,
      comparePrice: 100,
      costPrice: 50,
      profit: 30,
      margin: 37.5,
      taxable: true,
    },
    {
      id: 5,
      title: "Running Shoes",
      description:
        "<p>Comfortable and lightweight shoes for running enthusiasts.</p>",
      price: 129.99,
      items: 12,
      imagePreview:
        "https://images.unsplash.com/photo-1580713609326-63fbb6c6c1f0",
      videoUrl: null,
      salePrice: 120,
      comparePrice: 140,
      costPrice: 70,
      profit: 50,
      margin: 41.7,
      taxable: true,
    },
    {
      id: 6,
      title: "Fitness Tracker",
      description: "<p>Monitor your activities and health stats 24/7.</p>",
      price: 59.99,
      items: 18,
      imagePreview:
        "https://images.unsplash.com/photo-1598970434795-0c54fe7c0642",
      videoUrl: null,
      salePrice: 55,
      comparePrice: 70,
      costPrice: 35,
      profit: 20,
      margin: 36.4,
      taxable: true,
    },
    {
      id: 7,
      title: "Wireless Charger",
      description:
        "<p>Fast wireless charging pad compatible with most devices.</p>",
      price: 39.99,
      items: 25,
      imagePreview:
        "https://images.unsplash.com/photo-1572874889789-5f91ac50aa25",
      videoUrl: null,
      salePrice: 35,
      comparePrice: 45,
      costPrice: 20,
      profit: 15,
      margin: 42.9,
      taxable: true,
    },
    {
      id: 8,
      title: "Bluetooth Speaker",
      description:
        "<p>Portable Bluetooth speaker with rich bass and clear sound.</p>",
      price: 79.99,
      items: 14,
      imagePreview:
        "https://images.unsplash.com/photo-1585386959984-a4155228e230",
      videoUrl: null,
      salePrice: 75,
      comparePrice: 90,
      costPrice: 45,
      profit: 30,
      margin: 40,
      taxable: true,
    },
    {
      id: 9,
      title: "Sunglasses",
      description: "<p>Stylish polarized sunglasses with UV protection.</p>",
      price: 29.99,
      items: 30,
      imagePreview:
        "https://images.unsplash.com/photo-1581597131730-11b9a4d09f42",
      videoUrl: null,
      salePrice: 25,
      comparePrice: 35,
      costPrice: 15,
      profit: 10,
      margin: 40,
      taxable: true,
    },
    {
      id: 10,
      title: "Travel Mug",
      description:
        "<p>Insulated mug to keep your drinks hot or cold on the go.</p>",
      price: 24.99,
      items: 22,
      imagePreview:
        "https://images.unsplash.com/photo-1616085362409-bd73c42fb3b2",
      videoUrl: null,
      salePrice: 22,
      comparePrice: 30,
      costPrice: 12,
      profit: 10,
      margin: 45.5,
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
