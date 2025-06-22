import { type RouteConfig, layout, route } from "@react-router/dev/routes";
import { Route } from "./common/enums/route-enum";

export default [
  route(Route.AUTH, "routes/auth.tsx"),
  layout("components/layouts/MainLayout.tsx", [
    route(Route.PLANS, "routes/plans.tsx"),
    route(Route.PLANS_CREATE, "routes/plans/create-plan/create-plan.tsx"),
    route(Route.CATEGORIES, "routes/categories.tsx"),
  ]),
] satisfies RouteConfig;
