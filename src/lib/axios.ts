import axios from "axios";

const API_DELAY = false;

export const api = axios.create({
  baseURL: "/api",
});

if (API_DELAY) {
  api.interceptors.request.use(async (config) => {
    await new Promise((resolve) =>
      setTimeout(resolve, Math.round(Math.random() * 4000))
    );

    return config;
  });
}
