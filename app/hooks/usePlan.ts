import z from "zod";

export enum DurationUnit {
  Hours = "h",
  Days = "d",
}

export enum PlanType {
  Standard = "standard",
}

export enum PricingType {
  PerPerson = "perPerson",
  PerGroup = "perGroup",
}

export enum BookingMode {
  Automatic = "automatic",
  Manual = "manual",
}

export type CreatePlanBody = z.infer<typeof CreatePlanBodySchema>;
export type UpdatePlanBody = z.infer<typeof UpdatePlanBodySchema>;

export const CreatePlanBodySchema = z.object({
  name: z.string().min(1, { message: "El nombre es requerido" }),
  description: z.string().min(1, { message: "La descripción es requerida" }),
  displayPrice: z.number().min(1, { message: "El precio es requerido" }),
  planType: z.nativeEnum(PlanType),
  categoryId: z.string().min(1, { message: "La categoría es requerida" }),
  bookingMode: z.nativeEnum(BookingMode),
  destinations: z
    .array(z.string().min(1, { message: "El destino es requerido" }))
    .min(1, { message: "Debe haber al menos una destino relacionado" }),

  schedules: z.array(
    z.object({
      startTime: z.string().min(1),
      endTime: z.string().min(1),
      maxBookings: z.number().min(1),
      maxPeoplePerBooking: z.number().min(1),
    })
  ),

  pricePerGroup: z.array(
    z.object({
      minPeople: z.number().min(1),
      maxPeople: z.number().min(1),
      amount: z.number().min(1),
    })
  ),
});

export const UpdatePlanBodySchema = CreatePlanBodySchema.extend({
  id: z.string().min(1),
});

export const PlanScheduleSchema = z.object({});

export const PricePerGroupSchema = z.object({});

export const usePlan = () => {
  const handleCreatePlan = async (body: CreatePlanBody) => {};
  const handleUpdatePlan = async (body: UpdatePlanBody) => {};

  return {
    handleCreatePlan,
    handleUpdatePlan,
  };
};
