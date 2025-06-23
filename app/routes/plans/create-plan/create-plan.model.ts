import type { UseBasicInfoFormReturn } from "./components/basic-info-form/basic-info-form.hook";
import type { UseStandardPlanConfigFormReturn } from "./components/standard-plan-config-form/standard-plan-config-form.hook";

export default ({
  formBasic,
  formStandard,
}: {
  formBasic: UseBasicInfoFormReturn;
  formStandard: UseStandardPlanConfigFormReturn;
}) => {
  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {};
  return {
    handleCreate,
  };
};
