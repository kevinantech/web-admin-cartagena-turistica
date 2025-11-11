import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";
import { AdminRoute, Route } from "./common/enums/route-enum";

export default [
  index("routes/activities/index/index.tsx"),
  route(Route.AUTH, "routes/auth.tsx"),
  layout("components/AdminLayout/AdminLayout.tsx", [
    route(AdminRoute.EXPERIENCES, "components/pages/ExperiencePage/ExperiencePage.tsx"),
    route(
      AdminRoute.EXPERIENCES_CREATE,
      "components/pages/CreateExperiencePage/CreateExperiencePage.tsx"
    ),
    route(Route.CATEGORIES, "routes/categories.tsx"),
  ]),
] satisfies RouteConfig;
