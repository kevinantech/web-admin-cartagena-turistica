import { CurrencyInput } from "@/components/ui/currency-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type React from "react";
import { useContext } from "react";
import { Controller } from "react-hook-form";
import { CreateExperienceContext } from "../../create-experience.context";
import { ImageUpload } from "@/components/ui/image-upload";

export type BasicFormProps = {};

const BasicForm: React.FC<BasicFormProps> = ({}) => {
  const { form, pictures, categories, destinations } = useContext(
    CreateExperienceContext
  );
  const {
    control,
    formState: { errors },
    watch,
    register,
    setValue,
  } = form;
  const _reservable = watch("_reservable");

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
            <Label htmlFor="providerName">Proveedor de servicios</Label>
            <Input
              id="providerName"
              placeholder="Ej. Mambo"
              {...register("providerName")}
              error={!!errors.providerName}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label>Ubicación</Label>
            <Select
              {...register("originCityId")}
              onValueChange={(v) => setValue("originCityId", v)}
            >
              <SelectTrigger error={!!errors.originCityId}>
                <SelectValue placeholder="Selecciona una ubicación" />
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
            <Label htmlFor="destinations">Destinos</Label>
            <Controller
              name="destinationIds"
              control={control}
              render={({ field, fieldState }) => (
                <MultiSelect
                  options={destinations.map((d) => ({ label: d.name, value: d.id }))}
                  selected={field.value ?? []}
                  onChange={(value) => field.onChange(value)}
                  placeholder="Selecciona los destinos"
                  error={!!fieldState.error}
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="contactPhone">Número de contacto</Label>
            <Input
              id="contactPhone"
              type="number"
              placeholder="+57 305 321 1234"
              {...register("contactPhone")}
              error={!!errors.contactPhone}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="duration">Duración (horas)</Label>
            <Input
              id="duration"
              type="number"
              placeholder="Ej: 3"
              {...register("duration", { valueAsNumber: true })}
              error={!!errors.duration}
            />
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
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Imágenes del Plan</h3>
          <ImageUpload images={pictures.value} onChange={pictures.set} maxImages={5} />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Controller
            name="_reservable"
            control={control}
            render={({ field }) => (
              <Switch
                checked={_reservable}
                onCheckedChange={(v) => {
                  field.onChange(v);
                }}
                onBlur={field.onBlur}
              />
            )}
          />

          <Label htmlFor="automaticReservation">Reservación Automática</Label>
        </div>

        {!_reservable && (
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

export default BasicForm;
