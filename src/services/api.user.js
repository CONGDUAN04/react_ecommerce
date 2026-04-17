import axios from "./axios.customize";
import { buildFormData } from "../utils/formData.js";
export const fetchAllUsersAPI = () => axios.get("/api/admin/users");

export const createUserAPI = (data) =>
  axios.post("/api/admin/users", buildFormData(data));

export const updateUserAPI = (userId, data) => {
  if (!userId) throw new Error("userId is required");
  return axios.put(`/api/admin/users/${userId}`, buildFormData(data));
};

export const deleteUserAPI = (userId) => {
  if (!userId) throw new Error("userId is required");
  return axios.delete(`/api/admin/users/${userId}`);
};
