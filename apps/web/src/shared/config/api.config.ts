export const apiConfig = {
  url: import.meta.env?.VITE_API_URL || ""
};

export type ApiConfig = typeof apiConfig;
