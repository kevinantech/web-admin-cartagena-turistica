import { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { cn } from "~/lib/utils";
import { AdminLayoutContext } from "./AdminLayout.context";
import { Header } from "./Header";
import { MobileSidebar } from "./MobileSidebar";
import { Sidebar } from "./Sidebar";

/**
 * Manages mobile menu sidebar open/closed state.
 */
const useMenuToggle = () => {
  const [isOpen, setOpen] = useState(false);
  const toggle = () => setOpen((prev) => !prev);
  return { isOpen, toggle, set: setOpen };
};

/**
 * AdminLayout view model hook. Manages menu state and navigation.
 */
export type AdminLayoutHook = ReturnType<typeof vm>;
const vm = () => {
  const menuToggle = useMenuToggle();
  const navigate = useNavigate();

  /**
   * Creates navigation handler when a navigation item is clicked.
   */
  function performMenuNavigation(path: string) {
    return () => {
      menuToggle.set(false);
      navigate(path);
    };
  }

  return { menuToggle, performMenuNavigation };
};

const AdminLayoutProvider = () => {
  const adminLayoutHook = vm();

  return (
    <AdminLayoutContext value={adminLayoutHook}>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex max-w-7xl mx-auto py-6 sm:py-8 px-4 sm:px-8">
          <MobileSidebar />
          <Sidebar />
          <main
            className={cn("flex-1 transtion-[margin-left] ease-in-out duration-300", {
              "ml-0 md:ml-64 lg:ml-0": adminLayoutHook.menuToggle.isOpen,
            })}
          >
            <Outlet />
          </main>
        </div>
      </div>
    </AdminLayoutContext>
  );
};

export default AdminLayoutProvider;

/* const menuItems: MenuItem[] = [
  {
    icon: Binoculars,
    label: "Planes",
    path: AdminRoute.EXPERIENCES,
    active: isPathActive(pathname, AdminRoute.EXPERIENCES),
  },
  {
    icon: MapPin,
    label: "Destinos/Categorías",
    path: Route.CATEGORIES,
    active: location.pathname === Route.CATEGORIES,
  },
]; */
