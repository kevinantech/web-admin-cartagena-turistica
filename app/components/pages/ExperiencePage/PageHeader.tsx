import { AdminRoute } from "@/common/enums/route-enum";
import { Button } from "@/components/Button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router";

const vm = () => {
  const navigate = useNavigate();
  const performNewExperienceButton = () => navigate(AdminRoute.EXPERIENCES_CREATE);
  return { performNewExperienceButton };
};

const PageHeader = () => {
  const { performNewExperienceButton } = vm();

  return (
    <div className="flex justify-between items-center flex-wrap xs:flex-nowrap">
      <div>
        <h1 className="text-3xl text-foreground font-bold">Gestión de Planes</h1>
        <p className="text-muted-foreground mt-2">Administra tus planes turísticos</p>
      </div>
      <Button
        onClick={performNewExperienceButton}
        className="w-full mt-5 xs:w-auto xs:mt-0"
      >
        <Plus className="size-4 mr-2" />
        Nuevo Plan
      </Button>
    </div>
  );
};

export { PageHeader };
