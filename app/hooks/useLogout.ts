import { useNavigate } from "react-router";
import { Route } from "../common/enums/route-enum";
import { AUTH_KEY } from "./useLogin";

export const useLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    navigate(Route.AUTH);
  };

  return handleLogout;
};
