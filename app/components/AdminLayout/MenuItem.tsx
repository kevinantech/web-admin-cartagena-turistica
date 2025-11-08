import type React from "react";
import { useLocation } from "react-router";
import { cn } from "~/lib/utils";
import { Button } from "../ui/button";
import { useAdminLayout } from "./AdminLayout.context";

export type MenuItemProps = { children: React.ReactNode; path: string };

const MenuItem: React.FC<MenuItemProps> = ({ children, path }) => {
  const { performMenuNavigation } = useAdminLayout();
  const { pathname } = useLocation();
  const isActive = isPathActive(pathname, path);
  return (
    <Button
      className={cn(
        "w-full justify-start",
        isActive ? "bg-cyan-600 hover:bg-cyan-700 text-white" : "hover:bg-gray-100"
      )}
      onClick={performMenuNavigation(path)}
    >
      {children}
    </Button>
  );
};

export { MenuItem };

/**
 * Determines if a menu item should be marked as active based on current route.
 */
const isPathActive = (pathname: string, path: string) => {
  return pathname.split(path)[0] === "";
};
