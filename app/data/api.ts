import axios from "axios";
import { Route } from "../common/enums/route-enum";
import { ApiRoutes } from "../common/enums/api-routes-enum";
import { AUTH_KEY } from "../hooks/useLogin";

const API_HOST = "http://192.168.1.7:3000/";
const TIMEOUT = 10000;

const api = axios.create({
  baseURL: API_HOST,
  timeout: TIMEOUT,
  headers: { "Content-Type": "application/json" },
});

// Interceptor de peticiones (para agregar tokens, etc.)
api.interceptors.request.use(
  (config) => {
    const url = config.url;
    if (url?.includes(ApiRoutes.Auth)) return config;

    // Inyecta el token si la ruta no es Auth.
    if (typeof window !== "undefined" && window.localStorage) {
      const token = localStorage.getItem(AUTH_KEY);
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de respuestas (para manejar errores globalmente)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Manejar errores de autenticación
    if (
      error.response?.status === 401 &&
      window.location.pathname !== Route.Auth
    ) {
    }

    return Promise.reject(error);
  }
);

export default api;
