import { ApiRoutes } from "@/common/enums/api-routes-enum";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import api from "@/data/api";
import type { GetCategoryData, GetDestinationData } from "@/data/models";
import { ArrowLeft, DollarSign, Plus, Trash, Users, Wrench } from "lucide-react";
import type { Route } from "../../../+types/root";
import useModel from "./create-plan.model";
import { Controller } from "react-hook-form";

export function meta() {
  return [{ title: "Crear plan" }];
}

export async function clientLoader() {
  const { data: categories } = await api.get<GetCategoryData>(ApiRoutes.Category);

  const { data: destinations } = await api.get<GetDestinationData>(ApiRoutes.Destination);

  return {
    categories,
    destinations,
  };
}

export default function ({
  loaderData,
}: Omit<Route.ComponentProps, "loaderData"> & {
  loaderData: Awaited<ReturnType<typeof clientLoader>>;
}) {
  const { form, navigateToPlans, handleCreate } = useModel();
  const { categories, destinations } = loaderData;

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={navigateToPlans} className="flex items-center">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver a Planes
      </Button>
      <Card>
        <CardHeader>
          <CardTitle className="text-cyan-900">Nuevo Plan Turístico</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreate} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="mb-0 text-lg font-semibold text-gray-800">
                Información Básica
              </h3>
              <hr className="mb-8" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="name">Nombre del Plan</Label>
                  <Input
                    id="name"
                    placeholder="Ej: Islas del Rosario"
                    {...form.root.register("name")}
                    error={!!form.root.errors.name}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <Label>Categoría</Label>
                  <Select
                    {...form.root.register("categoryId")}
                    onValueChange={form.root.setCategoryId}
                  >
                    <SelectTrigger error={!!form.root.errors.categoryId}>
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
                  <Select
                    {...form.root.register("destinations")}
                    onValueChange={form.root.setDestinations}
                  >
                    <SelectTrigger error={!!form.root.errors.destinations}>
                      <SelectValue placeholder="Selecciona un destino" />
                    </SelectTrigger>
                    <SelectContent>
                      {destinations.map((destination) => (
                        <SelectItem
                          key={destination._id}
                          value={destination._id.toString()}
                        >
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
                  {...form.root.register("description")}
                  error={!!form.root.errors.description}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Switch
                  id="automaticReservation"
                  checked={form.root.isReservationAutomatic}
                  onCheckedChange={form.root.setBookingMode}
                />
                <Label htmlFor="automaticReservation">Reservación Automática</Label>
              </div>

              {/* Booking Information */}
              {form.root.isReservationAutomatic ? (
                <>
                  <h3 className="mt-8 mb-0 text-lg font-semibold text-gray-800 flex items-center">
                    <Wrench className="w-5 h-5 mr-2" />
                    Restricciones
                  </h3>
                  <hr className="mb-8" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-3">
                      <Label htmlFor="maxPeopleAllowed">Máx. Personas/Horario</Label>
                      <Input
                        id="maxPeopleAllowed"
                        type="number"
                        placeholder="Ej: 50"
                        {...form.standard.register("maxPeopleAllowed")}
                        error={!!form.standard.errors.maxPeopleAllowed}
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <Label htmlFor="maxBookingsAllowed">Máx. Reservas/Horario</Label>
                      <Input
                        id="maxBookingsAllowed"
                        type="number"
                        placeholder="Ej: 10"
                        {...form.standard.register("maxBookingsAllowed")}
                        error={!!form.standard.errors.maxBookingsAllowed}
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <Label htmlFor="minPeoplePerBooking">Min. Personas</Label>
                      <Input
                        id="minPeoplePerBooking"
                        type="number"
                        placeholder="Ej: 2"
                        {...form.standard.register("minPeoplePerBooking")}
                        error={!!form.standard.errors.minPeoplePerBooking}
                        min="1"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <Label htmlFor="maxPeoplePerBooking">Máx. Personas</Label>
                      <Input
                        id="maxPeoplePerBooking"
                        type="number"
                        placeholder="Ej: 20"
                        {...form.standard.register("maxPeoplePerBooking")}
                        error={!!form.standard.errors.maxPeoplePerBooking}
                        min="1"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold text-gray-800">
                        Horarios Disponibles
                      </h4>
                      <Button
                        type="button"
                        onClick={form.standard.appendSchedule}
                        size="sm"
                        variant="outline"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Agregar Horario
                      </Button>
                    </div>

                    {form.standard.schedules.map((schedule, index) => (
                      <div
                        key={schedule.id}
                        className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 bg-white rounded-lg border"
                      >
                        <div className="flex flex-col gap-3">
                          <Label>Hora Inicio</Label>
                          <Input
                            type="time"
                            {...form.standard.register(`schedules.${index}.startTime`)}
                            error={!!form.standard.errors.schedules?.[index]?.startTime}
                            required
                          />
                        </div>
                        <div className="flex flex-col gap-3">
                          <Label>Hora Fin</Label>
                          <Input
                            type="time"
                            {...form.standard.register(`schedules.${index}.endTime`)}
                            error={!!form.standard.errors.schedules?.[index]?.endTime}
                            required
                          />
                        </div>

                        <div className="flex items-end">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => form.standard.removeSchedule(index)}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <Trash className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Price Configuration */}
                  <div className="space-y-4">
                    <div className="mt-8 flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                        <DollarSign className="w-5 h-5 mr-2" />
                        Configuración de Precios
                      </h3>
                      <Button
                        type="button"
                        /* onClick={addPriceRange} */ size="sm"
                        variant="outline"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Agregar Rango
                      </Button>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="price">Precio Base</Label>
                      <Input
                        id="price"
                        /* value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})} */
                        placeholder="Ej: $450.000"
                        required
                      />
                    </div>

                    {form.standard.pricePerGroup.length > 0 && (
                      <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold text-gray-800 flex items-center">
                          <Users className="w-4 h-4 mr-2" />
                          Precios por Rangos de Personas
                        </h4>

                        {form.standard.pricePerGroup.map((range) => (
                          <div
                            key={range.id}
                            className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-white rounded-lg border"
                          >
                            <div className="flex flex-col gap-2">
                              <Label>Mín. Personas</Label>
                              <Input
                                type="number"
                                value={range.minPeople}
                                /* onChange={(e) => updatePriceRange(range.id, 'minPeople', e.target.value)} */
                                placeholder="Ej: 2"
                                min="1"
                                required
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <Label>Máx. Personas</Label>
                              <Input
                                type="number"
                                value={range.maxPeople}
                                /* onChange={(e) => updatePriceRange(range.id, 'maxPeople', e.target.value)} */
                                placeholder="Ej: 4"
                                min="1"
                                required
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <Label>Precio</Label>
                              <Input
                                type="number"
                                value={range.amount}
                                /*  onChange={(e) => updatePriceRange(range.id, 'price', e.target.value)} */
                                placeholder="Ej: 450000"
                                min="0"
                                step="1000"
                                required
                              />
                            </div>
                            <div className="flex items-end">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                /*  onClick={() => removePriceRange(range.id)} */
                                className="text-red-600 border-red-200 hover:bg-red-50"
                              >
                                <Trash className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="flex flex-col gap-3">
                    <Label htmlFor="displayPrice">Precio</Label>
                    <Controller
                      name="displayPrice"
                      control={form.root.control}
                      render={({ field }) => (
                        <CurrencyInput
                          id="displayPrice"
                          error={!!form.root.errors.displayPrice}
                          onBlur={field.onBlur}
                          placeholder="$"
                          onValueChange={(value, name, values) =>
                            field.onChange(values?.float)
                          }
                          defaultValue={field.value}
                          allowNegativeValue={false}
                        />
                      )}
                    />

                    {/* <Input
                      id="displayPrice"
                      placeholder="$"
                      type="number"
                      {...form.root.register("displayPrice", {
                        valueAsNumber: true,
                      })}
                      error={!!form.root.errors.displayPrice}
                    /> */}
                  </div>
                </div>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
