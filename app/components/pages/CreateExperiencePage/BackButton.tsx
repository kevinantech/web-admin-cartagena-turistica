import { AdminRoute } from "@/common/enums/route-enum";
import { Button } from "@/components/Button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

const BackButton = () => {
  return (
    <Link to={AdminRoute.EXPERIENCES} className="block">
      <Button variant="outline">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver a Planes
      </Button>
    </Link>
  );
};

export { BackButton };
