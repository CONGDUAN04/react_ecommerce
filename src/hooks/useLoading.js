// src/hooks/useLoading.js
import { useContext } from "react";
import { LoadingContext } from "../contexts/loading.context";

export const useLoading = () => {
  return useContext(LoadingContext);
};
