import dayjs from "dayjs";

export const formatDate = (date: string | Date | null) => {
  if (!date) return "";
  return dayjs(date).format("YYYY-MM-DD");
};

export const isToday = (date: string | Date) => {
  return dayjs(date).isSame(dayjs(), "day");
};

export const parseApiDate = (dateStr: string) => {
  return dayjs(dateStr);
};
