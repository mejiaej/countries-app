import { useEffect, useState } from 'react';
import { CountryCard } from '../components/common/CountryCard';
import { GET_ALL_COUNTRIES_ENDPOINT } from '../endpoints/endpoints';
import './CountriesScreen.css';

interface CountryApi {
  cca3: string;
  name: {
    official: string;
  };
  flags: {
    svg: string;
  };
}

const CountriesScreen = (): JSX.Element => {
  const [countries, setCountries] = useState<CountryApi[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCountries = async () => {
      setLoading(true);
      const response = await fetch(GET_ALL_COUNTRIES_ENDPOINT);
      setCountries(await response.json());
      setLoading(false);
    };
    loadCountries();
  }, []);

  if(loading) return <div>..Loading</div>;

  return (
    <div className="countries-container">
      {countries.map((country) => (
        <CountryCard
          key={country.cca3}
          officialName={country.name.official}
          flagUrl={country.flags.svg}
        />
      ))}
    </div>
  );
};

export { CountriesScreen };
