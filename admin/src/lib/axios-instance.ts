import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api/admin",
});

axiosClient.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosClient;
