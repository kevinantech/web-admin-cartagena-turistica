import type { CreatePlanDto } from "@/data/dto/plan/create-plan.dto";
import type { GetCategoryData, GetDestinationData } from "@/data/models";
import { createContext } from "react";
import type { UseFormReturn } from "react-hook-form";

type CreatePlanContextType = {
  form: UseFormReturn<CreatePlanDto>;
  categories: GetCategoryData;
  destinations: GetDestinationData;
};

export const CreatePlanContext = createContext<CreatePlanContextType>(
  {} as CreatePlanContextType
);
