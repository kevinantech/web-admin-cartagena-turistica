import type { CreateExperienceDto } from "@/data/dto/experience/create-experience.dto";
import type { GetCategoriesData, GetDestinationsData } from "@/data/models";
import React, { createContext, type SetStateAction } from "react";
import type { UseFormReturn } from "react-hook-form";

type CreateExperienceContextType = {
  form: UseFormReturn<CreateExperienceDto>;
  pictures: {
    value: File[];
    set: React.Dispatch<SetStateAction<File[]>>;
  };
  categories: GetCategoriesData;
  destinations: GetDestinationsData;
};

export const CreateExperienceContext = createContext<CreateExperienceContextType>(
  {} as CreateExperienceContextType
);
