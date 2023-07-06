import React from 'react';
import PropTypes from 'prop-types';

function Search({ onSearch }) {
  const handleInputChange = ({ target }) => {
    const { value } = target;
    onSearch(value);
  };

  return (
    <div>
      <form>
        <input type="text" placeholder="County name" onChange={handleInputChange} />
      </form>
    </div>
  );
}

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Search;
