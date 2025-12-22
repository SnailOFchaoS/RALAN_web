import { combineReducers } from '@reduxjs/toolkit';
import { contactFormReducer } from './slices/ContactForm';

// Добавляйте новые reducers здесь:
const rootReducer = combineReducers({
  contactForm: contactFormReducer,
});

export default rootReducer;
