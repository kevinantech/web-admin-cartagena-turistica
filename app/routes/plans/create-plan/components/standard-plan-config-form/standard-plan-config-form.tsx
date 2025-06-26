/* import { Button } from "@/components/ui/button";
import { CurrencyInput } from "@/components/ui/currency-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign, Plus, Trash, Users, Wrench } from "lucide-react";
import { Controller } from "react-hook-form";
import type { UseStandardPlanConfigFormReturn } from "./standard-plan-config-form.hook";

export type StandardPlanConfigFormProps = {
  form: UseStandardPlanConfigFormReturn;
};

const StandardPlanConfigForm: React.FC<StandardPlanConfigFormProps> = ({
  form: {
    errors,
    control,
    schedules,
    pricesPerGroup,
    register,
    appendSchedule,
    removeSchedule,
    appendPricePerGroup,
    removePricePerGroup,
  },
}) => {
  const AppendGroupButton = () => (
    <Button size="sm" type="button" variant="outline" onClick={appendPricePerGroup}>
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
        // Restrictions
      }
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-3">
          <Label htmlFor="maxPeopleAllowed">Máx. Personas/Horario</Label>
          <Input
            id="maxPeopleAllowed"
            type="number"
            placeholder="Ej: 50"
            {...register("maxPeopleAllowed", {
              valueAsNumber: true,
            })}
            error={!!errors.maxPeopleAllowed}
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="maxBookingsAllowed">Máx. Reservas/Horario</Label>
          <Input
            id="maxBookingsAllowed"
            type="number"
            placeholder="Ej: 10"
            {...register("maxBookingsAllowed", {
              valueAsNumber: true,
            })}
            error={!!errors.maxBookingsAllowed}
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="minPeoplePerBooking">Min. Personas / Reservas</Label>
          <Input
            id="minPeoplePerBooking"
            type="number"
            placeholder="Ej: 2"
            {...register("minPeoplePerBooking", {
              valueAsNumber: true,
            })}
            error={!!errors.minPeoplePerBooking}
            min="1"
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="maxPeoplePerBooking">Máx. Personas / Reservas</Label>
          <Input
            id="maxPeoplePerBooking"
            type="number"
            error={!!errors.maxPeoplePerBooking}
            placeholder="Ej: 20"
            {...register("maxPeoplePerBooking", {
              valueAsNumber: true,
            })}
          />
        </div>
      </div>

      {
        //Schedule Configuration
      }
      <div className="space-y-4 mb-8 rounded-lg p-4 bg-gray-50">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-gray-800">Horarios Disponibles</h4>
          <Button type="button" onClick={appendSchedule} size="sm" variant="outline">
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
              <Label>Hora Inicio</Label>
              <Input
                type="time"
                {...register(`schedules.${index}.startTime`)}
                error={!!errors.schedules?.[index]?.startTime}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label>Hora Fin</Label>
              <Input
                type="time"
                {...register(`schedules.${index}.endTime`)}
                error={!!errors.schedules?.[index]?.endTime}
              />
            </div>

            <div className="flex items-end">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeSchedule(index)}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {
        // Price Configuration
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
                name="pricePerPerson"
                control={control}
                render={({ field }) => (
                  <CurrencyInput
                    id="pricePerPerson"
                    error={!!errors.pricePerPerson}
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
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
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
                    error={!!errors.pricesPerGroup?.[index]?.minPeople}
                    placeholder="Ej: 2"
                    {...register(`pricesPerGroup.${index}.minPeople`, {
                      valueAsNumber: true,
                    })}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Máx. Personas</Label>
                  <Input
                    type="number"
                    error={!!errors.pricesPerGroup?.[index]?.maxPeople}
                    placeholder="Ej: 4"
                    {...register(`pricesPerGroup.${index}.maxPeople`, {
                      valueAsNumber: true,
                    })}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor={`pricesPerGroup.${index}`}>Precio</Label>
                  <Controller
                    name={`pricesPerGroup.${index}.amount`}
                    control={control}
                    render={({ field }) => (
                      <CurrencyInput
                        id={`pricesPerGroup.${index}`}
                        error={!!errors.pricesPerGroup?.[index]?.amount}
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

export default StandardPlanConfigForm;
 */
