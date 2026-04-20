import axios from "./axios.customize";

export const fetchAllBrandsAPI = (page, limit) =>
  axios.get("/api/admin/brands", { params: { page, limit } });

export const createBrandAPI = (data) => axios.post("/api/admin/brands", data);

export const updateBrandAPI = (brandId, data) => {
  if (!brandId) throw new Error("brandId is required");
  return axios.put(`/api/admin/brands/${brandId}`, data);
};

export const deleteBrandAPI = (brandId) => {
  if (!brandId) throw new Error("brandId is required");
  return axios.delete(`/api/admin/brands/${brandId}`);
};
