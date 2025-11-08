import { AdminRoute } from "@/common/enums/route-enum";
import { MenuItem } from "./MenuItem";
import { Binoculars } from "lucide-react";

const MenuItems = () => {
  return (
    <>
      <MenuItem path={AdminRoute.EXPERIENCES}>
        <Binoculars />
        Planes
      </MenuItem>
    </>
  );
};

export { MenuItems };
