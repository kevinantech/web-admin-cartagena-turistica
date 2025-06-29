import type { CreatePlanDto } from "@/data/dto/plan/create-plan.dto";
import type { GetCategoryData, GetDestinationData } from "@/data/models";
import React, { createContext, type SetStateAction } from "react";
import type { UseFormReturn } from "react-hook-form";

type CreatePlanContextType = {
  form: UseFormReturn<CreatePlanDto>;
  pictures: {
    value: File[];
    set: React.Dispatch<SetStateAction<File[]>>;
  };
  categories: GetCategoryData;
  destinations: GetDestinationData;
};

export const CreatePlanContext = createContext<CreatePlanContextType>(
  {} as CreatePlanContextType
);
