import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, geoApiUrl } from "../../api";
import { data } from "../../App";

type city = {
  latitude: number;
  longitude: number;
  name: string;
  countryCode: string;
};

type SearchProps = {
  onSearchChange: (searchData: data) => void;
};

function Search({ onSearchChange }: SearchProps) {
  const [search, setSearch] = useState(null);

  function loadOptions(inputValue: string): Promise<any> {
    return fetch(
      `${geoApiUrl}/cities?minPopulation=100000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city: city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      })
      .catch((err) => console.error(err));
  }

  function handleOnChange(searchData: any) {
    setSearch(searchData);
    onSearchChange(searchData);
  }

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={800}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
      classNamePrefix="search"
      unstyled
    
    />
  );
}
export default Search;
