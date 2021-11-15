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
  totalPrice?: number;
  price?: number;
}

export interface BookData {
  city: string;
  checkInDate: Date;
  checkOutDate: Date;
  priceLimit: number;
}

export const backendPort: number;
export const localStorageKey: string;

export class FlatRentSdk {
  get(id: string): Promise<Object | null>;

  search(parameters: BookData): Database[];

  book(flatId: number, checkInDate: Date, checkOutDate: Date): number;
}
