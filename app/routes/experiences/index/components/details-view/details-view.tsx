import { RestrictionMode } from "@/common/enums/common-enums";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Experience } from "@/data/models/experience.model";
import { Calendar, Clock, DollarSign, MapPin, Users } from "lucide-react";

export type DetailsViewProps = {
  exp: Experience;
};

const DetailsView: React.FC<DetailsViewProps> = ({ exp }) => {
  return (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-xl font-bold">{exp.name}</DialogTitle>
        <DialogDescription className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-1" />
          {exp?.originCity.name}
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-6">
        <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
          <img
            src={exp?.pictures[0]}
            alt={exp?.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Precio Base</h4>
            <div className="flex items-center text-cyan-600 font-bold text-lg">
              <DollarSign className="w-5 h-5 mr-1" />
              {exp?.displayPrice}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Categoría</h4>
            <p className="text-gray-700">{exp?.category.name}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              Duración
            </h4>
            <p className="text-gray-700">
              {exp.duration ? `${exp.duration} h` : "No especificada"}
            </p>
          </div>
        </div>

        {/* Provider name */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Agencia</h4>
          <p className="text-gray-600 leading-relaxed">{exp.providerName}</p>
        </div>

        {/* Description */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Descripción</h4>
          <p className="text-gray-600 leading-relaxed">{exp.description}</p>
        </div>

        {/* Destinations */}
        {exp.destinations && exp.destinations.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Destinos</h4>
            <div className="flex flex-wrap gap-2">
              {exp.destinations.map((destination, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  {destination.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Automatic Reservation */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            Reservación Automática
          </h4>
          <p className="text-gray-700">
            {exp.reservable ? "Habilitada" : "No habilitada"}
          </p>
        </div>

        {/* Schedules */}
        {exp.reservable?.schedule && exp.reservable.schedule.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Horarios Disponibles</h4>
            <div className="space-y-3">
              {exp.reservable.schedule.map((s) => (
                <div key={s._id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <span className="text-sm font-medium text-gray-600">
                        Hora Inicio
                      </span>
                      <p className="text-gray-900">{s.start}</p>
                    </div>
                    {/* <div>
                      <span className="text-sm font-medium text-gray-600">Hora Fin</span>
                      <p className="text-gray-900">{schedule.endTime}</p>
                    </div> */}
                    <div>
                      <span className="text-sm font-medium text-gray-600">
                        {exp.reservable?.restrictionBy === RestrictionMode.MAX_PEOPLE &&
                          "Máx. Personas"}
                        {exp.reservable?.restrictionBy === RestrictionMode.MAX_BOOKINGS &&
                          "Máx. Reservas/Día"}
                      </span>
                      <p className="text-gray-900">
                        {exp.reservable?.restrictionBy === RestrictionMode.MAX_PEOPLE &&
                          exp.reservable.maxPeopleAllowed}
                        {exp.reservable?.restrictionBy === RestrictionMode.MAX_BOOKINGS &&
                          exp.reservable.maxPeoplePerBooking}
                      </p>
                    </div>
                    {/* <div>
                      <span className="text-sm font-medium text-gray-600"></span>
                      <p className="text-gray-900 flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {schedule.maxPeople}
                      </p>
                    </div> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Price Ranges */}
        {exp.reservable?.pricesPerGroup && exp.reservable.pricesPerGroup.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <DollarSign className="w-4 h-4 mr-1" />
              Precios por Rangos de Personas
            </h4>
            <div className="space-y-3">
              {exp.reservable?.pricesPerGroup.map((range) => (
                <div key={range._id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <span className="text-sm font-medium text-gray-600">
                        Mín. Personas
                      </span>
                      <p className="text-gray-900 flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {range.from}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">
                        Máx. Personas
                      </span>
                      <p className="text-gray-900 flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {range.to}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Precio</span>
                      <p className="text-cyan-600 font-bold flex items-center">
                        <DollarSign className="w-4 h-4 mr-1" />$
                        {parseInt(range.amount.toString()).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DialogContent>
  );
};

export default DetailsView;
