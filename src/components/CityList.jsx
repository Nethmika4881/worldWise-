import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CityItem from "./CityItem";
import { useCities } from "../contexts/CityContext";
function CityList() {
  const { isLoading, cities } = useCities();
  if (isLoading) return <Spinner />;
  console.log(cities);
  if (!cities.length)
    return <Message message="Add Your first city by clicking on the map" />;
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}

export default CityList;
