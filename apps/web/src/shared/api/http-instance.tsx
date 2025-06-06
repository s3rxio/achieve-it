import axios from "axios";
import { apiConfig } from "../config/api.config";

export const apiInstance = axios.create({
  baseURL: apiConfig.url
});
