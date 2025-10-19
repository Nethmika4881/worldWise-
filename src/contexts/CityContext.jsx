import { useContext, createContext, useEffect, useState } from "react";

const CityContext = createContext();

const CityProvider = function ({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  // const [error, setError] = useState("");
  useEffect(function () {
    const fetchCities = async () => {
      try {
        // setError("");
        setIsLoading(true);
        const res = await fetch("http://localhost:9000/cities");
        if (!res.ok) throw new Error("Couldn't fetch data");
        const resJson = await res.json();
        setCities(resJson);
        console.log(resJson);
      } catch (error) {
        // setError(error.message);
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCities();
  }, []);

  const getCity = async function (id) {
    try {
      const res = await fetch(`http://localhost:9000/cities/${id}`);
      if (!res.ok) throw new Error("Couldn't fetch data");
      const resJson = await res.json();
      setCurrentCity(resJson);
      console.log(resJson);
    } catch (error) {
      console.error(error.message);
    }
  };
  const createCity = async function (newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`http://localhost:9000/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resJson = await res.json();
      setCities((cities) => [...cities, resJson]);
      console.log(resJson);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCity = async function (id) {
    try {
      setIsLoading(true);
      await fetch(`http://localhost:9000/cities/${id}`, {
        method: "DELETE",
      });

      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CityContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CityContext.Provider>
  );
};

const useCities = () => {
  const context = useContext(CityContext);
  if (!context)
    throw new Error(
      "Cities context used outside of the area that we can access"
    );
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { useCities, CityProvider };
