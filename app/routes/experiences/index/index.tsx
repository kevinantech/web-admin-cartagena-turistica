import { ApiRoute } from "@/common/enums/api-route-enum";
import { AdminRoute, Route as WebRoute } from "@/common/enums/route-enum";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import type { GetExperiencesData } from "@/data/models";
import type { Experience } from "@/data/models/experience.model";
import { DollarSign, Info, MapPin, Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import httpClient from "~/lib/http/http-client";
import type { Route } from "../../../+types/root";
import DetailsView from "./components/details-view/details-view";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Gestión de Planes" }];
}

export async function clientLoader() {
  const { data: experiences } = await httpClient<GetExperiencesData>(
    ApiRoute.EXPERIENCES
  );
  return { experiences };
}

export default function Experiences({
  loaderData,
}: Omit<Route.ComponentProps, "loaderData"> & {
  loaderData: Awaited<ReturnType<typeof clientLoader>>;
}) {
  const navigate = useNavigate();
  const { experiences } = loaderData;
  const [_current, _setcurrent] = useState<Experience>();
  const handleViewDetails = (p: Experience) => _setcurrent(p);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center flex-wrap xs:flex-nowrap">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Planes</h1>
          <p className="text-gray-600 mt-2">Administra tus planes turísticos</p>
        </div>
        <Button
          onClick={() => navigate(AdminRoute.EXPERIENCES_CREATE)}
          className="w-full mt-5 bg-cyan-600 hover:bg-cyan-700 xs:w-auto xs:mt-0"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Plan
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiences.map((exp) => (
          <Card key={exp._id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-4">
              <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden">
                <img
                  src={exp.pictures[0]}
                  alt={exp.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardTitle className="text-lg">{exp.name}</CardTitle>
              <CardDescription className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-1" />
                {exp.originCity.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4 truncate">{exp.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-cyan-600 flex items-center">
                  <DollarSign className="w-4 h-4 mr-1" />
                  {exp.displayPrice}
                </span>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewDetails(exp)}
                      className="border-blue-200 hover:bg-blue-50"
                    >
                      <Info className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  {_current && <DetailsView exp={_current} />}
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
