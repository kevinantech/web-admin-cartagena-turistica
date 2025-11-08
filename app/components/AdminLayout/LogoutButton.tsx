import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/useLogout";
import { LogOut } from "lucide-react";
import { cn } from "~/lib/utils";
export type LogoutButtonProps = { variant?: "header" };

const LogoutButton: React.FC<LogoutButtonProps> = ({ variant }) => {
  const handleLogout = useLogout();

  return (
    <Button
      onClick={handleLogout}
      variant="outline"
      size="sm"
      className={cn("border-red-300 text-red-600 hover:bg-red-200 hover:text-red-600", {
        "hidden lg:inline-flex": variant === "header",
      })}
    >
      <LogOut className="w-4 h-4 mr-1" />
      Cerrar sesión
    </Button>
  );
};

export { LogoutButton };
