import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api";
import "./search.scss"

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  /**
   * We're using the fetch API to make a GET request to the GeoNames API, passing in the inputValue as a
   * query parameter
   */
  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=250000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      /* Mapping the response data to the options object. */
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      })
      .catch((err) => console.error(err));
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for a city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
      className="search-bar"
    />
  );
};

export default Search;
