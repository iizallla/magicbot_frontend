// api/authApi.js
import axios from "axios";

const API_URL = "https://yourapi.com/api"; // Replace with your actual endpoint

export const registerUser = async (data) => {
  const response = await axios.post(`${API_URL}/register`, data);
  return response.data;
};
