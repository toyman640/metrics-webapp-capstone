import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

function Country() {
  const countries = useSelector((state) => state.countries.countrydata);

  const { id } = useParams();
  const index = countries.findIndex((country) => country.id === +id);
  const navigate = useNavigate();

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      const confirmationMessage = '';
      return confirmationMessage;
    };
    const handleBeforeUnloadWrapper = (event) => {
      handleBeforeUnload(event);
      navigate('/');
    };
    window.addEventListener('beforeunload', handleBeforeUnloadWrapper);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnloadWrapper);
    };
  }, [navigate]);

  if (!countries || countries.length === 0 || index === -1) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Detail-page">
      <div
        className="Country-detial"
        style={{
          backgroundImage: `url(${countries[index].coat})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
        }}
      />
      <div className="Data-section">
        <h3 className="Details-name">
          Country Name:
          {' '}
          <span className="">{countries[index].name}</span>
        </h3>
        <h3 className="Details-name">
          Population:
          {' '}
          <span>{countries[index].population}</span>
        </h3>
        <h3 className="Details-name">
          Capital:
          {' '}
          <span>{countries[index].capital}</span>
        </h3>
        <h3 className="Details-name">
          Subregion:
          {' '}
          <span>{countries[index].subregion}</span>
        </h3>
        <h3 className="Details-name">
          Timezone:
          {' '}
          <span>{countries[index].timezone}</span>
        </h3>
      </div>
    </div>
  );
}

export default Country;
