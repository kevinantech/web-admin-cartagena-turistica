import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreateReservationDto } from "@/data/dto/experience/create-reservation.dto";
import type { Experience } from "@/data/models/experience.model";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { Calendar, User } from "lucide-react";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import httpClient from "~/lib/http/http-client";

export type ReservationFormProps = {
  experience: Experience;
  onComplete: () => void;
  onCancel: () => void;
};

export const ReservationForm: React.FC<ReservationFormProps> = ({
  experience,
  onComplete,
  onCancel,
}) => {
  const {
    formState: { errors, isSubmitting },
    watch,
    register,
    handleSubmit,
  } = useForm({
    resolver: classValidatorResolver(CreateReservationDto),
  });

  const numberOfPeople = watch("numberOfPeople");

  const price = useMemo(() => {
    if (experience.reservable) {
      if (numberOfPeople && experience.reservable.pricesPerGroup) {
        const matchingRange = experience.reservable?.pricesPerGroup.find(
          (range) => numberOfPeople >= range.from && numberOfPeople <= range.to
        );

        if (matchingRange) return matchingRange.amount;
      }
      return experience.reservable.pricesPerPerson * numberOfPeople;
    }
  }, [numberOfPeople]);

  const handleCreateReservation = async (body: CreateReservationDto) => {
    console.log("🚀 ~ handleCreateReservation ~ body:", body);
    try {
      const { data } = await httpClient.post<{ payment_url: string }>(
        `experiences/${experience._id}/bookings`,
        body
      );

      if (data?.payment_url) window.open(data.payment_url, "_blank");
    } catch (error) {
      console.log("🚀 ~ handleCreateReservation ~ error:", error);
    }
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  return (
    <form onSubmit={handleSubmit(handleCreateReservation)} className="space-y-6">
      {/* Customer Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="w-5 h-5 mr-2" />
            Información Personal
          </CardTitle>
          <CardDescription>Datos del responsable de la reserva</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="firstName">Nombre *</Label>
              <Input
                id="firstName"
                placeholder="Tu nombre"
                {...register("firstName", { required: "El nombre es requerido" })}
                error={!!errors.firstName}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="lastName">Apellido *</Label>
              <Input
                id="lastName"
                placeholder="Tu apellido"
                {...register("lastName")}
                error={!!errors.lastName}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                {...register("contactEmail")}
                error={!!errors.contactEmail}
                placeholder="tu@email.com"
                className="flex items-center"
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="phone">Teléfono *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+57 300 123 4567"
                {...register("contactPhone")}
                error={!!errors.contactPhone}
                className="flex items-center"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reservation Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Detalles de la Reserva
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="numberOfPeople">Número de Personas *</Label>
              <Input
                id="numberOfPeople"
                type="number"
                {...register("numberOfPeople", { valueAsNumber: true })}
                error={!!errors.numberOfPeople}
                placeholder="¿Cuántas personas?"
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="selectedDate">Fecha de la Visita *</Label>
              <Input
                id="selectedDate"
                type="date"
                min={getTomorrowDate()}
                {...register("reservationDate")}
                error={!!errors.reservationDate}
              />
            </div>
          </div>

          {/* Schedule Selection */}
          {/* {experience.schedules && experience.schedules.length > 0 && (
            <div>
              <Label htmlFor="selectedSchedule">Horario Disponible *</Label>
              <Select
                value={formData.selectedSchedule}
                onValueChange={(value) => handleInputChange("selectedSchedule", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un horario" />
                </SelectTrigger>
                <SelectContent>
                  {experience.schedules.map((schedule) => (
                    <SelectItem key={schedule.id} value={schedule.id.toString()}>
                      <div className="flex items-center justify-between w-full">
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          {schedule.startTime} - {schedule.endTime}
                        </span>
                        <span className="flex items-center ml-4 text-sm text-gray-600">
                          <Users className="w-3 h-3 mr-1" />
                          Máx. {schedule.maxPeople} personas
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )} */}
        </CardContent>
      </Card>

      {/* Price Information */}
      {/* {selectedPriceRange && calculatedPrice > 0 && (
        <Card className="bg-cyan-50 border-cyan-200">
          <CardHeader>
            <CardTitle className="flex items-center text-cyan-700">
              <DollarSign className="w-5 h-5 mr-2" />
              Resumen de Precios
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Rango de personas:</span>
                <span>
                  {selectedPriceRange.minPeople} - {selectedPriceRange.maxPeople} personas
                </span>
              </div>
              <div className="flex justify-between">
                <span>Precio por persona:</span>
                <span>${parseInt(selectedPriceRange.price).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Número de personas:</span>
                <span>{formData.numberOfPeople}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-lg text-cyan-700">
                <span>Total:</span>
                <span>${calculatedPrice.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )} */}

      {/* Form Actions */}
      <div className="flex justify-end space-x-4 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button
          type={experience.reservable ? "submit" : "button"}
          className="bg-cyan-600 hover:bg-cyan-700"
          disabled={isSubmitting}
        >
          Confirmar Reserva
        </Button>
      </div>
    </form>
  );
};
