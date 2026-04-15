/* eslint-disable no-useless-catch */
import { useContext, useMemo } from "react";
import { NotifyContext } from "../contexts/notify.context";
import { AuthContext } from "../contexts/auth.context";
import { handleApiSuccess } from "../utils/apiHandler";
import { useApi } from "./useApi";

export const useAuth = () => {
  const { api } = useContext(NotifyContext);
  const auth = useContext(AuthContext);
  const { callApi } = useApi();

  const callAuth = async (fn, { successMessage } = {}) => {
    try {
      const res = await callApi(fn);

      if (successMessage) {
        handleApiSuccess(api, successMessage);
      }

      return res;
    } catch (err) {
      throw err;
    }
  };

  return useMemo(
    () => ({
      ...auth,
      callAuth,
    }),
    [auth, callAuth],
  );
};
