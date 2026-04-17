import axios from "./axios.customize";
export const fetchAllRolesAPI = (page, limit) =>
  axios.get("/api/admin/roles", { params: { page, limit } });

export const createRoleAPI = (data) => axios.post("/api/admin/roles", data);

export const updateRoleAPI = (roleId, data) => {
  if (!roleId) throw new Error("role is required");
  return axios.put(`/api/admin/roles/${roleId}`, data);
};

export const deleteRoleAPI = (roleId) => {
  if (!roleId) throw new Error("roleId is required");
  return axios.delete(`/api/admin/roles/${roleId}`);
};
