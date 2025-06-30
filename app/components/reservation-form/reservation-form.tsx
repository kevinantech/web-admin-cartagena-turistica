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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/useToast";
import { Calendar, Clock, DollarSign, User, Users } from "lucide-react";
import React, { useState } from "react";

interface Schedule {
  id: number;
  startTime: string;
  endTime: string;
  maxReservations: string;
  maxPeople: string;
}

interface PriceRange {
  id: number;
  minPeople: string;
  maxPeople: string;
  price: string;
}

interface Plan {
  id: number;
  name: string;
  location: string;
  price: string;
  description: string;
  image: string;
  category?: string;
  destinations?: string[];
  durationAmount?: string;
  durationUnit?: string;
  automaticReservation?: boolean;
  schedules?: Schedule[];
  priceRanges?: PriceRange[];
}

interface ReservationFormProps {
  plan: Plan;
  onComplete: () => void;
  onCancel: () => void;
}

export const ReservationForm: React.FC<ReservationFormProps> = ({
  plan,
  onComplete,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    numberOfPeople: "",
    selectedDate: "",
    selectedSchedule: "",
    specialRequests: "",
  });

  const [selectedPriceRange, setSelectedPriceRange] = useState<PriceRange | null>(null);
  const [calculatedPrice, setCalculatedPrice] = useState<number>(0);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Calculate price when number of people changes
    if (field === "numberOfPeople" && value && plan.priceRanges) {
      const numPeople = parseInt(value);
      const matchingRange = plan.priceRanges.find(
        (range) =>
          numPeople >= parseInt(range.minPeople) && numPeople <= parseInt(range.maxPeople)
      );

      if (matchingRange) {
        setSelectedPriceRange(matchingRange);
        setCalculatedPrice(parseInt(matchingRange.price) * numPeople);
      } else {
        setSelectedPriceRange(null);
        setCalculatedPrice(0);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.numberOfPeople ||
      !formData.selectedDate
    ) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive",
      });
      return;
    }

    // If plan has schedules, validate schedule selection
    if (plan.schedules && plan.schedules.length > 0 && !formData.selectedSchedule) {
      toast({
        title: "Error",
        description: "Por favor selecciona un horario",
        variant: "destructive",
      });
      return;
    }

    // Simulate reservation submission
    toast({
      title: "¡Reserva exitosa!",
      description: `Tu reserva para ${plan.name} ha sido confirmada. Te contactaremos pronto.`,
    });

    console.log("Reservation data:", {
      plan: plan.name,
      customer: formData,
      priceRange: selectedPriceRange,
      totalPrice: calculatedPrice,
    });

    onComplete();
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="w-5 h-5 mr-2" />
            Información Personal
          </CardTitle>
          <CardDescription>Datos del responsable de la reserva</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">Nombre *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                placeholder="Tu nombre"
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Apellido *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                placeholder="Tu apellido"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="tu@email.com"
                required
                className="flex items-center"
              />
            </div>
            <div>
              <Label htmlFor="phone">Teléfono *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+57 300 123 4567"
                required
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
            <div>
              <Label htmlFor="numberOfPeople">Número de Personas *</Label>
              <Input
                id="numberOfPeople"
                type="number"
                min="1"
                value={formData.numberOfPeople}
                onChange={(e) => handleInputChange("numberOfPeople", e.target.value)}
                placeholder="¿Cuántas personas?"
                required
              />
            </div>
            <div>
              <Label htmlFor="selectedDate">Fecha de la Visita *</Label>
              <Input
                id="selectedDate"
                type="date"
                min={getTomorrowDate()}
                value={formData.selectedDate}
                onChange={(e) => handleInputChange("selectedDate", e.target.value)}
                required
              />
            </div>
          </div>

          {/* Schedule Selection */}
          {plan.schedules && plan.schedules.length > 0 && (
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
                  {plan.schedules.map((schedule) => (
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
          )}
        </CardContent>
      </Card>

      {/* Price Information */}
      {selectedPriceRange && calculatedPrice > 0 && (
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
      )}

      {/* Form Actions */}
      <div className="flex justify-end space-x-4 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" className="bg-cyan-600 hover:bg-cyan-700">
          Confirmar Reserva
        </Button>
      </div>
    </form>
  );
};
