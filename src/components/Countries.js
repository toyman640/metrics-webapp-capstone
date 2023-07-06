import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCountries } from '../redux/countries/countrySlice';
import Search from './Search';
import africa from '../africa-map.png';

function Countries() {
  const dispatch = useDispatch();
  const countriesArr = useSelector((state) => state.countries.countrydata);
  const status = useSelector((state) => state.countries.status);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  useEffect(() => {
    if (countriesArr) {
      setFilteredCountries(
        countriesArr.filter((country) => country.name
          .toLowerCase().includes(searchValue.toLowerCase())),
      );
    }
  }, [countriesArr, searchValue]);

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  if (status === 'idle' || status === 'pending' || !countriesArr) {
    // Handle loading state
    return <div>Loading...</div>;
  }

  return (
    <div className="Main-div">
      <div className="Top-section">
        <img className="Africa-map" src={africa} alt="map of africa" />
        <div className="Second-part">
          <h2>Africa</h2>
          <Search onSearch={handleSearch} />
        </div>
      </div>
      <div className="Countries-grid">
        {searchValue && filteredCountries.length === 0 ? (
          <div>No countries found.</div>
        ) : (
          filteredCountries.map((country) => (
            <div className="Country-list" key={country.id}>
              <Link className="Country-link" to={`/country/${country.id}`} key={country.id}>
                <div
                  className="Flag-div"
                  style={{
                    backgroundImage: `url(${country.image})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    position: 'relative',
                  }}
                >
                  <h4 className="Country-name">{country.name}</h4>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Countries;
