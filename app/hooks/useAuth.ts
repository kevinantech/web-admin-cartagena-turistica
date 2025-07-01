import { AuthContext } from "@/guards/auth-guard/auth-guard.context";
import { useContext } from "react";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext must be used within an AuthProvider");
  return context;
};
