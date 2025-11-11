import { PricingType, RestrictionMode } from "@/common/enums/domain-enums";
import { Button } from "@/components/ui/button";
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
import { DollarSign, Plus, Trash, Users, Wrench } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useFieldArray } from "react-hook-form";
import { useCreateExperiencePage } from "./CreateExperiencePage.context";
export type ReservableFormProps = {};

const ReservableForm: React.FC<ReservableFormProps> = ({}) => {
  const { form } = useCreateExperiencePage();
  const {
    control,
    formState: { errors },
    watch,
    register,
    setValue,
  } = form;

  const {
    fields: schedules,
    append: appendSchedule,
    remove: removeSchedule,
  } = useFieldArray({
    name: "reservable.schedule",
    control,
  });

  const {
    fields: pricesPerGroup,
    append: appendPricePerGroup,
    remove: removePricePerGroup,
  } = useFieldArray({
    name: "reservable.pricesPerGroup",
    control,
  });

  // Depende del defaultValue del useForm definido en un primer momento.
  const [restrictionBy_defaultValue] = useState(watch("reservable.restrictionBy"));

  const restrByPeople = watch("reservable.restrictionBy") === RestrictionMode.MAX_PEOPLE;
  const pricingType = watch("reservable.pricingType");

  // Permite establecer el pricingType
  useEffect(() => {
    if (pricingType === PricingType.PER_GROUP && pricesPerGroup.length === 0) {
      setValue("reservable.pricingType", PricingType.PER_PERSON);
    } else if (pricingType === PricingType.PER_PERSON && pricesPerGroup.length > 0) {
      setValue("reservable.pricingType", PricingType.PER_GROUP);
    }
  }, [pricesPerGroup]);

  const AppendGroupButton = () => (
    <Button
      size="sm"
      type="button"
      variant="outline"
      onClick={() => appendPricePerGroup({} as any)}
    >
      <Plus className="w-4 h-4 mr-2" />
      Agregar Rango
    </Button>
  );

  return (
    <div className="space-y-4">
      <h3 className="mt-8 mb-0 text-lg font-semibold text-gray-800 flex items-center">
        <Wrench className="w-5 h-5 mr-2" />
        Restricciones
      </h3>
      <hr className="mb-8" />

      {
        // Restricciones.
      }

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-3">
          <Label>¿Cómo deseas limitar las reservas?</Label>
          <Select
            {...register("reservable.restrictionBy")}
            defaultValue={restrictionBy_defaultValue}
            onValueChange={(v: RestrictionMode) =>
              setValue("reservable.restrictionBy", v)
            }
          >
            <SelectTrigger error={!!errors.reservable?.restrictionBy}>
              <SelectValue placeholder="Selecciona" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={RestrictionMode.MAX_PEOPLE}>
                Por cantidad de personas
              </SelectItem>
              <SelectItem value={RestrictionMode.MAX_BOOKINGS}>
                Por cantidad de reservas
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        {
          <div className="flex flex-col gap-3">
            <Label htmlFor="maxPeopleOrBookings">
              Cantidad de {`${restrByPeople ? "personas" : "reservas"}`}
            </Label>
            <Input
              id="maxPeopleOrBookings"
              type="number"
              placeholder="Ej: 50"
              {...register(
                restrByPeople
                  ? "reservable.maxPeopleAllowed"
                  : "reservable.maxBookingsAllowed",
                {
                  valueAsNumber: true,
                }
              )}
              error={
                restrByPeople
                  ? !!errors.reservable?.maxPeopleAllowed
                  : !!errors.reservable?.maxBookingsAllowed
              }
            />
          </div>
        }
        <div className="flex flex-col gap-3">
          <Label htmlFor="minPeoplePerBooking">Min. Personas / Reservas</Label>
          <Input
            id="minPeoplePerBooking"
            type="number"
            placeholder="Ej: 2"
            {...register("reservable.minPeoplePerBooking", {
              valueAsNumber: true,
            })}
            error={!!errors.reservable?.minPeoplePerBooking}
            min="1"
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="maxPeoplePerBooking">Máx. Personas / Reservas</Label>
          <Input
            id="maxPeoplePerBooking"
            type="number"
            error={!!errors.reservable?.maxPeoplePerBooking}
            placeholder="Ej: 20"
            {...register("reservable.maxPeoplePerBooking", {
              valueAsNumber: true,
            })}
          />
        </div>
      </div>

      {
        // Horarios.
      }
      <div className="space-y-4 mb-8 rounded-lg p-4 bg-gray-50">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-gray-800">Horarios Disponibles</h4>
          <Button
            type="button"
            onClick={() => appendSchedule({} as any)}
            size="sm"
            variant="outline"
          >
            <Plus className="w-4 h-4 mr-2" />
            Agregar Horario
          </Button>
        </div>

        {schedules.map((schedule, index) => (
          <div
            key={schedule.id}
            className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 bg-white rounded-lg border"
          >
            <div className="flex flex-col gap-3">
              <Label>Hora Inicio - {index + 1}</Label>
              <div className="flex items-center gap-4">
                <Input
                  type="time"
                  {...register(`reservable.schedule.${index}.start`)}
                  error={!!errors.reservable?.schedule?.[index]?.start}
                />
                <Button
                  size="sm"
                  type="button"
                  title="Remover"
                  variant="outline"
                  disabled={index === 0 && schedules.length <= 1}
                  onClick={() => removeSchedule(index)}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {
        // Configuración de precios.
      }
      <div className="space-y-4">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1 flex items-center">
            <DollarSign className="w-5 h-5 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">
              Configuración de Precios
            </h3>
            <hr className="absolute bottom-0 w-full" />
          </div>
          {pricesPerGroup.length === 0 && <AppendGroupButton />}
        </div>
        {pricesPerGroup.length === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="pricePerPerson">Precio Base</Label>
              <Controller
                name="reservable.pricePerPerson"
                control={control}
                render={({ field }) => (
                  <CurrencyInput
                    id="pricePerPerson"
                    error={!!errors.reservable?.pricePerPerson}
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

        {pricesPerGroup.length > 0 && (
          <div
            className={`space-y-4 p-4 bg-gray-50 rounded-lg ${
              errors.reservable?.pricesPerGroup?.root ? "border border-destructive" : ""
            }`}
          >
            <h4 className="font-semibold text-gray-800 flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Precios por Rangos de Personas
            </h4>

            {pricesPerGroup.map((group, index) => (
              <div
                key={group.id}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-white rounded-lg border"
              >
                <div className="flex flex-col gap-2">
                  <Label>Mín. Personas</Label>
                  <Input
                    type="number"
                    error={!!errors.reservable?.pricesPerGroup?.[index]?.from}
                    placeholder="Ej: 2"
                    {...register(`reservable.pricesPerGroup.${index}.from`, {
                      valueAsNumber: true,
                    })}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Máx. Personas</Label>
                  <Input
                    type="number"
                    error={!!errors.reservable?.pricesPerGroup?.[index]?.to}
                    placeholder="Ej: 4"
                    {...register(`reservable.pricesPerGroup.${index}.to`, {
                      valueAsNumber: true,
                    })}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor={`pricesPerGroup.${index}`}>Precio</Label>
                  <Controller
                    name={`reservable.pricesPerGroup.${index}.amount`}
                    control={control}
                    render={({ field }) => (
                      <CurrencyInput
                        id={`pricesPerGroup.${index}`}
                        error={!!errors.reservable?.pricesPerGroup?.[index]?.amount}
                        onBlur={field.onBlur}
                        placeholder="$"
                        defaultValue={0}
                        onValueChange={(value, name, values) =>
                          field.onChange(values?.float)
                        }
                      />
                    )}
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    size="sm"
                    type="button"
                    variant="outline"
                    onClick={() => removePricePerGroup(index)}
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
            <AppendGroupButton />
          </div>
        )}
      </div>
    </div>
  );
};

export { ReservableForm };
