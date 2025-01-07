import { createAsyncThunk } from '@reduxjs/toolkit';
import { createAppSlice } from '../createAppSlice';
import { IPlacesState } from '../../../utils/types/places';

const initialState: IPlacesState = {
  places: [],
  placeStatus: 'idle',
  placeError: null,
};
export const getPlace = createAsyncThunk('getPlace', async (_, thunkAPI) => {
  try {
    const response = await fetch('https://rot.chbk.app/blog');
    if (!response.ok) {
      console.log(` ${response.status}`);
    }
    const data = await response.json();
    return data.data;
  } catch (err: any) {
    console.error(err);
    return thunkAPI.rejectWithValue(err.message);
  }
});
export const historicalPlacesSlice = createAppSlice({
  name: 'historicalPlaces',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPlace.pending, (state) => {
        state.placeStatus = 'pending';
      })
      .addCase(getPlace.fulfilled, (state, action) => {
        state.placeStatus = 'fulfilled';
        state.places = action.payload;
      })
      .addCase(getPlace.rejected, (state, action) => {
        state.placeStatus = 'failed';
        state.placeError = action.payload as string;
      });
  },
});
