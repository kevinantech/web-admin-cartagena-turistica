import { Plus } from "lucide-react";
import { Button } from "../components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreatePlanBodySchema,
  usePlan,
  type CreatePlanBody,
} from "../hooks/usePlan";
import type { Route } from "../+types/root";
import { Route as WebRoute } from "../common/enums/route-enum";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "../components/ui/textarea";
import { useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Gestión de Planes" }];
}

const _usePlans = () => {
  const navigate = useNavigate();
  const navigateToCreatePlan = () => navigate(WebRoute.PLANS_CREATE);

  const { handleCreatePlan, handleUpdatePlan } = usePlan();
  const { register, handleSubmit, reset } = useForm<CreatePlanBody>({
    resolver: zodResolver(CreatePlanBodySchema),
  });
  const [_id, setId] = useState<string>("");
  const [isFormOpen, setFormOpen] = useState<boolean>(false);

  const openForm = () => setFormOpen(true);
  const closeForm = () => setFormOpen(false);

  const cancelForm = () => {
    reset();
    closeForm();
  };

  const handlePlan = async (body: CreatePlanBody) => {
    if (_id) await handleUpdatePlan({ id: _id, ...body });
    else await handleCreatePlan(body);
    setId("");
  };

  return {
    form: {
      reset,
      register,
      handleSubmit,
      isFormOpen,
      openForm,
      cancelForm,
    },
    handlePlan,
    isEditing: !!_id,
    navigateToCreatePlan,
  };
};

export default function Plans() {
  const { form, isEditing, handlePlan, navigateToCreatePlan } = _usePlans();

  return (
    <div>
      <div className="flex justify-between items-center flex-wrap xs:flex-nowrap">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Gestión de Planes
          </h1>
          <p className="text-gray-600 mt-2">Administra tus planes turísticos</p>
        </div>
        <Button
          onClick={navigateToCreatePlan}
          className="w-full mt-5 bg-cyan-600 hover:bg-cyan-700 xs:w-auto xs:mt-0"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Plan
        </Button>
      </div>
      {form.isFormOpen && (
        <Card className="border-cyan-200 mt-6">
          <CardHeader>
            <CardTitle className="text-cyan-700">
              {isEditing ? "Editar Plan" : "Nuevo Plan Turístico"}
            </CardTitle>
            <CardDescription>
              {isEditing
                ? "Modifica los datos del plan"
                : "Completa la información del nuevo plan"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={form.handleSubmit(handlePlan)}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">Nombre del Plan</Label>
                  <Input
                    id="name"
                    placeholder="Ej: Islas del Rosario"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="location">Ubicación</Label>
                  <Input id="location" placeholder="Ej: Cartagena" required />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="price">Precio</Label>
                <Input id="price" placeholder="Ej: $450.000" required />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  placeholder="Describe las características del plan turístico"
                  required
                />
              </div>
              <div className="flex space-x-2">
                <Button type="submit" className="bg-cyan-600 hover:bg-cyan-700">
                  {isEditing ? "Actualizar" : "Crear"} Plan
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={form.cancelForm}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
