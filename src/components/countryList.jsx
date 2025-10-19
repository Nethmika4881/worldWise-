import styles from "./countryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";

import _ from "lodash";
import { useCities } from "../contexts/CityContext";

function CountryList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;

  const arr = cities.map((city) => ({
    emoji: city.emoji,
    country: city.country,
  }));
  const countries = _.uniqBy(arr, "country"); // remove duplicate objects from an array based on the given keyword
  console.log(countries);
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
