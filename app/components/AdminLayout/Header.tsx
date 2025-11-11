import { cn } from "~/lib/utils";
import { useAdminLayout } from "./AdminLayout.context";
import { Branding } from "./Branding";
import { LogoutButton } from "./LogoutButton";
import { MenuButton } from "./MenuButton";

const Header = () => {
  const { menuToggle } = useAdminLayout();

  return (
    <header
      className={cn(
        "sticky top-0 z-10 h-12 md:h-16 border-b border-x bg-white shadow-sm",
        {
          "ml-0 md:ml-64 lg:ml-0": menuToggle.isOpen, // Offset header when sidebar is open
        }
      )}
    >
      <div className="flex justify-between items-center h-full max-w-7xl mx-auto px-4 sm:px-8">
        <div className="space-x-4">
          <MenuButton variant="header" />
          <Branding variant="header" />
        </div>
        <LogoutButton variant="header" />
      </div>
    </header>
  );
};

export { Header };
