import { ApiRoute } from "@/common/enums/api-route-enum";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { GetCategoryData, GetDestinationData } from "@/data/models";
import httpClient from "~/lib/http/http-client";
import type { Route } from "../../../+types/root";
import BackToPlansButton from "./components/back-to-plans-button/back-to-plans-button";
import BasicInfoForm from "./components/basic-info-form/basic-info-form";
import ButtonGroup from "./components/button-group/button-group";
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

  return (
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
            <BasicInfoForm
              form={form}
              categories={categories}
              destinations={destinations}
            />
            {/* {formBasic.isReservationAutomatic && (
              <StandardPlanConfigForm form={formStandard} />
            )} */}
            <ButtonGroup />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
