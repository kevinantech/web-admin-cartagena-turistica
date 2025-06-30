import type { GetExperiencesData } from "@/data/models";
import { createContext } from "react";

export type ActivitiesContextType = {
  experiences: GetExperiencesData;
};

export const ActivitiesContext = createContext<ActivitiesContextType>(
  {} as ActivitiesContextType
);
