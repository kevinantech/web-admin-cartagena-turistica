import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/useLogout";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  const handleLogout = useLogout();

  return (
    <Button
      onClick={handleLogout}
      variant="outline"
      size="sm"
      className="border-red-300 text-red-600 hover:bg-red-200 hover:text-red-600"
    >
      <LogOut className="w-4 h-4 mr-1" />
      Cerrar sesión
    </Button>
  );
};

export { LogoutButton };
