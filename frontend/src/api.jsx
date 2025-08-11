import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // match your backend port
});

export const googleauth = (code) => api.get(`/api/v1/user/google?code=${code}`);
