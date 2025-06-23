import { type StandardPlanConfig, StandardPlanConfigSchema } from "@/hooks/useCreatePlan";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

export type UseStandardPlanConfigFormReturn = ReturnType<
  typeof useStandardPlanConfigForm
>;

const useStandardPlanConfigForm = () => {
  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<StandardPlanConfig>({
    mode: "onTouched",
    resolver: zodResolver(StandardPlanConfigSchema),
  });
  const {
    append: _appendSchedule,
    fields: schedules,
    remove: removeSchedule,
  } = useFieldArray({ name: "schedules", control: control });
  const {
    append: _appendPricePerGroup,
    fields: pricePerGroup,
    remove: removePricePerGroup,
  } = useFieldArray({ name: "pricePerGroup", control: control });

  return {
    errors,
    control,
    schedules,
    pricePerGroup,
    register,
    handleSubmit,
    appendSchedule: () => _appendSchedule({} as any),
    removeSchedule,
    appendPricePerGroup: () => _appendPricePerGroup({} as any),
    removePricePerGroup,
  };
};

export default useStandardPlanConfigForm;
