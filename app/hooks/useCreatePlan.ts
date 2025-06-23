import { BookingMode, PricingType, RestrictionMode } from "@/data/models/plan.model";
import z from "zod";

export type CreatePlanBody = z.infer<typeof CreatePlanBodySchema>;
export type StandardPlanConfig = z.infer<typeof StandardPlanConfigSchema>;

export const CreatePlanBodySchema = z.object({
  name: z.string().min(1, { message: "El nombre es requerido" }),
  description: z.string().min(1, { message: "La descripción es requerida" }),
  displayPrice: z.number().min(1, { message: "El precio es requerido" }).optional(),
  destinations: z
    .array(z.string().min(1, { message: "El destino es requerido" }))
    .min(1, { message: "Debe haber al menos una destino relacionado" }),
  categoryId: z.string().min(1, { message: "La categoría es requerida" }),
  bookingMode: z.nativeEnum(BookingMode),
});

export const StandardPlanConfigSchema = z.object({
  schedules: z
    .array(
      z.object({
        startTime: z.string().min(1),
        endTime: z.string().min(1),
      })
    )
    .min(1, { message: "Debe haber al menos una horario relacionado" }),

  restrictionMode: z.nativeEnum(RestrictionMode),
  maxPeopleAllowed: z.number().min(1).optional(),
  maxBookingsAllowed: z.number().min(1).optional(),

  minPeoplePerBooking: z.number().min(1),
  maxPeoplePerBooking: z.number().min(1),

  pricingType: z.nativeEnum(PricingType),
  pricePerPerson: z.number().min(1).optional(),
  pricesPerGroup: z
    .array(
      z.object({
        minPeople: z.number().min(1),
        maxPeople: z.number().min(1),
        amount: z.number().min(1),
      })
    )
    .min(1)
    .optional(),
});

export const useCreatePlan = () => {
  const handleCreatePlan = async (body: CreatePlanBody) => {};
  const handleCreateStandardPlan = async (body: {}) => {};

  return {
    handleCreatePlan,
    handleCreateStandardPlan,
  };
};
