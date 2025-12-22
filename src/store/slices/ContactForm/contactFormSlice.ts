import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ContactFormData, ContactFormState } from './types';

const initialState: ContactFormState = {
  isSubmitting: false,
  submitStatus: 'idle',
  errorMessage: null,
};

export const submitContactForm = createAsyncThunk<
  boolean,
  ContactFormData,
  { rejectValue: string }
>(
  'contactForm/submit',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetch('https://ralan.pro/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return rejectWithValue(errorData.message || 'Ошибка отправки формы');
      }

      return true;
    } catch {
      return rejectWithValue('Ошибка сети. Проверьте подключение к интернету.');
    }
  }
);

const contactFormSlice = createSlice({
  name: 'contactForm',
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.submitStatus = 'idle';
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContactForm.pending, (state) => {
        state.isSubmitting = true;
        state.submitStatus = 'idle';
        state.errorMessage = null;
      })
      .addCase(submitContactForm.fulfilled, (state) => {
        state.isSubmitting = false;
        state.submitStatus = 'success';
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.isSubmitting = false;
        state.submitStatus = 'error';
        state.errorMessage = action.payload || 'Произошла ошибка';
      });
  },
});

export const { resetStatus } = contactFormSlice.actions;
export default contactFormSlice.reducer;
