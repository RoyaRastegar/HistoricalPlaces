import { configureStore } from '@reduxjs/toolkit';
import historicalPlacesReducer from './historicalPlacesSlice/historicalplacesSlice.ts';

export const store = configureStore({
  reducer: {
    historicalPlaces: historicalPlacesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
