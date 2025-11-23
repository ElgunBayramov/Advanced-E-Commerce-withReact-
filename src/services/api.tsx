import axios from "axios"

const axiosInstance = axios.create({
    baseURL: 'https://advanced-e-commerce-xq16.onrender.com',
  });

export default axiosInstance;