interface City {
  _id: string;
  name: string;
}

interface Category {
  _id: string;
  name: string;
}

interface PricePerGroup {
  _id: string;
  to: number;
  from: number;
  amount: number;
}

interface ReservableDetails {
  _id: string;
  schedule: Array<{ start: string; _id: string }>;
  restrictionBy: string;
  maxPeopleAllowed: number;
  maxBookingsAllowed: number;
  maxPeoplePerBooking: number;
  minPeoplePerBooking: number;
  pricingType: string; // Ejemplo: "PER_GROUP"
  pricesPerPerson: number;
  pricesPerGroup: PricePerGroup[];
}

export interface Experience {
  _id: string;
  name: string;
  description: string;
  category: Category;
  duration: number;
  originCity: City;
  destinations: City[];
  pictures: string[];
  contactPhone: string;
  reservable?: ReservableDetails;
  displayPrice: number;
  featured: boolean;
}
