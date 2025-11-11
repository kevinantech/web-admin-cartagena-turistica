import { createContext, useContext } from "react";
import type { AdminLayoutHook } from "./AdminLayout";
export const AdminLayoutContext = createContext<AdminLayoutHook>({} as AdminLayoutHook);
export const useAdminLayout = () => useContext(AdminLayoutContext);
