import { Route } from "@/common/enums/route-enum";
import { AUTH_KEY } from "@/hooks/useLogin";
import jwt from "jsonwebtoken";
import type React from "react";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { AuthContext, type Session } from "./auth-guard.context";

export type AuthGuardProps = {
  children: React.ReactNode;
};

const AuthGuard: React.FC<AuthGuardProps> = () => {
  const [session, _setSession] = useState<Session>();
  const navigate = useNavigate();

  useEffect(() => {
    const session = _getDecode();
    if (session) _setSession(session);
  }, []);

  useEffect(() => {
    if (!session) navigate(Route.AUTH);
  }, [session]);

  return (
    <AuthContext.Provider value={{ session }}>
      <Outlet />
    </AuthContext.Provider>
  );
};

export default AuthGuard;

const _getDecode = () => {
  const saved = localStorage.getItem(AUTH_KEY);
  if (!saved) return null;
  const payload = jwt.decode(saved);
  return payload;
};
