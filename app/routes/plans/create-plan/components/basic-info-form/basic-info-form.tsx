import { CurrencyInput } from "@/components/ui/currency-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { GetCategoryData, GetDestinationData } from "@/data/models";
import type React from "react";
import { Controller, type UseFormReturn } from "react-hook-form";
import type { CreateForm } from "../../create-plan.model";

export type BasicInfoFormProps = {
  form: UseFormReturn<CreateForm>;
  categories: GetCategoryData;
  destinations: GetDestinationData;
};

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({
  form: {
    control,
    formState: { errors },
    register,
    setValue,
    watch,
  },
  categories,
  destinations,
}) => {
  const isReservable = watch("reservable");

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
            <Select
              {...register("categoryId")}
              onValueChange={(v) => setValue("categoryId", v)}
            >
              <SelectTrigger error={!!errors.categoryId}>
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-3">
            <Label>Destino</Label>
            <Select
              {...register("destinationIds")}
              onValueChange={(v) => setValue("destinationIds", v)}
            >
              <SelectTrigger error={!!errors.destinationIds}>
                <SelectValue placeholder="Selecciona un destino" />
              </SelectTrigger>
              <SelectContent>
                {destinations.map((destination) => (
                  <SelectItem key={destination.id} value={destination.id}>
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
          <Controller
            name="reservable"
            control={control}
            render={({ field }) => (
              <Switch
                id="reservable"
                checked={isReservable}
                defaultChecked={false}
                onCheckedChange={(v) => {
                  field.onChange(v);
                }}
                onBlur={field.onBlur}
              />
            )}
          />

          <Label htmlFor="automaticReservation">Reservación Automática</Label>
        </div>

        {!isReservable && (
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
