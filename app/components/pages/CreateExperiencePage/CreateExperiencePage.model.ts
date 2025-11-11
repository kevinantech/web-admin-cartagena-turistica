import { CreateExperienceDto } from "@/common/data/dto/create-experience.dto";
import type { Categories, Destinations } from "@/common/data/interfaces";
import { ApiRoute } from "@/common/enums/api-route-enum";
import { PricingType, RestrictionMode } from "@/common/enums/domain-enums";
import type { CreateExperienceData } from "@/data/models";
import { toast } from "@/hooks/useToast";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useState } from "react";
import { useForm, type FieldErrors } from "react-hook-form";
import httpClient from "~/lib/http/http-client";

/**
 * Formats the DTO body by conditionally including the `reservable` property
 * based on the `_reservable` flag.
 */
const getFormattedBody = (b: CreateExperienceDto) => {
  const { reservable, _reservable, ...base } = b;
  if (b._reservable) return { ...base, reservable };
  else return base;
};

export type CreateExperiencePageHook = ReturnType<typeof vm>;
export type Params = { categories: Categories; destinations: Destinations };

/**
 * View model hook for the Create Experience page.
 *
 * Manages form state, picture uploads, and experience creation logic.
 * Handles both reservable and non-reservable experience types.
 */
export const vm = ({ categories, destinations }: Params) => {
  const form = useForm({
    mode: "all",
    defaultValues: {
      _reservable: false,
      tourStops: [],
      reservable: {
        restrictionBy: RestrictionMode.MAX_PEOPLE,
        schedule: [{}],
        pricingType: PricingType.PER_PERSON,
        pricesPerGroup: [],
      },
    },
    resolver: classValidatorResolver(CreateExperienceDto),
  });

  const reset = () => [form.reset(), _setPictures([])];

  const [_pictures, _setPictures] = useState<File[]>([]);
  const pictures = { value: _pictures, set: _setPictures };

  /**
   * Creates a new experience and uploads associated pictures.
   *
   * The process involves:
   * 1. Validating that at least one picture is uploaded
   * 2. Formatting the DTO body (conditionally including reservable data)
   * 3. Creating the experience via API
   * 4. Uploading pictures to the created experience
   * 5. Resetting the form on success
   */
  const createExperience = async (body: CreateExperienceDto) => {
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
      const response = await httpClient.post<CreateExperienceData>(
        ApiRoute.EXPERIENCES,
        data
      );
      const URL = `${ApiRoute.EXPERIENCES}/${response.data.id}/pictures`;
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

  /**
   * Handles form submission errors and displays appropriate toast notifications.
   * Currently handles errors related to price group configuration validation.
   */
  const handleSubmitError = (errors: FieldErrors<CreateExperienceDto>) => {
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
    categories,
    destinations,
    createExperience,
    handleSubmitError,
  };
};
