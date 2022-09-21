import axios from "axios";

export const api = axios.create({
  baseURL: "https://cash-n-carry-store-backend.herokuapp.com/api/v1",
});
