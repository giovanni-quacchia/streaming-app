/* Axios: library for managing API requests
- Automatic JSON parse
- Works with older brosers
- Simpler syntax & better readability
*/
import axios from "axios";
import { API_KEY, API_BASE_URL } from "./APIconfig";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
  params: {
    ["api_key"]: API_KEY,
  },
});

export default axiosInstance;