export interface Offer {
  id: string; // UUID
  discipline: string[];
  offerName: string;
  date: string;
  price: number;
  time: string;
  level: string[];
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export type OffersResponse = ApiResponse<Offer[]>;
export type OfferResponse = ApiResponse<Offer>;

export interface OffersState {
  offers: Offer[];
  selectedOffer: Offer | null;
  isLoading: boolean;
  error: string | null;
}

// Для создания/обновления (без id)
export interface OfferCreateData {
  discipline: string[];
  offerName: string;
  date: string;
  price: number;
  time: string;
  level: string[];
}

export interface OfferUpdateData extends OfferCreateData {
  id: string;
}
