import dayjs from "dayjs";

export const formatDateTime = (date) => {
  if (!date) return "N/A";
  return dayjs(date).format("DD/MM/YYYY HH:mm");
};
