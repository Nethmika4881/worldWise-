import {
  useContext,
  createContext,
  useEffect,
  useState,
  useReducer,
} from "react";

const CityContext = createContext();

const reducer = function (state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };

    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("unknown action type");
  }
};

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};
const CityProvider = function ({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  // const [error, setError] = useState("");
  useEffect(function () {
    const fetchCities = async () => {
      try {
        // setError("");
        dispatch({ type: "loading" });
        const res = await fetch(`http://10.23.14.137:9001/cities`);
        if (!res.ok) throw new Error("Couldn't fetch data");
        const resJson = await res.json();
        dispatch({ type: "cities/loaded", payload: resJson });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading data...",
        });
        console.error(error.message);
      }
    };
    fetchCities();
  }, []);

  const getCity = async function (id) {
    if (Number(id) === currentCity.id) return;
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`http://10.23.14.137:9001/cities/${id}`);
      if (!res.ok) throw new Error("Couldn't fetch data");
      const resJson = await res.json();
      dispatch({ type: "city/loaded", payload: resJson });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error loading data...",
      });
      console.error(error.message);
    }
  };
  const createCity = async function (newCity) {
    try {
      dispatch({ type: "loading" });

      const res = await fetch(`http://10.23.14.137:9001/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resJson = await res.json();
      dispatch({ type: "city/created", payload: resJson });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error loading data...",
      });
      console.error(error.message);
    }
  };

  const deleteCity = async function (id) {
    try {
      dispatch({ type: "loading" });
      await fetch(`http://10.23.14.137:9001/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "city/deleted", payload: id });
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  return (
    <CityContext.Provider
      value={{
        cities,
        isLoading,
        error,
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
