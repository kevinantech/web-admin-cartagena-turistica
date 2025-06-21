import z from "zod";

export type CreatePlanBody = z.infer<typeof CreatePlanBodySchema>;
export type UpdatePlanBody = z.infer<typeof UpdatePlanBodySchema>;

export const CreatePlanBodySchema = z.object({
  name: z.string().min(1, { message: "El nombre es requerido" }),
  description: z.string().min(1, { message: "La descripción es requerida" }),
  price: z.number().min(1, { message: "El precio es requerido" }),
  duration: z.number().min(1, { message: "La duración es requerida" }).max(24),
  durationUnit: z.enum(["h", "d"]),
});

export const UpdatePlanBodySchema = CreatePlanBodySchema.extend({
  id: z.string().min(1),
});

export const usePlan = () => {
  const handleCreatePlan = async (body: CreatePlanBody) => {};
  const handleUpdatePlan = async (body: UpdatePlanBody) => {};

  return {
    handleCreatePlan,
    handleUpdatePlan,
  };
};
