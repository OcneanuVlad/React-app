import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "../../api";

type city = {
  latitude: number;
  longitude: number;
  name: string;
  countryCode: string;
}

type SearchProps = {
  onSearchChange: (searchData: object) => void;
};



function Search({ onSearchChange }: SearchProps) {

  const [search, setSearch] = useState(null);

  function loadOptions(inputValue: string): Promise<any> {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${inputValue}`,
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
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
      classNamePrefix="search"
      theme={(theme) => ({
        ...theme,
        borderRadius: 0,
        colors: {
          ...theme.colors,
          primary25: 'white', // hover option
          neutral0: 'white', // backgrounds
          primary: 'transparent', // selected : border
          neutral20: 'transparent', // normal outlines
          neutral30: 'transparent', // hover outline

        },
      })}
  
    />
  );
}
export default Search;
