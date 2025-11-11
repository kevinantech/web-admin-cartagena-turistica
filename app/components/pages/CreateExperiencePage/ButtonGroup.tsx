import { AdminRoute } from "@/common/enums/route-enum";
import { Button } from "@/components/ui/button";
import type React from "react";
import { Link } from "react-router";

export type ButtonGroupProps = {};

const ButtonGroup: React.FC<ButtonGroupProps> = ({}) => {
  return (
    <div className="flex space-x-2">
      <Button type="submit">Crear Plan</Button>
      <Link to={AdminRoute.EXPERIENCES}>
        <Button type="button" variant="outline">
          Cancelar
        </Button>
      </Link>
    </div>
  );
};

export { ButtonGroup };
