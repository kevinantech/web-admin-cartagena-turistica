import { ApiRoute } from "@/common/enums/api-route-enum";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { GetCategoryData, GetDestinationData } from "@/data/models";
import { useState } from "react";
import httpClient from "~/lib/http/http-client";
import type { Route } from "../../../+types/root";
import BackToPlansButton from "./components/back-to-plans-button/back-to-plans-button";
import BasicForm from "./components/basic-form/basic-form";
import ButtonGroup from "./components/button-group/button-group";
import ReservableForm from "./components/reservable-form/reservable-form";
import { CreatePlanContext } from "./create-plan.context";
import useCreatePlanHook from "./create-plan.model";

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
  const { form, handleCreate, handleSubmitError } = useCreatePlanHook();
  const state = { form, categories, destinations };
  const _reservable = form.watch("_reservable");

  return (
    <CreatePlanContext.Provider value={state}>
      <div className="space-y-6">
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
