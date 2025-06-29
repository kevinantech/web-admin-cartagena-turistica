export type AuthData = {
  access_token: string;
  supabase_token: string;
};

export type GetCategoryData = {
  id: string;
  name: string;
}[];

export type GetDestinationData = {
  id: string;
  name: string;
}[];

export type CreatePlanData = {
  id: string;
};
