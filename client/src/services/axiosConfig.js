import axios from "axios";

export const API_URL = "http://localhost:9000";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json"
  }
});

export const get = axiosInstance.get;
export const post = axiosInstance.post;
export const patch = axiosInstance.patch;
export const remove = axios.delete;

export default axiosInstance;
