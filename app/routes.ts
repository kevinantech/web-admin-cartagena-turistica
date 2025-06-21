import { type RouteConfig, layout, route } from "@react-router/dev/routes";
import { Route } from "./common/enums/route-enum";

export default [
  route(Route.Auth, "routes/auth.tsx"),
  layout("components/layouts/MainLayout.tsx", [
    route(Route.Plans, "routes/plans.tsx"),
    route(
      Route.DestinationsAndCategories,
      "routes/destinations-and-categories.tsx"
    ),
  ]),
] satisfies RouteConfig;
