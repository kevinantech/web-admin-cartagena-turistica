import { createContext, useContext } from "react";
import type { CreateExperiencePageHook } from "./CreateExperiencePage.model";
export const CreateExperiencePageContext = createContext({} as CreateExperiencePageHook);
export const useCreateExperiencePage = () => useContext(CreateExperiencePageContext);
