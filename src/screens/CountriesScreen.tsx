import { useEffect } from 'react';
import _ from 'lodash';
import { CountryCard } from '../components/common/CountryCard';
import {
  GET_ALL_COUNTRIES_ENDPOINT,
  GET_COUNTRY_BY_NAME_ENDPOINT,
} from '../endpoints/endpoints';
import './CountriesScreen.css';
import { useFetch } from '../hooks/useFetch';
import { InputText } from '../components/common/InputText';
import { Loader } from '../components/common/Loader';
import { Empty } from '../components/common/Empty';
import { Error } from '../components/common/Error';

interface CountryApi {
  cca3: string;
  name: {
    official: string;
  };
  flags: {
    svg: string;
  };
  region: string;
  capital: string[];
  population: number;
}

const Countries = ({ countries }: { countries: CountryApi[] }) => (
  <div className="countries-container">
    {countries.map((country) => (
      <CountryCard
        key={country.cca3}
        className="mt-10"
        officialName={country.name.official}
        flagUrl={country.flags.svg}
        region={country.region}
        capital={country?.capital?.length ? country.capital.join(',') : null}
        population={country.population.toLocaleString()}
      />
    ))}
  </div>
);

const CountriesScreen = () => {
  const { loading, sendRequest, data: countries, error } = useFetch();
  // debounce so we wait 250 milsec until the user stops typing
  const sendRequestDebounced = _.debounce(sendRequest, 250);

  useEffect(() => {
    sendRequest({ url: GET_ALL_COUNTRIES_ENDPOINT });
  }, []);

  const handleChange = async (newText: string) => {
    const countryName = newText.trim();
    if (countryName.length) {
      sendRequestDebounced({
        url: `${GET_COUNTRY_BY_NAME_ENDPOINT}/${countryName}`,
      });
    } else {
      sendRequestDebounced({ url: GET_ALL_COUNTRIES_ENDPOINT });
    }
  };

  let content;
  if (loading) {
    content = <Loader />;
  } else if (error) {
    content = <Error />;
  } else if (!countries) {
    content = <Empty />;
  } else {
    content = <Countries countries={countries} />;
  }

  return (
    <>
      <div className="search-container mt-10">
        <InputText
          className="mt-8 mb-10"
          onChange={handleChange}
          placeHolder="Search..."
        />
      </div>
      {content}
    </>
  );
};

export { CountriesScreen };
