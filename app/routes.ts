import { type RouteConfig, layout, route } from "@react-router/dev/routes";
import { Route } from "./common/enums/route-enum";

export default [
  route(Route.AUTH, "routes/auth.tsx"),
  route(Route.ACTIVITIES, "routes/activities/index/index.tsx"),
  layout("components/layouts/MainLayout.tsx", [
    route(Route.EXPERIENCES, "routes/experiences/index/index.tsx"),
    route(
      Route.EXPERIENCES_CREATE,
      "routes/experiences/create-experience/create-experience.tsx"
    ),
    route(Route.CATEGORIES, "routes/categories.tsx"),
  ]),
] satisfies RouteConfig;
