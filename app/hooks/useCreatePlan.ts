/* export const CreateBasicBodySchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1, { message: "La descripción es requerida" }),
  displayPrice: z.number().positive(),
  destinations: z
    .array(z.string().min(1, { message: "El destino es requerido" }))
    .min(1, { message: "Debe haber al menos una destino relacionado" }),
  reservable: z.boolean(),
});
 */
/* export const StandardPlanConfigSchema = z.object({
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
}); */

export const useCreatePlan = () => {
  const createBasic = async (body: any /* CreateBasicBody */) => {
    console.log("🚀 ~ handleCreatePlan ~ body:", body);
  };

  return {
    createBasic,
  };
};
