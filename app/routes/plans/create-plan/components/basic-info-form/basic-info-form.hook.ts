import { type CreatePlanBody, CreatePlanBodySchema } from "@/hooks/useCreatePlan";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { BookingMode } from "~/app/hooks/usePlan";

export type UseBasicInfoFormReturn = ReturnType<typeof useBasicInfoForm>;

const useBasicInfoForm = () => {
  const {
    control,
    formState: { errors },
    watch,
    setValue,
    register,
    handleSubmit,
  } = useForm<CreatePlanBody>({
    mode: "onTouched",
    resolver: zodResolver(CreatePlanBodySchema),
  });
  const bookingMode = watch("bookingMode");

  const isReservationAutomatic = useMemo(() => {
    return watch("bookingMode") === BookingMode.Automatic;
  }, [bookingMode]);

  return {
    errors,
    control,
    isReservationAutomatic,
    register,
    handleSubmit,
    setCategoryId: (value: string) => setValue("categoryId", value),
    setBookingMode: (value: boolean) =>
      setValue("bookingMode", value ? BookingMode.Automatic : BookingMode.Manual),
    setDestinations: (value: string) => setValue("destinations", [value]),
  };
};

export default useBasicInfoForm;
