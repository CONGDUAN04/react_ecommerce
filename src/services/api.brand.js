import axios from "./axios.customize";
import { buildFormData } from "../utils/formData.js";
export const fetchAllBrandsAPI = (page, limit) =>
  axios.get("/api/admin/brands", { params: { page, limit } });

export const createBrandAPI = (data) =>
  axios.post("/api/admin/brands", buildFormData(data));

export const updateBrandAPI = (brandId, data) => {
  if (!brandId) throw new Error("brandId is required");
  return axios.put(`/api/admin/brands/${brandId}`, buildFormData(data));
};

export const deleteBrandAPI = (brandId) => {
  if (!brandId) throw new Error("brandId is required");
  return axios.delete(`/api/admin/brands/${brandId}`);
};
