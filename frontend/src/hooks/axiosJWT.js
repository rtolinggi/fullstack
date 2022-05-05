import axios from "axios";

const API_URL_TOKEN = "http://localhost:5000/api/users/token";

const axiosJWT = axios.create();
axiosJWT.interceptors.request.use(
  async (config) => {
    config.baseURL = config.API_URL;
    config.withCredentials = true;
    const currentDate = new Date();
    if (config.expire * 1000 < currentDate.getTime()) {
      const response = await axios.get(API_URL_TOKEN);
      console.log(response.data);
      config.headers.Authorization = `Bearer ${response.data.token}`;
      return config;
    }
    config.headers.Authorization = `Bearer ${config.token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosJWT;
