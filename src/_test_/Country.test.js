import React from 'react';
import { render } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import Country from '../components/Country';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

describe('Country', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading message when countries data is not available', () => {
    useSelector.mockReturnValue([]);

    const { container } = render(
      <Router>
        <Country />
      </Router>,
    );

    expect(container.textContent).toBe('Loading...');
  });

  it('renders country details when countries data is available', () => {
    const countriesData = [
      {
        id: 1,
        coat: 'example-coat-url',
        name: 'Country 1',
        population: 1000000,
        capital: 'Capital 1',
        subregion: 'Subregion 1',
        timezone: 'Timezone 1',
      },
    ];

    useSelector.mockReturnValue(countriesData);

    const { container } = render(
      <Router>
        <Country />
      </Router>,
    );

    expect(container).toMatchSnapshot();
  });
});
