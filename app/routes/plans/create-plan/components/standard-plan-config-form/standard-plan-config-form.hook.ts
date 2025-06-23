/**
 * NOTE:
 * If you need to read information about a field from the hook useFieldArray avoid it,
 * it does not contain updated information about the field. Instead, use watch.
 */
import { type StandardPlanConfig, StandardPlanConfigSchema } from "@/hooks/useCreatePlan";
import { toast } from "@/hooks/useToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import type { ExtractArrayPayload } from "~/lib/utils";

type PricePerGroup = NonNullable<
  ExtractArrayPayload<StandardPlanConfig["pricesPerGroup"]>
>;

export type UseStandardPlanConfigFormReturn = ReturnType<
  typeof useStandardPlanConfigForm
>;

const useStandardPlanConfigForm = () => {
  const {
    control,
    formState: { errors },
    register,
    getValues,
    handleSubmit,
  } = useForm<StandardPlanConfig>({
    mode: "all",
    resolver: zodResolver(StandardPlanConfigSchema),
  });

  const {
    append: _appendSchedule,
    fields: schedules,
    remove: removeSchedule,
  } = useFieldArray({ name: "schedules", control: control });
  const {
    append: _appendPricePerGroup,
    fields: pricesPerGroup,
    remove: removePricePerGroup,
  } = useFieldArray({ name: "pricesPerGroup", control: control });

  const appendPricePerGroup = () => {
    const minPeoplePerBooking = getValues("minPeoplePerBooking");
    const maxPeoplePerBooking = getValues("maxPeoplePerBooking");

    if (isNaN(minPeoplePerBooking) || isNaN(maxPeoplePerBooking)) {
      return toast({
        title: "Configuración de cupos",
        description: "Establecer el número mínimo y máximo de personas por reservas.",
        variant: "destructive",
      });
    }
    const isPricesEmpty = pricesPerGroup.length === 0;
    const lastIndex = pricesPerGroup.length - 1;
    const prevPricePerGroup = getValues(`pricesPerGroup.${lastIndex}`);
    const prevMaxPeople = prevPricePerGroup?.maxPeople;
    const minPeople = isPricesEmpty ? minPeoplePerBooking : prevMaxPeople + 1;
    const maxPeople = minPeople + 1;

    const payload: PricePerGroup = {
      minPeople,
      maxPeople,
      amount: 0,
    };
    _appendPricePerGroup(payload);
  };

  return {
    errors,
    control,
    schedules,
    pricesPerGroup,
    register,
    handleSubmit,
    appendSchedule: () => _appendSchedule({} as any),
    removeSchedule,
    appendPricePerGroup,
    removePricePerGroup,
  };
};

export default useStandardPlanConfigForm;
