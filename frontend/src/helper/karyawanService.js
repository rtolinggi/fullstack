import axios from "axios";
const API_URL = "http://localhost:5000/api/karyawan";

const axiosConfig = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const getAllKaryawan = async (config) => {
  const response = await axiosConfig.get("/", config);
  return response.data;
};
const deleteKaryawan = async (config) => {
  const response = await axiosConfig.delete("/", config);
  return response.data;
};

const karyawanService = {
  getAllKaryawan,
  deleteKaryawan,
};
export default karyawanService;
