import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const COUNTRIES_URL = 'https://restcountries.com/v3.1/region/africa';

const COUNTRY_URL = 'https://restcountries.com/v3.1/name/';

const initialState = {
  countries: {
    status: 'idle',
    countrydata: [],
  },
};

export const getCountries = createAsyncThunk('countries/getCountries', async () => {
  try {
    const response = await axios.get(COUNTRIES_URL);
    const countriesResult = response.data;
    const countries = countriesResult.map((country) => ({
      id: country.area,
      population: country.population,
      name: country.name.common,
      capital: country.capital[0],
      image: country.flags.png,
      timezone: country.timezones[0],
      subregion: country.subregion,
      continent: country.continents[0],
      coat: country.coatOfArms.png,
    }));
    console.log(countries);
    return countries;
  } catch (err) {
    return err.message;
  }
});

export const getCountry = createAsyncThunk('countries/getCountry', async (country, { dispatch, extra }) => {
  try {
    const { handleCountryClick } = extra;
    const res = await axios.get(`${COUNTRY_URL}${country.common}`);
    const info = res.data;
    console.log(info);
    const countryData = [
      {
        id: info[0].area,
        population: info[0].population,
        name: info[0].name.official,
        image: info[0].flags.png,
      },
    ];
    dispatch(handleCountryClick(info[0].name.common));
    return countryData;
  } catch (err) {
    return err.message;
  }
});

export const countrySlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCountries.fulfilled, (state, action) => {
        state.countrydata = action.payload;
      });
  },
});

export default countrySlice.reducer;
