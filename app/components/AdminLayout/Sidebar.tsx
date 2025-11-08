import { Card } from "../ui/card";
import { MenuItems } from "./MenuItems";

const Sidebar = () => {
  return (
    <aside className="hidden lg:block w-64 flex-shrink-0 mr-8">
      <Card className="p-4 sticky top-24">
        <nav className="space-y-2">
          <MenuItems />
        </nav>
      </Card>
    </aside>
  );
};

export { Sidebar };
