import { createCrudHook } from "../../../../hooks/createCrudHook";
import {
  fetchAllUsersAPI,
  createUserAPI,
  updateUserAPI,
  deleteUserAPI,
  updateUserStatusAPI,
} from "../../../../services/api.user";

import { useApi } from "../../../../hooks/useApi";
import { useContext, useCallback } from "react";
import { NotifyContext } from "../../../../contexts/notify.context";
import { handleApiSuccess, handleApiError } from "../../../../utils/apiHandler";

export const useUser = () => {
  const crud = createCrudHook({
    name: "Người dùng",
    apis: {
      getAll: fetchAllUsersAPI,
      create: createUserAPI,
      update: updateUserAPI,
      delete: deleteUserAPI,
    },
  })();

  const { callApi } = useApi();
  const { api } = useContext(NotifyContext);

  const updateStatus = useCallback(
    (id, data) => {
      return callApi(() => updateUserStatusAPI(id, data))
        .then((res) => {
          handleApiSuccess(
            api,
            res?.message || "Cập nhật trạng thái người dùng thành công",
          );
          return res;
        })
        .catch((err) => {
          handleApiError(api, err);
        });
    },
    [callApi, api],
  );

  return {
    ...crud,
    updateStatus,
  };
};
