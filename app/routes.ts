import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";
import { AdminRoute, Route } from "./common/enums/route-enum";

export default [
  index("routes/activities/index/index.tsx"),
  route(Route.AUTH, "routes/auth.tsx"),
  layout("components/layouts/admin_layout/admin_layout.tsx", [
    route(AdminRoute.EXPERIENCES, "routes/experiences/index/index.tsx"),
    route(
      Route.EXPERIENCES_CREATE,
      "routes/experiences/create-experience/create-experience.tsx"
    ),
    route(Route.CATEGORIES, "routes/categories.tsx"),
  ]),
] satisfies RouteConfig;
