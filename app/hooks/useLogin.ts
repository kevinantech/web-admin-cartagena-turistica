import { useState } from "react";
import { useNavigate } from "react-router";
import { z } from "zod";
import { API } from "../common/enums/api-enum";
import api from "../data/api";
import { toast } from "./useToast";
import { Route } from "../common/enums/route-enum";
export const AUTH_KEY = "access_token";

export type LoginBody = z.infer<typeof LoginBodySchema>;

export const LoginBodySchema = z.object({
  email: z.string().email("Ingresar correo electronico"),
  password: z.string().min(8, "Ingresar al menos 6 caracteres"),
});

export type AuthData = {
  access_token: string;
};

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (body: LoginBody) => {
    setIsLoading(true);
    try {
      const response = await api.post<AuthData>(API.AUTH, body);
      if (response?.data?.access_token) {
        localStorage.setItem(AUTH_KEY, response.data.access_token);
        toast({
          title: "Bienvenido",
          description: "Inicio de sesión exitoso",
          variant: "success",
        });
        navigate(Route.PLANS);
      } else throw new Error("Error de autenticación");
    } catch (error) {
      toast({
        title: "Error de autenticación",
        description: "Correo y contraseña incorrectos",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };
  return {
    handleAuth,
    isLoading,
  };
};
