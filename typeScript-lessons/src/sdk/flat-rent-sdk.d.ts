import { SearchFormData } from "../search-form";
import { Place } from "../search-results";

export function cloneDate(date: Date): Date;

export function addDays(date: Date, days: number): Date;

export interface Database {
  id: string;
  title: string;
  details: string;
  photos: string[];
  coordinates: number[];
  bookedDates: Date[];
  price: number;
}

export interface BookData {
  city: string;
  checkInDate: Date;
  checkOutDate: Date;
  priceLimit: number;
}

//interface для database. Потом в search замапить в тип Place, чтобы можно было сконкатить

export const backendPort: number;
export const localStorageKey: string;

export class FlatRentSdk {
  get(id: string): Promise<Object | null>;

  search(parameters: BookData): Database[];

  book(flatId: number, checkInDate: Date, checkOutDate: Date): number;
}
