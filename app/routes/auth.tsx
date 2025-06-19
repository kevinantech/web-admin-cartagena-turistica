import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/useToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn } from "lucide-react";
import { useState } from "react";
import { useForm, type FieldErrors } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";
import type { Route } from "../+types/root";
import { authService } from "../data/services/auth-service";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Administrador" }];
}

export type AuthForm = z.infer<typeof AuthFormSchema>;

export const AuthFormSchema = z.object({
  email: z.string().email("Ingresar correo electronico"),
  password: z.string().min(8, "Ingresar al menos 6 caracteres"),
});

const useLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthForm>({
    resolver: zodResolver(AuthFormSchema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (formValue: AuthForm) => {
    setIsLoading(true);
    const { email, password } = formValue;
    const error = await authService({ email, password });

    error
      ? toast({
          title: "Error de autenticación",
          description: error.message,
          variant: "destructive",
        })
      : toast({
          title: "Bienvenido",
          description: "Inicio de sesión exitoso",
          variant: "success",
        });

    /* navigate("/admin"); */
    setIsLoading(false);
  };

  return {
    form: { register, handleSubmit, errors },
    handleAuth,
    isLoading,
  };
};

export default function Login() {
  const navigate = useNavigate();
  const { form, handleAuth, isLoading } = useLogin();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            CARTAGENA TURÍSTICA
          </h1>
          <p className="text-cyan-600 font-medium">Panel Administrativo</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl text-center text-gray-800">
              Iniciar Sesión
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              Accede al panel de administración
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={form.handleSubmit(handleAuth)}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-3">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@explore.com"
                  required
                  {...form.register("email")}
                  className="h-11"
                />
                {form.errors.email && (
                  <p className="pl-2 text-red-500 text-xs">
                    {form.errors.email.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  {...form.register("password")}
                  className="h-11"
                />
                {form.errors.password && (
                  <p className="pl-2 text-red-500 text-xs">
                    {form.errors.password.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full h-11 bg-cyan-600 hover:bg-cyan-700 text-white cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Iniciando sesión...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <LogIn className="w-4 h-4" />
                    <span>Iniciar Sesión</span>
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
