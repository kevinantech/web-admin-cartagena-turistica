import { Route } from "@/common/enums/route-enum";
import { BookingMode } from "@/data/models/plan.model";
import {
  CreatePlanBodySchema,
  StandardPlanConfigSchema,
  type CreatePlanBody,
  type StandardPlanConfig,
} from "@/hooks/useCreatePlan";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router";

export default () => {
  const rootForm = useForm<CreatePlanBody>({
    mode: "onTouched",
    resolver: zodResolver(CreatePlanBodySchema),
    defaultValues: { displayPrice: 0 },
  });
  const standardForm = useForm<StandardPlanConfig>({
    mode: "onTouched",
    resolver: zodResolver(StandardPlanConfigSchema),
  });
  const {
    append: _appendSchedule,
    fields: schedules,
    remove: removeSchedule,
  } = useFieldArray({ name: "schedules", control: standardForm.control });
  const {
    append: _appendPricePerGroup,
    fields: pricePerGroup,
    remove: removePricePerGroup,
  } = useFieldArray({ name: "pricePerGroup", control: standardForm.control });

  rootForm.register("displayPrice");

  const navigate = useNavigate();

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {};

  const isReservationAutomatic = useMemo(
    () => rootForm.watch("bookingMode") === BookingMode.Automatic,
    [rootForm.watch("bookingMode")]
  );

  return {
    form: {
      root: {
        errors: rootForm.formState.errors,
        control: rootForm.control,
        isReservationAutomatic,
        register: rootForm.register,
        setCategoryId: (value: string) => rootForm.setValue("categoryId", value),
        setDestinations: (value: string) => rootForm.setValue("destinations", [value]),
        setBookingMode: (value: boolean) =>
          rootForm.setValue(
            "bookingMode",
            value ? BookingMode.Automatic : BookingMode.Manual
          ),
      },
      standard: {
        errors: standardForm.formState.errors,
        schedules,
        pricePerGroup,
        register: standardForm.register,
        appendSchedule: () => _appendSchedule({} as any),
        removeSchedule,
        appendPricePerGroup: () => _appendPricePerGroup({} as any),
        removePricePerGroup,
      },
    },
    handleCreate,
    navigateToPlans: () => navigate(Route.PLANS),
  };
};
