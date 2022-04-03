import axios from "axios";
const API_URL = "http://localhost:5000/api/karyawan";

const axiosConfig = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const getAllKaryawan = async () => {
  const response = await axiosConfig.get();
  return response.data;
};

const karyawanService = {
  getAllKaryawan,
};
export default karyawanService;
