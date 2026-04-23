import axios from "./axios.customize";
export const fetchAllUsersAPI = () => axios.get("/api/admin/users");

export const createUserAPI = (data) => axios.post("/api/admin/users", data);

export const updateUserAPI = (userId, data) => {
  if (!userId) throw new Error("userId is required");
  return axios.put(`/api/admin/users/${userId}`, data);
};

export const deleteUserAPI = (userId) => {
  if (!userId) throw new Error("userId is required");
  return axios.delete(`/api/admin/users/${userId}`);
};

export const updateUserStatusAPI = (userId, data) => {
  if (!userId) throw new Error("userId is required");
  return axios.patch(`/api/admin/users/${userId}/status`, data);
};
