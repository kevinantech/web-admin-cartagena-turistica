import { Route } from "@/common/enums/route-enum";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

const BackToPlansButton = () => {
  return (
    <Link to={Route.PLANS} className="block">
      <Button variant="outline" className="flex items-center">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver a Planes
      </Button>
    </Link>
  );
};

export default BackToPlansButton;
