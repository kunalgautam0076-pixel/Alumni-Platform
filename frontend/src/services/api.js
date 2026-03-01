import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

// 🔥 Attach token on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  console.log("TOKEN FROM LOCALSTORAGE:", token); // debug

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;