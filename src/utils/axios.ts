import axios from "axios";
import { LocalStorageKey } from "./localStorage.service";

const httpClient = axios.create({
  baseURL: 'http://localhost:5202/api',
  headers: {
    "Content-Type": "application/json",
  }
})

httpClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem(LocalStorageKey.TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    }
    return config;
  }, error => {
    return Promise.reject(error);
  }
);

export { httpClient };