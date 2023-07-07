import React from 'react';
import { shallow, mount } from 'enzyme';
import { useSelector, useDispatch } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Countries from '../components/Countries';
import { getCountries } from '../redux/countries/countrySlice';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('../redux/countries/countrySlice', () => ({
  getCountries: jest.fn(),
}));

describe("Countries component", () => {
  beforeEach(() => {
    useSelector.mockClear();
    useDispatch.mockClear();
    getCountries.mockClear();
  });

  it('should dispatch getCountries action on mount', () => {
    const dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock);

    useSelector.mockReturnValue({
      countrydata: [],
      status: 'idle',
    });

    mount(
      <MemoryRouter>
        <Countries />
      </MemoryRouter>
    );

    expect(dispatchMock).toHaveBeenCalledWith(getCountries());
  });

  it('should render loading message when status is idle, pending, or countrydata is null', () => {
    useSelector.mockReturnValue({
      countrydata: null,
      status: 'idle',
    });

    const wrapper = shallow(<Countries />);

    expect(wrapper.text()).toBe('Loading...');
  });

  it('should render search component', () => {
    useSelector.mockReturnValue({
      countrydata: [],
      status: 'succeeded',
    });

    const wrapper = shallow(<Countries />);
    const searchComponent = wrapper.find('Search');

    expect(searchComponent.exists()).toBe(true);
  });

  it('should filter countries based on search value', () => {
    const countrydata = [
      { id: 1, name: 'Country 1' },
      { id: 2, name: 'Country 2' },
      { id: 3, name: 'Country 3' },
    ];

    useSelector.mockReturnValue({
      countrydata,
      status: 'succeeded',
    });

    const wrapper = shallow(<Countries />);
    const searchComponent = wrapper.find('Search');
    const handleSearch = searchComponent.prop('onSearch');

    handleSearch('Country 2');

    const countryList = wrapper.find('.Country-list');

    expect(countryList).toHaveLength(1);
    expect(countryList.key()).toBe('2');
  });

  it('should render "No countries found." message when filteredCountries is empty', () => {
    useSelector.mockReturnValue({
      countrydata: [{ id: 1, name: 'Country 1' }],
      status: 'succeeded',
    });

    const wrapper = shallow(<Countries />);
    const searchComponent = wrapper.find('Search');
    const handleSearch = searchComponent.prop('onSearch');

    handleSearch('Country 2');

    expect(wrapper.text()).toBe('No countries found.');
  });
});