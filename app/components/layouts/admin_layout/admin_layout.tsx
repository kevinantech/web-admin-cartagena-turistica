import { Menu, type LucideIcon } from "lucide-react";
import { Outlet } from "react-router";
import { Button } from "~/app/components/ui/button";
import { Card } from "~/app/components/ui/card";
import { cn } from "~/lib/utils";
import vm from "./admin_layout.model";
import { LogoutButton } from "./logout-button/logout-button";

type MenuItem = {
  icon: LucideIcon;
  label: string;
  path: string;
  active: boolean;
};

export default function AdminLayout() {
  const { menuItems, menuToggle, handleMenuNavigation } = vm();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header
        className={cn(
          "sticky top-0 z-10 border-b border-x bg-white shadow-sm transition-[margin-left] duration-300 ease-in-out",
          menuToggle.open ? "ml-64" : "ml-0"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12 md:h-16">
            <div className="flex items-center">
              <button
                className={cn(
                  "lg:hidden mr-4 p-2 hover:bg-accent rounded-sm cursor-pointer",
                  { hidden: menuToggle.open }
                )}
                onClick={() => menuToggle.set(true)}
              >
                <Menu className="size-4 md:size-5" />
              </button>
              <div className="hidden lg:block">
                <h1 className="text-foreground font-bold">VISITA CARTAGENA</h1>
                <span className="block text-xs text-foreground font-medium">
                  Administrador
                </span>
              </div>
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
            className={cn(
              "fixed top-0 bottom-0 left-0 z-40 flex flex-col w-64 border-r px-4 pb-4 bg-white shadow-sm transition-transform duration-300 ease-in-out lg:hidden",
              menuToggle.open ? "translate-x-0" : "-translate-x-full"
            )}
          >
            <div className="flex justify-between h-16 mb-4">
              <div className="place-content-center">
                <h1 className="text-foreground font-bold">VISITA CARTAGENA</h1>
                <span className="block text-xs text-foreground font-medium">
                  Administrador
                </span>
              </div>
              <button
                className="self-center p-2 hover:bg-accent rounded-sm cursor-pointer"
                onClick={() => menuToggle.set(false)}
              >
                <Menu className="size-4 md:size-5" />
              </button>
            </div>
            <nav className="flex-1 flex flex-col space-y-2">
              {menuItems.map((item, index) => (
                <Button
                  key={index}
                  variant={item.active ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    item.active
                      ? "bg-cyan-600 hover:bg-cyan-700 text-white"
                      : "hover:bg-gray-100"
                  )}
                  onClick={() => handleMenuNavigation(item.path)}
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  {item.label}
                </Button>
              ))}
              <div className="grow"></div>
              <LogoutButton />
            </nav>
          </aside>

          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0 mr-8">
            <Card className="p-4 sticky top-24">
              <nav className="space-y-2">
                {menuItems.map((item, index) => (
                  <Button
                    key={`menuItems[${index}]`}
                    variant={item.active ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start",
                      item.active
                        ? "bg-cyan-600 hover:bg-cyan-700 text-white"
                        : "hover:bg-gray-100"
                    )}
                    onClick={() => handleMenuNavigation(item.path)}
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
