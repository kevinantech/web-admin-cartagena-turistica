import { ApiRoute } from "@/common/enums/api-route-enum";
import { PricingType, RestrictionMode } from "@/common/enums/common-enums";
import { CreatePlanDto } from "@/data/dto/plan/create-plan.dto";
import type { CreatePlanData } from "@/data/models";
import { toast } from "@/hooks/useToast";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useState } from "react";
import { useForm, type FieldErrors } from "react-hook-form";
import httpClient from "~/lib/http/http-client";

const getFormattedBody = (b: CreatePlanDto) => {
  const { reservable, _reservable, ...base } = b;
  if (b._reservable) return { ...base, reservable };
  else return base;
};

export default () => {
  const form = useForm({
    mode: "all",
    defaultValues: {
      _reservable: false,
      reservable: {
        restrictionBy: RestrictionMode.PEOPLE,
        schedule: [{}],
        pricingType: PricingType.PER_PERSON,
      },
    },
    resolver: classValidatorResolver(CreatePlanDto),
  });

  const reset = () => [form.reset(), _setPictures([])];

  const [_pictures, _setPictures] = useState<File[]>([]);
  const pictures = { value: _pictures, set: _setPictures };

  const handleCreate = async (body: CreatePlanDto) => {
    if (!_pictures.length) {
      return toast({
        title: "Error",
        description: "Debe cargar al menos una imagen",
        variant: "destructive",
      });
    }

    const data = getFormattedBody(body);
    const formData = new FormData();
    _pictures.forEach((_p) => formData.append("pictures", _p));
    try {
      const response = await httpClient.post<CreatePlanData>(ApiRoute.PLANS, data);
      const URL = `${ApiRoute.PLANS}/${response.data.id}/pictures`;
      const _response = await httpClient.post(URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (_response.status === 201) {
        reset();
        return toast({
          title: `${body.name} creado`,
          description: `${body.name} ha sido creado exitosamente`,
        });
      } else {
        return toast({
          title: "Error",
          description: "Las imágenes no se pudieron guardar",
          variant: "destructive",
        });
      }
    } catch (error) {}
  };

  const handleSubmitError = (errors: FieldErrors<CreatePlanDto>) => {
    if (errors.reservable?.pricesPerGroup?.root) {
      return toast({
        title: "Error en la configuración de precios",
        description: "Revise que los rangos de precios sean continuos",
        variant: "destructive",
      });
    }
  };

  return {
    form,
    pictures,
    handleCreate,
    handleSubmitError,
  };
};
