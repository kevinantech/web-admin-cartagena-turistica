import { Route } from "@/common/enums/route-enum";
import { Button } from "@/components/ui/button";
import type React from "react";
import { NavLink } from "react-router";

export type ButtonGroupProps = {};

const ButtonGroup: React.FC<ButtonGroupProps> = ({}) => {
  return (
    <div className="flex space-x-2">
      <Button type="submit" className="bg-cyan-600 hover:bg-cyan-700">
        Crear Plan
      </Button>
      <NavLink to={Route.EXPERIENCES}>
        <Button type="button" variant="outline">
          Cancelar
        </Button>
      </NavLink>
    </div>
  );
};

export default ButtonGroup;
