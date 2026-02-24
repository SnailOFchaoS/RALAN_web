import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Offer, OffersState, OfferCreateData, OfferUpdateData, OffersResponse, OfferResponse } from './types';

const API_BASE_URL = 'https://ralan.pro/api';

// Начальное состояние
const initialState: OffersState = {
  offers: [],
  selectedOffer: null,
  isLoading: false,
  error: null,
};

// GET /offers - получить все предложения
export const fetchOffers = createAsyncThunk<
  Offer[],
  void,
  { rejectValue: string }
>(
  'offers/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/offers`);
      if (!response.ok) {
        return rejectWithValue('Ошибка загрузки предложений');
      }
      const result: OffersResponse = await response.json();
      return result.data;
    } catch {
      return rejectWithValue('Ошибка сети');
    }
  }
);

// GET /offers/{id} - получить одно предложение по UUID
export const fetchOfferById = createAsyncThunk<
  Offer,
  string,
  { rejectValue: string }
>(
  'offers/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/offers/${id}`);
      if (!response.ok) {
        return rejectWithValue('Предложение не найдено');
      }
      const result: OfferResponse = await response.json();
      return result.data;
    } catch {
      return rejectWithValue('Ошибка сети');
    }
  }
);

// POST /offers - создать новое предложение
export const createOffer = createAsyncThunk<
  Offer,
  OfferCreateData,
  { rejectValue: string }
>(
  'offers/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/offers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        return rejectWithValue('Ошибка создания предложения');
      }
      const result: OfferResponse = await response.json();
      return result.data;
    } catch {
      return rejectWithValue('Ошибка сети');
    }
  }
);

// PUT /offers/{id} - обновить предложение
export const updateOffer = createAsyncThunk<
  Offer,
  OfferUpdateData,
  { rejectValue: string }
>(
  'offers/update',
  async (data, { rejectWithValue }) => {
    try {
      const { id, ...updateData } = data;
      const response = await fetch(`${API_BASE_URL}/offers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
      if (!response.ok) {
        return rejectWithValue('Ошибка обновления предложения');
      }
      const result: OfferResponse = await response.json();
      return result.data;
    } catch {
      return rejectWithValue('Ошибка сети');
    }
  }
);

// DELETE /offers/{id} - удалить предложение
export const deleteOffer = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  'offers/delete',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/offers/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        return rejectWithValue('Ошибка удаления предложения');
      }
      return id;
    } catch {
      return rejectWithValue('Ошибка сети');
    }
  }
);

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    clearSelectedOffer: (state) => {
      state.selectedOffer = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setInitialOffers: (state, action: { payload: Offer[] }) => {
      if (state.offers.length === 0) {
        state.offers = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchOffers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.offers = action.payload;
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Ошибка';
      })
      // Fetch by ID
      .addCase(fetchOfferById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOfferById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedOffer = action.payload;
      })
      .addCase(fetchOfferById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Ошибка';
      })
      // Create
      .addCase(createOffer.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOffer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.offers.push(action.payload);
      })
      .addCase(createOffer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Ошибка';
      })
      // Update
      .addCase(updateOffer.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateOffer.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.offers.findIndex(o => o.id === action.payload.id);
        if (index !== -1) {
          state.offers[index] = action.payload;
        }
      })
      .addCase(updateOffer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Ошибка';
      })
      // Delete
      .addCase(deleteOffer.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteOffer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.offers = state.offers.filter(o => o.id !== action.payload);
      })
      .addCase(deleteOffer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Ошибка';
      });
  },
});

export const { clearSelectedOffer, clearError, setInitialOffers } = offersSlice.actions;
export default offersSlice.reducer;
