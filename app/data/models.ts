import type { Experience } from "./models/experience.model";

export type AuthData = {
  access_token: string;
  supabase_token: string;
};

export type GetCategoriesData = {
  id: string;
  name: string;
}[];

export type GetDestinationsData = {
  id: string;
  name: string;
}[];

export type CreateExperienceData = {
  id: string;
};

export type GetExperiencesData = Experience[];
