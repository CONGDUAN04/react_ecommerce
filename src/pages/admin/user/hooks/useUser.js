import { createCrudHook } from "../../../../hooks/createCrudHook";
import {
  fetchAllUsersAPI,
  createUserAPI,
  updateUserAPI,
  deleteUserAPI,
} from "../../../../services/api.user";
export const useUser = createCrudHook({
  name: "Người dùng",
  apis: {
    getAll: fetchAllUsersAPI,
    create: createUserAPI,
    update: updateUserAPI,
    delete: deleteUserAPI,
  },
});
