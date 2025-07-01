import { ApiRoute } from "@/common/enums/api-route-enum";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { GetExperiencesData } from "@/data/models";
import type { Experience } from "@/data/models/experience.model";
import { Calendar, Clock, DollarSign, MapPin, ShoppingBag } from "lucide-react";
import { useState } from "react";
import httpClient from "~/lib/http/http-client";
import type { Route } from "../../../+types/root";
import { ReservationForm } from "../components/reservation-form/reservation-form";

export function meta() {
  return [{ title: "Cartagena Turística" }];
}

export async function clientLoader() {
  const { data: experiences } = await httpClient.get<GetExperiencesData>(
    ApiRoute.EXPERIENCES
  );

  return { experiences };
}

export default function Shop({
  loaderData,
}: Omit<Route.ComponentProps, "loaderData"> & {
  loaderData: Awaited<ReturnType<typeof clientLoader>>;
}) {
  const { experiences } = loaderData;
  const [reservationFormData, _setReservationFormData] = useState<Experience>();

  const handleComplete = async () => {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* <div className="flex justify-between items-center h-16">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => navigate("/")}
            >
              <h1 className="text-2xl font-bold text-gray-900">EXPLORE</h1>
              <span className="text-cyan-600 ml-2 text-sm font-medium">CARTAGENA</span>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-cyan-600 border-cyan-200">
                {filteredAndSortedPlans.length} Tours Disponibles
              </Badge>
              <Button onClick={() => navigate("/login")} variant="outline" size="sm">
                Admin
              </Button>
            </div>
          </div> */}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/10 to-blue-600/10"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Experiencias Únicas en
            <span className="text-cyan-600 block">el Caribe Colombiano</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Descubre los destinos más hermosos de Cartagena con nuestros tours exclusivos.
            Desde aventuras acuáticas hasta cultura e historia.
          </p>

          {/* Search and Filters */}
          {/* <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Buscar tours, destinos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 text-lg"
                  />
                </div>
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="h-12">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  {categories.slice(1).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Destacados</SelectItem>
                  <SelectItem value="rating">Mejor puntuados</SelectItem>
                  <SelectItem value="reviews">Más reseñas</SelectItem>
                  <SelectItem value="price-low">Menor precio</SelectItem>
                  <SelectItem value="price-high">Mayor precio</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div> */}
        </div>
      </section>

      {/* Featured Plans */}
      {/* {filteredAndSortedPlans.some((plan) => plan.featured) && (
        <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-cyan-600 to-blue-600">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Tours Destacados</h2>
              <p className="text-cyan-100">
                Las experiencias más populares de nuestros viajeros
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredAndSortedPlans
                .filter((plan) => plan.featured)
                .slice(0, 3)
                .map((plan) => (
                  <Card
                    key={plan.id}
                    className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/95 backdrop-blur"
                  >
                    <CardHeader className="pb-4 relative">
                      <div className="absolute top-4 right-4 z-10">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                          onClick={() => toggleFavorite(plan.id)}
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              favoriteIds.includes(plan.id)
                                ? "fill-red-500 text-red-500"
                                : "text-gray-600"
                            }`}
                          />
                        </Button>
                      </div>
                      <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden">
                        <img
                          src={plan.image}
                          alt={plan.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle className="text-lg leading-tight">
                          {plan.name}
                        </CardTitle>
                        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 ml-2">
                          ★ DESTACADO
                        </Badge>
                      </div>
                      <CardDescription className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                        {plan.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        {plan.rating && (
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                            <span className="font-medium">{plan.rating}</span>
                            <span className="text-gray-500 ml-1">
                              ({plan.reviews} reseñas)
                            </span>
                          </div>
                        )}
                        {plan.difficulty && (
                          <Badge
                            variant="outline"
                            className={getDifficultyColor(plan.difficulty)}
                          >
                            {plan.difficulty}
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-4">
                        <div className="text-2xl font-bold text-cyan-600 flex items-center">
                          <DollarSign className="w-5 h-5 mr-1" />
                          {plan.price}
                        </div>
                        <Button
                          onClick={() => handlePlanSelect(plan)}
                          className="bg-cyan-600 hover:bg-cyan-700"
                          size="sm"
                        >
                          <ShoppingBag className="w-4 h-4 mr-1" />
                          {plan.automaticReservation ? "Reservar" : "Ver más"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </section>
      )} */}

      {/* All Plans Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Todos los Tours</h2>
            <div className="text-sm text-gray-600">
              Mostrando {filteredAndSortedPlans.length} de {plans.length} tours
            </div>
          </div> */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiences?.map((exp) => (
              <Card
                key={exp._id}
                className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <CardHeader className="pb-4 relative">
                  <div className="absolute top-4 right-4 z-10">
                    {/* <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                      onClick={() => toggleFavorite(plan.id)}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          favoriteIds.includes(plan.id)
                            ? "fill-red-500 text-red-500"
                            : "text-gray-600"
                        }`}
                      />
                    </Button> */}
                  </div>
                  <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden">
                    <img
                      src={exp.pictures[0]}
                      alt={exp.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg">{exp.name}</CardTitle>
                    {!!exp.reservable && (
                      <Badge className="bg-green-100 text-green-700 border-green-200 ml-2">
                        <Calendar className="w-3 h-3 mr-1" />
                        Reservable
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    {exp.originCity.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600 line-clamp-2">{exp.description}</p>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-3">
                      {/* {plan.rating && (
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                          <span className="font-medium">{plan.rating}</span>
                        </div>
                      )} */}
                      {exp.duration && (
                        <div className="flex items-center text-gray-600">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{exp.duration} h</span>
                        </div>
                      )}
                    </div>
                    {/* {plan.difficulty && (
                      <Badge
                        variant="outline"
                        className={getDifficultyColor(plan.difficulty)}
                      >
                        {plan.difficulty}
                      </Badge>
                    )} */}
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <div className="text-2xl font-bold text-cyan-600 flex items-center">
                      <DollarSign className="w-5 h-5 mr-1" />
                      {exp.displayPrice}
                    </div>
                    <div className="space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            Ver Detalles
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="text-2xl">{exp.name}</DialogTitle>
                            <DialogDescription className="flex items-center text-gray-600 text-base">
                              <MapPin className="w-4 h-4 mr-1" />
                              {exp.originCity.name}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-6">
                            <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                              <img
                                src={exp.pictures[0]}
                                alt={exp.name}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-2">
                                  Precio
                                </h4>
                                <div className="flex items-center text-cyan-600 font-bold text-xl">
                                  <DollarSign className="w-5 h-5 mr-1" />
                                  {exp.displayPrice}
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-2">
                                  Categoría
                                </h4>
                                <p className="text-gray-700">{exp.category.name}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-2">
                                  Duración
                                </h4>
                                <p className="text-gray-700 flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {exp.duration ? `${exp.duration} h` : "No especificada"}
                                </p>
                              </div>
                              <div>
                                {/* <h4 className="font-semibold text-gray-900 mb-2">
                                  Valoración
                                </h4>
                                {plan.rating ? (
                                  <div className="flex items-center">
                                    <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                                    <span className="font-medium">{plan.rating}</span>
                                    <span className="text-gray-500 ml-1 text-sm">
                                      ({plan.reviews})
                                    </span>
                                  </div>
                                ) : (
                                  <span className="text-gray-500 text-sm">
                                    Sin valoraciones
                                  </span>
                                )} */}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">
                                Agencia
                              </h4>
                              <p className="text-gray-600 leading-relaxed">
                                {exp.providerName}
                              </p>
                            </div>

                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">
                                Descripción
                              </h4>
                              <p className="text-gray-600 leading-relaxed">
                                {exp.description}
                              </p>
                            </div>

                            {exp.destinations && exp.destinations.length > 0 && (
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-3">
                                  Destinos Incluidos
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {exp.destinations.map((destination, index) => (
                                    <Badge
                                      key={index}
                                      className="bg-blue-100 text-blue-700 border-blue-200"
                                    >
                                      {destination.name}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button
                        onClick={() =>
                          exp.reservable
                            ? _setReservationFormData(exp)
                            : (() => {
                                const message = encodeURIComponent(
                                  `Hola, me gustaría obtener más información sobre el plan ${exp.name}.`
                                );
                                const URL = `http://wa.me/57${exp.contactPhone}?text=${message}`;
                                window.open(URL, "_blank");
                              })()
                        }
                        className="bg-cyan-600 hover:bg-cyan-700"
                        size="sm"
                      >
                        <ShoppingBag className="w-4 h-4 mr-1" />
                        {exp.reservable ? "Reservar" : "Contactar"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reservation Form Modal */}
      {reservationFormData && (
        <Dialog
          open={!!reservationFormData}
          onOpenChange={(v) => (!v ? _setReservationFormData(undefined) : null)}
        >
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Reservar: {reservationFormData.name}</DialogTitle>
              <DialogDescription>
                Completa el formulario para realizar tu reserva
              </DialogDescription>
            </DialogHeader>
            <ReservationForm
              experience={reservationFormData}
              onComplete={() => _setReservationFormData(undefined)}
              onCancel={() => _setReservationFormData(undefined)}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
