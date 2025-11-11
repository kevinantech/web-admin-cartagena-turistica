import { Card } from "../ui/card";
import { MenuItems } from "./MenuItems";

const Sidebar = () => {
  return (
    <aside className="hidden lg:block w-64 rounded-lg border p-4 bg-white shadow-sm">
      <nav className="space-y-2">
        <MenuItems />
      </nav>
    </aside>
  );
};

export { Sidebar };
