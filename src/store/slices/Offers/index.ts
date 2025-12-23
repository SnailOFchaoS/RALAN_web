export type { 
  Offer, 
  OffersState, 
  OfferCreateData, 
  OfferUpdateData,
  ApiResponse,
  OffersResponse,
  OfferResponse 
} from './types';

export { 
  default as offersReducer,
  clearSelectedOffer,
  clearError,
  fetchOffers,
  fetchOfferById,
  createOffer,
  updateOffer,
  deleteOffer,
} from './offersSlice';
