import { ApiRoute } from "@/common/enums/api-route-enum";
import type { AuthData } from "@/data/models";
import { useState } from "react";
import { useNavigate } from "react-router";
import { z } from "zod";
import httpClient from "~/lib/http/http-client";
import { Route } from "../common/enums/route-enum";
import { toast } from "./useToast";
export const AUTH_KEY = "access_token";

export type LoginBody = z.infer<typeof LoginBodySchema>;

export const LoginBodySchema = z.object({
  email: z.string().email("Ingresar correo electronico"),
  password: z.string().min(8, "Ingresar al menos 6 caracteres"),
});

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (body: LoginBody) => {
    setIsLoading(true);
    try {
      const response = await httpClient.post<AuthData>(ApiRoute.AUTH, body);
      if (response?.data?.access_token) {
        localStorage.setItem(AUTH_KEY, response.data.access_token);
        toast({
          title: "Bienvenido",
          description: "Inicio de sesión exitoso",
          variant: "success",
        });
        navigate(Route.EXPERIENCES);
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
