import { ApiRoute } from "@/common/enums/api-route-enum";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { GetCategoryData, GetDestinationData } from "@/data/models";
import httpClient from "~/lib/http/http-client";
import type { Route } from "../../../+types/root";
import BackToPlansButton from "./components/back-to-plans-button/back-to-plans-button";
import BasicForm from "./components/basic-form/basic-form";
import ButtonGroup from "./components/button-group/button-group";
import ReservableForm from "./components/reservable-form/reservable-form";
import { CreatePlanContext } from "./create-plan.context";
import useCreatePlanHook from "./create-plan.model";
import { Loader2 } from "lucide-react";

export function meta() {
  return [{ title: "Crear plan" }];
}

export async function clientLoader() {
  const { data: categories } = await httpClient.get<GetCategoryData>(ApiRoute.CATEGORIES);
  const { data: destinations } = await httpClient.get<GetDestinationData>(
    ApiRoute.DESTINATIONS
  );
  return {
    categories,
    destinations,
  };
}

export default function ({
  loaderData,
}: Omit<Route.ComponentProps, "loaderData"> & {
  loaderData: Awaited<ReturnType<typeof clientLoader>>;
}) {
  const { categories, destinations } = loaderData;
  const { form, pictures, handleCreate, handleSubmitError } = useCreatePlanHook();
  const state = { form, pictures, categories, destinations };
  const _reservable = form.watch("_reservable");

  return (
    <CreatePlanContext.Provider value={state}>
      <div className="relative space-y-6">
        <LoaderBackdrop open={form.formState.isSubmitting} />
        <BackToPlansButton />
        <Card>
          <CardHeader>
            <CardTitle className="text-cyan-900">Nuevo Plan Turístico</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={form.handleSubmit(handleCreate, handleSubmitError)}
              className="space-y-6"
            >
              <BasicForm />
              {_reservable && <ReservableForm />}
              <ButtonGroup />
            </form>
          </CardContent>
        </Card>
      </div>
    </CreatePlanContext.Provider>
  );
}

const LoaderBackdrop: React.FC<{ open: boolean }> = ({ open }) => {
  return open ? (
    <div className="absolute h-full w-full inset-0 bg-white/80 flex items-center justify-center z-10 rounded-lg">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-600" />
        <p className="text-sm text-gray-600">Creando plan turístico...</p>
      </div>
    </div>
  ) : null;
};
