/* eslint-disable no-useless-catch */
// src/hooks/useAuth.js
import { useContext } from "react";
import { NotifyContext } from "../contexts/notify.context";
import { AuthContext } from "../contexts/auth.context";
import { handleApiError, handleApiSuccess } from "../utils/apiHandler";
import { useApi } from "./useApi";

export const useAuth = () => {
  const { api } = useContext(NotifyContext);
  console.log("API AUTH:", api);
  const auth = useContext(AuthContext);
  const { callApi } = useApi();

  const callAuth = async (fn, { successMessage, form } = {}) => {
    try {
      const res = await callApi(fn); // 🔥 auto loading

      if (successMessage) {
        handleApiSuccess(api, successMessage);
      }

      return res;
    } catch (err) {
      throw err;
    }
  };

  return {
    ...auth,
    callAuth,
  };
};
