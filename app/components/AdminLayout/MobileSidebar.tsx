import { cn } from "~/lib/utils";
import { useAdminLayout } from "./AdminLayout.context";
import { Branding } from "./Branding";
import { LogoutButton } from "./LogoutButton";
import { MenuButton } from "./MenuButton";
import { MenuItems } from "./MenuItems";

const MobileSidebar = () => {
  const { menuToggle } = useAdminLayout();
  return (
    <aside
      className={cn(
        "fixed top-0 bottom-0 left-0 z-40 flex flex-col w-64 border-r px-4 pb-4 bg-white shadow-sm transition-transform duration-300 ease-in-out lg:hidden",
        menuToggle.isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex items-center justify-between h-16 mb-4">
        <Branding />
        <MenuButton />
      </div>
      <nav className="flex-1 flex flex-col space-y-2">
        <MenuItems />
        <div className="grow"></div>
        <LogoutButton />
      </nav>
    </aside>
  );
};

export { MobileSidebar };
