/* eslint-disable no-useless-catch */
// src/hooks/useApi.js
import { useLoading } from "./useLoading";

export const useApi = () => {
  const { startLoading, stopLoading } = useLoading();

  const callApi = async (apiFunc, options = {}) => {
    const { showLoading = true } = options;

    if (showLoading) startLoading();

    try {
      const res = await apiFunc();
      return res;
    } catch (error) {
      throw error;
    } finally {
      if (showLoading) {
        setTimeout(() => stopLoading(), 200);
      }
    }
  };

  return { callApi };
};
