import { createCrudHook } from "../../../../hooks/createCrudHook.js";
import {
  fetchAllCategoriesAPI,
  createCategoryAPI,
  updateCategoryAPI,
  deleteCategoryAPI,
} from "../../../../services/api.category.js";

export const useCategory = createCrudHook({
  name: "danh mục",
  apis: {
    getAll: fetchAllCategoriesAPI,
    create: createCategoryAPI,
    update: updateCategoryAPI,
    delete: deleteCategoryAPI,
  },
});
