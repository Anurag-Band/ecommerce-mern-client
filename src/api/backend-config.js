import axios from "axios";

const api = axios.create({
  baseURL: "https://cash-n-carry-store-backend.herokuapp.com/api/v1",
});

export default api;
