import { LoaderCircle, MapPin, Plus, Tag, Tags } from "lucide-react";
import type { Route } from "../+types/root";
import { ApiRoutes } from "../common/enums/api-routes-enum";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import api from "../data/api";
import type { GetCategoryData, GetDestinationData } from "../data/models";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Destinos/Categorías" }];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const { data: categories } = await api.get<GetCategoryData>(
    ApiRoutes.Category
  );

  const { data: destinations } = await api.get<GetDestinationData>(
    ApiRoutes.Destination
  );

  return {
    categories,
    destinations,
  };
}

// HydrateFallback is rendered while the client loader is running
export function HydrateFallback() {
  return (
    <div className="w-min mx-auto my-10">
      <LoaderCircle
        size={48}
        strokeWidth={2}
        className="text-cyan-700 animate-spin"
      />
    </div>
  );
}

export default function Categories({
  loaderData,
}: Omit<Route.ComponentProps, "loaderData"> & {
  loaderData: Awaited<ReturnType<typeof clientLoader>>;
}) {
  const { categories, destinations } = loaderData;
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {/* Categorías */}
      <Card>
        <CardHeader className="flex-row justify-between">
          <CardTitle className="flex items-center gap-2">
            <Tags size={24} className="text-cyan-600" /> Categorías
          </CardTitle>
          <Button
            title="Añadir categoría"
            className="w-min bg-cyan-600 hover:bg-cyan-700"
          >
            <Plus strokeWidth={3} />
          </Button>
        </CardHeader>
        <CardContent>
          {categories.map(({ _id, name }) => (
            <div
              key={_id}
              className="px-4 py-3 border rounded-lg mb-2 bg-white shadow-sm"
            >
              <p className="flex items-center text-sm font-medium ">
                <Tag size={16} className="mr-2" />
                {name}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Destinos */}
      <Card>
        <CardHeader className="flex-row justify-between">
          <CardTitle className="flex items-center gap-2">
            <MapPin size={24} className="text-cyan-600" /> Destinos
          </CardTitle>
          <Button
            title="Añadir destino"
            className="w-min bg-cyan-600 hover:bg-cyan-700"
          >
            <Plus strokeWidth={3} />
          </Button>
        </CardHeader>
        <CardContent>
          {destinations.map(({ _id, name }) => (
            <div
              key={_id}
              className="px-4 py-3 border rounded-lg mb-2 bg-white shadow-sm"
            >
              <p className="flex items-center text-sm font-medium ">
                <MapPin size={16} className="mr-2" />
                {name}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
