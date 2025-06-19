import { type RouteConfig, route } from "@react-router/dev/routes";
import { Route } from "./common/enums/route-enum";

export default [route(Route.Auth, "routes/auth.tsx")] satisfies RouteConfig;
