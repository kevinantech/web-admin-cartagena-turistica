import { Menu } from "lucide-react";
import { cn } from "~/lib/utils";
import { useAdminLayout } from "./AdminLayout.context";
export type MenuButtonProps = { variant?: "header" };

const MenuButton: React.FC<MenuButtonProps> = ({ variant }) => {
  const { menuToggle } = useAdminLayout();
  return (
    <button
      className={cn("p-2 hover:bg-accent rounded-sm cursor-pointer", {
        "lg:hidden": variant === "header",
        hidden: menuToggle.isOpen && variant === "header", // Hide button from header when sidebar is open
      })}
      onClick={menuToggle.toggle}
    >
      <Menu
        className={cn("size-4", {
          "md:size-5": variant === "header",
        })}
      />
    </button>
  );
};

export { MenuButton };
