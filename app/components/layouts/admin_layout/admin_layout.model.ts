import { AdminRoute } from "@/common/enums/route-enum";
import { Binoculars, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

const useMenuToggle = () => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((prev) => !prev);

  return {
    open,
    toggle,
    set: setOpen,
  };
};

type MenuItem = {
  icon: LucideIcon;
  label: string;
  path: string;
  active: boolean;
};

export default () => {
  const menuToggle = useMenuToggle();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleMenuNavigation = (path: string) => {
    menuToggle.set(false);
    navigate(path);
  };

  const menuItems: MenuItem[] = [
    {
      icon: Binoculars,
      label: "Planes",
      path: AdminRoute.EXPERIENCES,
      active: isPathActive(pathname, AdminRoute.EXPERIENCES),
    },
    /* {
      icon: MapPin,
      label: "Destinos/Categorías",
      path: Route.CATEGORIES,
      active: location.pathname === Route.CATEGORIES,
    }, */
  ];

  return {
    menuItems,
    menuToggle,
    handleMenuNavigation,
  };
};

const isPathActive = (pathname: string, path: string) => {
  return pathname.split(path)[0] === "";
};
