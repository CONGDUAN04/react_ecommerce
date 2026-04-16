import { createCrudHook } from "../../../../hooks/createCrudHook.js";
import {
  fetchAllBrandsAPI,
  createBrandAPI,
  updateBrandAPI,
  deleteBrandAPI,
} from "../../../../services/api.brand.js";

export const useBrand = createCrudHook({
  name: "thương hiệu",
  apis: {
    getAll: fetchAllBrandsAPI,
    create: createBrandAPI,
    update: updateBrandAPI,
    delete: deleteBrandAPI,
  },
});
