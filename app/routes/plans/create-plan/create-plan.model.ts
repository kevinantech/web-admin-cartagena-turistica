import { useCreatePlan } from "@/hooks/useCreatePlan";
import { useEffect } from "react";
import { useForm, type FieldErrors, type RegisterOptions } from "react-hook-form";

export type CreateForm = {
  name: string;
  categoryId: string;
  description: string;
  displayPrice: number;
  destinationIds: string;
  reservable: boolean;
};

export type CreateFormRules = {
  [K in keyof CreateForm]?: RegisterOptions<CreateForm, K>;
};

export default () => {
  const form = useForm<CreateForm>({
    mode: "all",
    defaultValues: { reservable: false },
  });

  const rules: CreateFormRules = {
    name: { required: true },
    categoryId: { required: true },
    description: { required: true },
    displayPrice: { required: true },
    destinationIds: { required: true },
  };

  const { createBasic } = useCreatePlan();

  useEffect(() => {
    if (Object.values(form.formState.errors).length !== 0) {
      console.log("🚀 ~ errors:", form.formState.errors);
    }
  }, [form.formState.errors]);

  /**
   * Verifica los campos del formBasic desde el submit del formStandard
   */
  /* useEffect(() => {
    if (formStandard.isSubmitting) formBasic.trigger();
  }, [formStandard.isSubmitting]); */

  const handleCreate = async (body: CreateForm) => {
    const { destinationIds, ...payload } = body;
    console.log("🚀 ~ handleCreate ~ body:", body);
    await createBasic({
      ...payload,
      destinations: [destinationIds], // FIXME: Destinations del body debe ser un array.
    });
  };

  const handleSubmitError = (errors: FieldErrors<CreateForm>) => {};

  return {
    form,
    handleCreate,
    handleSubmitError,
  };
};
