import { ApiRoute } from "@/common/enums/api-route-enum";
import type { GetExperiencesData } from "@/data/models";
import httpClient from "~/lib/http/http-client";
import type { Route } from "../../../+types/root";
import { PageHeader } from "./PageHeader";
import { NotFound } from "./NotFound";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Gestión de Planes" }];
}

export async function clientLoader() {
  const { data } = await httpClient<GetExperiencesData>(ApiRoute.EXPERIENCES);
  return { data };
}

export type ExperiencePageProps = Omit<Route.ComponentProps, "loaderData"> & {
  loaderData: Awaited<ReturnType<typeof clientLoader>>;
};

const ExperiencePage: React.FC<ExperiencePageProps> = (props) => {
  const notFound = props.loaderData.data?.length === 0;

  return (
    <div className="flex flex-col h-full space-y-4">
      <PageHeader />
      {notFound && <NotFound />}
    </div>
  );
};

export default ExperiencePage;
