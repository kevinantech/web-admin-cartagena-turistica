import { ApiRoutes } from "@/common/enums/api-routes-enum";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/data/api";
import type { GetCategoryData, GetDestinationData } from "@/data/models";
import type { Route } from "../../../+types/root";
import BackToPlansButton from "./components/back-to-plans-button/back-to-plans-button";
import BasicInfoForm from "./components/basic-info-form/basic-info-form";
import useBasicInfoForm from "./components/basic-info-form/basic-info-form.hook";
import StandardPlanConfigForm from "./components/standard-plan-config-form/standard-plan-config-form";
import useStandardPlanConfigForm from "./components/standard-plan-config-form/standard-plan-config-form.hook";
import useCreatePlanHook from "./create-plan.model";

export function meta() {
  return [{ title: "Crear plan" }];
}

export async function clientLoader() {
  const { data: categories } = await api.get<GetCategoryData>(ApiRoutes.Category);
  const { data: destinations } = await api.get<GetDestinationData>(ApiRoutes.Destination);
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
  const formBasic = useBasicInfoForm();
  const formStandard = useStandardPlanConfigForm();
  const { handleCreate } = useCreatePlanHook({ formBasic, formStandard });

  return (
    <div className="space-y-6">
      <BackToPlansButton />
      <Card>
        <CardHeader>
          <CardTitle className="text-cyan-900">Nuevo Plan Turístico</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreate} className="space-y-6">
            <BasicInfoForm
              form={formBasic}
              categories={categories}
              destinations={destinations}
            />
            {formBasic.isReservationAutomatic && (
              <StandardPlanConfigForm form={formStandard} />
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
