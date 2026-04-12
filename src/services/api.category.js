import axios from "./axios.customize";
import { buildFormData } from "../utils/formData.js";
export const fetchAllCategoriesAPI = (page, limit) =>
  axios.get("/api/admin/categories", { params: { page, limit } });

export const createCategoryAPI = (data) =>
  axios.post("/api/admin/categories", buildFormData(data));

export const updateCategoryAPI = (categoryId, data) => {
  if (!categoryId) throw new Error("categoryId is required");
  return axios.put(`/api/admin/categories/${categoryId}`, buildFormData(data));
};

export const deleteCategoryAPI = (categoryId) => {
  if (!categoryId) throw new Error("categoryId is required");
  return axios.delete(`/api/admin/categories/${categoryId}`);
};
