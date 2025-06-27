import { PricingType, RestrictionMode } from "@/common/enums/common-enums";
import { CreatePlanDto } from "@/data/dto/plan/create-plan.dto";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useEffect, useState } from "react";
import { useForm, type FieldErrors } from "react-hook-form";

export type CreateForm = {
  name: string;
  duration: number;
  categoryId: string;
  description: string;
  displayPrice: number;
  originCityId: string;
  destinationIds: string[];
  contactPhone: string;
  _reservable: boolean;
  reservable?: {
    schedule: {
      start: string;
    }[];
    restrictionBy: RestrictionMode;
    maxPeopleAllowed?: number;
    maxBookingsAllowed?: number;
    maxPeoplePerBooking: number;
    minPeoplePerBooking: number;
    pricingType: PricingType;
    pricePerPerson: number;
    pricesPerGroup?: {
      minPeople: number;
      maxPeople: number;
      amount: number;
    }[];
  };
};

export default () => {
  const form = useForm<CreateForm>({
    mode: "all",
    defaultValues: {
      reservable: {
        restrictionBy: RestrictionMode.PEOPLE,
        schedule: [{}],
        pricingType: PricingType.PER_PERSON,
      },
    },
    resolver: classValidatorResolver(CreatePlanDto),
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      console.log("🚀 ~ subscription ~ value:", value);
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

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

/* const v = {
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
}; */
