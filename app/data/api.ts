import axios from "axios";
import { StorageKey } from "../common/enums/storage-key-enum";
import { Route } from "../common/enums/route-enum";

// Crear instancia de axios con configuración base
const api = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de peticiones (para agregar tokens, etc.)
api.interceptors.request.use(
  (config) => {
    // Agregar token de autenticación si existe
    const token = localStorage.getItem(StorageKey.access_token);
    if (token) config.headers.Authorization = `Bearer ${token}`;
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
    if (error.response?.status === 401) {
      localStorage.removeItem(StorageKey.access_token);
      /* window.location.href = Route.Auth; */
    }

    return Promise.reject(error);
  }
);

export default api;
