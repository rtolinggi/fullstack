import axios from "axios";
const API_URL = "http://localhost:5000/api/users/";

const axiosConfig = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const register = async (userData) => {
  const response = await axiosConfig.post("register", userData);
  return response.data;
};

const login = async (userData) => {
  const response = await axiosConfig.post("login", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }
  return response.data;
};

const logout = async () => {
  const response = await axiosConfig.delete("logout");
  localStorage.removeItem("user");
  return response.data;
};

const authService = {
  register,
  login,
  logout,
};
export default authService;
