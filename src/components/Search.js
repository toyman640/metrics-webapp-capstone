import React from 'react';
import PropTypes from 'prop-types';

function Search({ onSearch }) {
  const handleInputChange = ({ target }) => {
    const { value } = target;
    onSearch(value);
  };

  return (
    <div>
      <form className="Search-form">
        <input className="Text-box" type="text" placeholder="Click here to search.." onChange={handleInputChange} />
      </form>
    </div>
  );
}

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Search;
