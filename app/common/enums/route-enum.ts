export enum Route {
  AUTH = "/auth",
  EXPERIENCES = "/products",
  CATEGORIES = "/categories",
  ACTIVITIES = "/activities",
}

export enum AdminRoute {
  EXPERIENCES = "/admin/experiences",
  EXPERIENCES_CREATE = `${AdminRoute.EXPERIENCES}`,
}
