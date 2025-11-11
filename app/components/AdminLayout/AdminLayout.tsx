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
  return { menuToggle };
};

const AdminLayoutProvider = () => {
  const adminLayoutHook = vm();

  return (
    <AdminLayoutContext value={adminLayoutHook}>
      <Header />
      <div
        // This div wrapper allows showing the scrollbar in the correct position when the display is more than max-w-7xl
        className="bg-gray-50 overflow-y-auto"
      >
        <div className="flex items-start gap-8 h-[calc(100vh_-_3rem)] md:h-[calc(100vh_-_4rem)] max-w-7xl mx-auto py-6 sm:py-8 px-4 sm:px-8">
          <MobileSidebar />
          <Sidebar />
          <main
            className={cn(
              "grow h-full transtion-[margin-left] ease-in-out duration-300",
              {
                "ml-0 md:ml-64 lg:ml-0": adminLayoutHook.menuToggle.isOpen,
              }
            )}
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
