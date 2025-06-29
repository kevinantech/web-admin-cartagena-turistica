import { Plus } from "lucide-react";
import { useNavigate } from "react-router";
import type { Route } from "../+types/root";
import { Route as WebRoute } from "../common/enums/route-enum";
import { Button } from "../components/ui/button";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Gestión de Planes" }];
}

export default function Plans() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-between items-center flex-wrap xs:flex-nowrap">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Planes</h1>
          <p className="text-gray-600 mt-2">Administra tus planes turísticos</p>
        </div>
        <Button
          onClick={() => navigate(WebRoute.PLANS_CREATE)}
          className="w-full mt-5 bg-cyan-600 hover:bg-cyan-700 xs:w-auto xs:mt-0"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Plan
        </Button>
      </div>
    </div>
  );
}
