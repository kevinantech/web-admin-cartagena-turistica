import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { GetCategoryData, GetDestinationData } from "@/data/models";
import type React from "react";
import { type UseBasicInfoFormReturn } from "./basic-info-form.hook";
import { Switch } from "@/components/ui/switch";
import { Controller } from "react-hook-form";
import { CurrencyInput } from "@/components/ui/currency-input";

export type BasicInfoFormProps = {
  form: UseBasicInfoFormReturn;
  categories: GetCategoryData;
  destinations: GetDestinationData;
};

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({
  form: {
    errors,
    control,
    isReservationAutomatic,
    register,
    setCategoryId,
    setBookingMode,
    setDestinations,
  },
  categories,
  destinations,
}) => {
  return (
    <>
      <div className="space-y-4">
        <h3 className="mb-0 text-lg font-semibold text-gray-800">Información Básica</h3>
        <hr className="mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-3">
            <Label htmlFor="name">Nombre del Plan</Label>
            <Input
              id="name"
              placeholder="Ej: Islas del Rosario"
              {...register("name")}
              error={!!errors.name}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label>Categoría</Label>
            <Select {...register("categoryId")} onValueChange={setCategoryId}>
              <SelectTrigger error={!!errors.categoryId}>
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category._id} value={category._id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-3">
            <Label>Destino</Label>
            <Select {...register("destinations")} onValueChange={setDestinations}>
              <SelectTrigger error={!!errors.destinations}>
                <SelectValue placeholder="Selecciona un destino" />
              </SelectTrigger>
              <SelectContent>
                {destinations.map((destination) => (
                  <SelectItem key={destination._id} value={destination._id.toString()}>
                    {destination.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="description">Descripción</Label>
          <Textarea
            id="description"
            placeholder="Describe las características del plan turístico"
            {...register("description")}
            error={!!errors.description}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Switch
            id="automaticReservation"
            checked={isReservationAutomatic}
            onCheckedChange={setBookingMode}
          />
          <Label htmlFor="automaticReservation">Reservación Automática</Label>
        </div>

        {!isReservationAutomatic && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="flex flex-col gap-3">
              <Label htmlFor="displayPrice">Precio</Label>
              <Controller
                name="displayPrice"
                control={control}
                render={({ field }) => (
                  <CurrencyInput
                    id="displayPrice"
                    error={!!errors.displayPrice}
                    onBlur={field.onBlur}
                    placeholder="$"
                    defaultValue={0}
                    onValueChange={(value, name, values) => field.onChange(values?.float)}
                  />
                )}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BasicInfoForm;
