import { useContext, useCallback, useMemo } from "react";
import { useApi } from "./useApi";
import { NotifyContext } from "../contexts/notify.context";
import { handleApiSuccess, handleApiError } from "../utils/apiHandler";

export const createCrudHook = ({ name, apis }) => {
  return () => {
    const { callApi } = useApi();
    const { api } = useContext(NotifyContext);

    const getAll = useCallback(
      (...params) => {
        return callApi(() => apis.getAll(...params));
      },
      [callApi, apis.getAll],
    );

    const create = useCallback(
      (data, form) => {
        return callApi(() => apis.create(data))
          .then((res) => {
            handleApiSuccess(api, res?.message || `Tạo ${name} thành công`);
            return res;
          })
          .catch((err) => {
            handleApiError(api, err, form);
          });
      },
      [callApi, apis.create, api, name],
    );

    const update = useCallback(
      (id, data, form) => {
        return callApi(() => apis.update(id, data))
          .then((res) => {
            handleApiSuccess(
              api,
              res?.message || `Cập nhật ${name} thành công`,
            );
            return res;
          })
          .catch((err) => {
            handleApiError(api, err, form);
          });
      },
      [callApi, apis.update, api, name],
    );

    const remove = useCallback(
      (id) => {
        return callApi(() => apis.delete(id))
          .then((res) => {
            handleApiSuccess(api, res?.message || `Xóa ${name} thành công`);
            return res;
          })
          .catch((err) => {
            handleApiError(api, err);
          });
      },
      [callApi, apis.delete, api, name],
    );

    return useMemo(
      () => ({
        getAll,
        create,
        update,
        remove,
      }),
      [getAll, create, update, remove],
    );
  };
};
