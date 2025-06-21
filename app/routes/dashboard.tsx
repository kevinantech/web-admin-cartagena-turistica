import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Inicio" }];
}

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
