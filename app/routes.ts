import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";
import { AdminRoute, Route } from "./common/enums/route-enum";

export default [
  index("routes/activities/index/index.tsx"),
  route(Route.AUTH, "routes/auth.tsx"),
  layout("components/AdminLayout/AdminLayout.tsx", [
    route(AdminRoute.EXPERIENCES, "routes/experiences/index/index.tsx"),
    route(
      AdminRoute.EXPERIENCES_CREATE,
      "routes/experiences/create-experience/create-experience.tsx"
    ),
    route(Route.CATEGORIES, "routes/categories.tsx"),
  ]),
] satisfies RouteConfig;
