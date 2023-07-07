import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Countries from '../components/Countries';

const mockStore = configureStore([]);

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({
    data: [
      {
        id: 1,
        name: 'Country 1',
        image: 'image-url-1',
      },
      {
        id: 2,
        name: 'Country 2',
        image: 'image-url-2',
      },
    ],
  })),
}));

describe('Countries', () => {
  let store;
  const initialState = {
    countries: {
      countrydata: [],
      status: 'succeeded',
    },
  };

  beforeEach(() => {
    store = mockStore(initialState);
  });

  test('renders countries from the store', async () => {
    const component = renderer.create(
      <Provider store={store}>
        <Countries />
      </Provider>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
