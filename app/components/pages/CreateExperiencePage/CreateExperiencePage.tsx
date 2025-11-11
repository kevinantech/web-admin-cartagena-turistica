import type { Categories, Destinations } from "@/common/data/interfaces";
import { ApiRoute } from "@/common/enums/api-route-enum";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import React from "react";
import httpClient from "~/lib/http/http-client";
import type { Route } from "../../../+types/root";
import { BackButton } from "./BackButton";
import { BasicForm } from "./BasicForm";
import { ButtonGroup } from "./ButtonGroup";
import { CreateExperiencePageContext } from "./CreateExperiencePage.context";
import { vm } from "./CreateExperiencePage.model";
import { LoaderBackdrop } from "./LoaderBackdrop";
import { ReservableForm } from "./ReservableForm";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Crear plan" }];
}

export async function clientLoader() {
  const { data: categories } = await httpClient.get<Categories>(ApiRoute.CATEGORIES);
  const { data: destinations } = await httpClient.get<Destinations>(
    ApiRoute.DESTINATIONS
  );

  return { categories, destinations };
}

export type CreateExperiencePageProps = Omit<Route.ComponentProps, "loaderData"> & {
  loaderData: Awaited<ReturnType<typeof clientLoader>>;
};

const CreateExperiencePage: React.FC<CreateExperiencePageProps> = (props) => {
  const createExperiencePageHook = vm(props.loaderData);
  const { form, createExperience, handleSubmitError } = createExperiencePageHook;
  const _reservable = form.watch("_reservable");

  return (
    <CreateExperiencePageContext value={createExperiencePageHook}>
      <div className="space-y-6">
        <LoaderBackdrop open={form.formState.isSubmitting} />
        <BackButton />
        <Card>
          <CardHeader>
            <CardTitle className="text-cyan-900">Nuevo Plan Turístico</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={form.handleSubmit(createExperience, handleSubmitError)}
              className="space-y-6"
            >
              <BasicForm />
              {_reservable && <ReservableForm />}
              <ButtonGroup />
            </form>
          </CardContent>
        </Card>
      </div>
    </CreateExperiencePageContext>
  );
};

export default CreateExperiencePage;
