export interface ContactFormData {
  fullName: string;
  phone: string;
  email: string;
}

export interface ContactFormState {
  isSubmitting: boolean;
  submitStatus: 'idle' | 'success' | 'error';
  errorMessage: string | null;
}
