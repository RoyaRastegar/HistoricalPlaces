import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPlace, IPlacesState } from '../../../utils/types/places';

const initialState: IPlacesState = {
  places: [],
  placeStatus: 'idle',
  placeError: null,
};

export const fetchHistoricalPlaces = createAsyncThunk(
  'fetchHistoricalPlaces',
  async (_, thunkAPI) => {
    try {
      const response = await fetch('/places.json', {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: IPlace[] = await response.json();
      return data;
    } catch (err: any) {
      console.error(err);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const historicalPlacesSlice = createSlice({
  name: 'historicalPlaces',
  initialState,
  reducers: {
    toggleVisited(state, action: PayloadAction<number>) {
      const place = state.places.find((p) => p.id === action.payload);
      if (place) {
        place.visited = !place.visited;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistoricalPlaces.pending, (state) => {
        state.placeStatus = 'pending';
      })
      .addCase(fetchHistoricalPlaces.fulfilled, (state, action) => {
        state.placeStatus = 'fulfilled';
        state.places = action.payload;
      })
      .addCase(fetchHistoricalPlaces.rejected, (state, action) => {
        state.placeStatus = 'failed';
        state.placeError = action.payload as string;
      });
  },
});
export const { toggleVisited } = historicalPlacesSlice.actions;
export default historicalPlacesSlice.reducer;
