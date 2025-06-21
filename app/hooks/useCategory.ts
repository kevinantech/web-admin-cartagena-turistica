/* import { use } from "react";
import api from "../data/api";
import { ApiRoutes } from "../common/enums/api-routes-enum";

export type GetCategoryResponse = {
  _id: number;
  name: string;
}[];

export const useCategory = () => {
  const categories = use(
    api.get<GetCategoryResponse>(ApiRoutes.Category).then((res) => res.data)
  );

  return {
    categories,
  };
};
 */
