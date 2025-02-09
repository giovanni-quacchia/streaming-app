/* Axios: library for managing API requests
- Automatic JSON parse
- Works with older brosers
- Simpler syntax & better readability
*/
import axios from "axios";
import { API_KEY, API_BASE_URL, STREAMING_API_URL } from "./APIconfig";

const axiosInstance_TMDB = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
  params: {
    ["api_key"]: API_KEY,
  },
});

const axiosInstance_STREAMING = axios.create({
  baseURL: STREAMING_API_URL,
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

export {axiosInstance_TMDB, axiosInstance_STREAMING};