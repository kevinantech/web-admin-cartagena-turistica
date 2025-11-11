import type React from "react";
import { Link, useLocation } from "react-router";
import { Button } from "../Button";
import { useAdminLayout } from "./AdminLayout.context";

export type MenuItemProps = { children: React.ReactNode; path: string };

const MenuItem: React.FC<MenuItemProps> = ({ children, path }) => {
  const { menuToggle } = useAdminLayout();
  const { pathname } = useLocation();
  const isActive = isPathActive(pathname, path);
  return (
    <Link to={path} onClick={() => menuToggle.set(false)}>
      <Button variant={isActive ? "default" : "ghost"} className="w-full justify-start">
        {children}
      </Button>
    </Link>
  );
};

export { MenuItem };

/**
 * Determines if a menu item should be marked as active based on current route.
 */
const isPathActive = (pathname: string, path: string) => {
  return pathname.split(path)[0] === "";
};
