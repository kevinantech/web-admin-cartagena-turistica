import {
  Binoculars,
  LogOut,
  MapPin,
  Menu,
  X,
  type LucideIcon,
} from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Route } from "~/app/common/enums/route-enum";
import { useLogout } from "~/app/hooks/useLogout";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { useState } from "react";

type MenuItem = {
  icon: LucideIcon;
  label: string;
  path: Route;
  active: boolean;
};

const LogoutButton = () => {
  const handleLogout = useLogout();

  return (
    <Button
      onClick={handleLogout}
      variant="outline"
      size="sm"
      className="border-red-300 text-red-600 hover:bg-red-200 hover:text-red-600"
    >
      <LogOut className="w-4 h-4 mr-2" />
      Cerrar Sesión
    </Button>
  );
};

export default function MainLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleMenuItemClick = (path: Route) => {
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  const menuItems: MenuItem[] = [
    {
      icon: Binoculars,
      label: "Planes",
      path: Route.PLANS,
      active: pathnameIncludeWebPath(location.pathname, Route.PLANS),
    },
    {
      icon: MapPin,
      label: "Destinos/Categorías",
      path: Route.CATEGORIES,
      active: location.pathname === Route.CATEGORIES,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden mr-3"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
              <h1 className="hidden text-xl font-bold text-gray-900 mr-8 md:block">
                CARTAGENA TURÍSTICA
              </h1>
              <span className="text-lg text-cyan-600 md:text-sm font-medium">
                Panel Administrativo
              </span>
            </div>
            <div className="hidden lg:block">
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
        <div className="flex">
          {/* Mobile Sidebar */}
          <aside
            className={`
            fixed top-16 left-0 z-40 w-64 h-[calc(100dvh-4rem)] bg-white transform transition-transform duration-300 ease-in-out lg:hidden
            ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          `}
          >
            <Card className="h-full rounded-none border-r border-t-0">
              <nav className="flex flex-col h-full p-4 space-y-2">
                {menuItems.map((item, index) => (
                  <Button
                    key={index}
                    variant={item.active ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      item.active
                        ? "bg-cyan-600 hover:bg-cyan-700 text-white"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => handleMenuItemClick(item.path)}
                  >
                    <item.icon className="w-4 h-4 mr-3" />
                    {item.label}
                  </Button>
                ))}
                <div className="grow flex flex-col">
                  <div className="grow"></div>
                  <LogoutButton />
                </div>
              </nav>
            </Card>
          </aside>

          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0 mr-8">
            <Card className="p-4 sticky top-24">
              <nav className="space-y-2">
                {menuItems.map((item, index) => (
                  <Button
                    key={`menuItems[${index}]`}
                    variant={item.active ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      item.active
                        ? "bg-cyan-600 hover:bg-cyan-700 text-white"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => navigate(item.path)}
                  >
                    <item.icon className="w-4 h-4 mr-3" />
                    {item.label}
                  </Button>
                ))}
              </nav>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

const pathnameIncludeWebPath = (pathname: string, path: Route) => {
  return pathname.split(path)[0] === "";
};
