import axios from "axios";

const api = axios.create({
  baseURL: "https://mern-ecommerce-server.onrender.com/api/v1",
});

export default api;
