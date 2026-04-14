import { useContext } from "react";
import { useApi } from "./useApi";
import { NotifyContext } from "../contexts/notify.context";
import { handleApiSuccess, handleApiError } from "../utils/apiHandler";

export const createCrudHook = ({ name, apis }) => {
  return () => {
    const { callApi } = useApi();
    const { api } = useContext(NotifyContext);

    const getAll = async (...params) => {
      try {
        const res = await callApi(() => apis.getAll(...params));
        return res;
      } catch (err) {
        handleApiError(api, err);
      }
    };

    const create = async (data, form) => {
      try {
        const res = await callApi(() => apis.create(data));

        handleApiSuccess(api, res?.message || `Tạo ${name} thành công`);

        return res;
      } catch (err) {
        handleApiError(api, err, form);
      }
    };

    const update = async (id, data, form) => {
      try {
        const res = await callApi(() => apis.update(id, data));

        handleApiSuccess(api, res?.message || `Cập nhật ${name} thành công`);

        return res;
      } catch (err) {
        handleApiError(api, err, form);
      }
    };

    const remove = async (id) => {
      try {
        const res = await callApi(() => apis.delete(id));

        handleApiSuccess(api, res?.message || `Xóa ${name} thành công`);

        return res;
      } catch (err) {
        handleApiError(api, err);
      }
    };

    return {
      getAll,
      create,
      update,
      remove,
    };
  };
};
