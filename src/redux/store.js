import { configureStore } from '@reduxjs/toolkit';
import countryReducer from './countries/countrySlice';

export const store = configureStore({
  reducer: {
    countries: countryReducer,
  },
});

export default store;
