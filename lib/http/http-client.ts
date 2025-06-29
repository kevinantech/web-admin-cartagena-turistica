import { ApiRoute } from "@/common/enums/api-route-enum";
import { AUTH_KEY } from "@/hooks/useLogin";
import axios from "axios";
const API_HOST = "http://192.168.1.6:10250/";
const TIMEOUT = 10000;

const httpClient = axios.create({
  baseURL: API_HOST,
  timeout: TIMEOUT,
  headers: { "Content-Type": "application/json" },
});

// Interceptor de peticiones (para agregar tokens, etc.)
httpClient.interceptors.request.use(
  (config) => {
    const url = config.url;
    if (url?.includes(ApiRoute.AUTH)) return config;

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
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Aquí capturas cualquier error global
    if (error.response) {
      // El servidor respondió con un código distinto de 2xx
      const status = error.response.status;
      const message = error.response.data?.message || "Error desconocido";

      // Puedes personalizar la respuesta según el código
      if (status === 401) {
        console.warn("No autorizado. Redirigiendo a login...");
        // logout(); router.push('/login'); etc.
      } else if (status === 500) {
        console.error("Error interno del servidor.");
      }

      // Opcional: lanzar error transformado
      return Promise.reject({ status, message });
    } else if (error.request) {
      console.error("No se recibió respuesta del servidor.");
      return Promise.reject({ message: "Sin conexión con el servidor." });
    } else {
      console.error("Error al configurar la solicitud:", error.message);
      return Promise.reject({ message: error.message });
    }
  }
);

export default httpClient;
