import { combineReducers } from '@reduxjs/toolkit';
import { contactFormReducer } from './slices/ContactForm';
import { offersReducer } from './slices/Offers';

const rootReducer = combineReducers({
  contactForm: contactFormReducer,
  offers: offersReducer,
});

export default rootReducer;
