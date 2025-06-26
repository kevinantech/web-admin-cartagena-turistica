import { RestrictionMode } from "@/common/enums/common-enums";
import { PricingType } from "@/hooks/usePlan";
import { useEffect } from "react";
import {
  useForm,
  type FieldError,
  type FieldErrors,
  type RegisterOptions,
} from "react-hook-form";
import { z } from "zod";

export type CreateForm = {
  name: string;
  duration: number;
  categoryId: string;
  description: string;
  displayPrice: number;
  originCityId: string;
  destinationIds: string[];
  contactPhone: string;
  isReservable: boolean;
  schedule: {
    start: string;
  }[];
  reservable: {
    restrictionBy: RestrictionMode;
    maxPeopleAllowed: number;
    maxBookingsAllowed: number;
    maxPeoplePerBooking: number;
    minPeoplePerBooking: number;
    pricingType: PricingType;
    pricesPerGroup: {
      minPeople: number;
      maxPeople: number;
      amount: number;
    }[];
  };
};

export type CreateFormRules = {
  [K in keyof CreateForm]?: RegisterOptions<CreateForm, K>;
};

export type FormError = {
  [K in keyof CreateForm]?: FieldError;
};

export default () => {
  const form = useForm<CreateForm>({
    mode: "all",
    defaultValues: { isReservable: false },
    resolver: (values, context, options) => {
      const error = { type: "validate" };
      const errors: FormError = {};
      const {
        name,
        categoryId,
        description,
        duration,
        originCityId,
        destinationIds,
        displayPrice,
        schedule,
        contactPhone,
        isReservable,
      } = values;
      if (v.name.safeParse(name)?.error) errors.name = error;
      if (v.categoryId.safeParse(categoryId)?.error) errors.categoryId = error;
      if (v.duration.safeParse(duration)?.error) errors.duration = error;
      if (v.description.safeParse(description)?.error) errors.description = error;
      if (!isReservable && v.displayPrice.safeParse(displayPrice)?.error)
        errors.displayPrice = error;
      if (v.originCityId.safeParse(originCityId)?.error) errors.originCityId = error;
      if (v.destinationIds.safeParse(destinationIds)?.error)
        errors.destinationIds = error;
      if (v.contactPhone.safeParse(contactPhone)?.error) errors.contactPhone = error;
      if (v.schedule.safeParse(schedule)?.error) errors.schedule = error;

      /* if (isReservable) {
      } */

      return {
        errors,
        values,
      };
    },
  });

  useEffect(() => {
    if (Object.values(form.formState.errors).length !== 0) {
      console.log("🚀 ~ errors:", form.formState.errors);
    }
  }, [form.formState.errors]);

  /**
   * Verifica los campos del formBasic desde el submit del formStandard
   */
  /* useEffect(() => {
    if (formStandard.isSubmitting) formBasic.trigger();
  }, [formStandard.isSubmitting]); */

  const handleCreate = async (body: CreateForm) => {
    console.log("🚀 ~ handleCreate ~ body:", body);
  };

  const handleSubmitError = (errors: FieldErrors<CreateForm>) => {};

  return {
    form,
    handleCreate,
    handleSubmitError,
  };
};

const v = {
  name: z.string().trim().nonempty(),
  duration: z.number().int().positive(),
  categoryId: z.string().trim().nonempty(),
  description: z.string().trim().nonempty(),
  displayPrice: z.number().positive(),
  originCityId: z.string().trim().nonempty(),
  destinationIds: z.array(z.string().trim().nonempty()).nonempty(),
  contactPhone: z.string().trim().nonempty(),
  schedule: z.date(),
  reservable: {
    restrictionBy: z.nativeEnum(RestrictionMode),
    maxPeopleAllowed: z.number().int().positive(),
    maxBookingsAllowed: z.number().int().positive(),
    maxPeoplePerBooking: z.number().int().positive(),
    minPeoplePerBooking: z.number().int().positive(),
    pricingType: z.nativeEnum(PricingType),
    pricePerPerson: z.number().positive(),
    pricePerGroup: {
      minPeople: z.number().int().positive(),
      maxPeople: z.number().int().positive(),
      amount: z.number().positive(),
    },
  },
};
