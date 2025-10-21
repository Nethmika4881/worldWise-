// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import Button from "./Button";
import { useURLPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import { useCities } from "../contexts/CityContext";
function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [mapLat, mapLng] = useURLPosition();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [geoCodingError, setGeoCodingError] = useState("");
  const navigate = useNavigate();
  const { createCity, isLoading } = useCities();
  useEffect(
    function () {
      if (!mapLat || !mapLng) return;
      const fetchLocation = async function () {
        try {
          setGeoCodingError("");
          setIsLoadingGeocoding(true);
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${mapLat}&longitude=${mapLng}`
          );
          const resJson = await res.json();
          if (!resJson.countryCode)
            throw new Error("doesn't seem to be a city.Click somewhere else ");
          setCityName(resJson.city || resJson.locality || "");
          setCountry(resJson.countryName);
          setEmoji(convertToEmoji(resJson.countryCode));
          console.log("Rr", convertToEmoji(resJson.countryCode));
        } catch (error) {
          console.error(error.message);
          setGeoCodingError(error.message);
        } finally {
          setIsLoadingGeocoding(false);
        }
      };
      fetchLocation();
    },
    [mapLat, mapLng]
  );

  const handleSubmit = async function (e) {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat: mapLat, lng: mapLng },
    };
    try {
      await createCity(newCity); // Call your context function
      navigate("/app/cities");
    } catch (error) {
      // Handle error (show message to user)
      console.error("Failed to add city:", error);
    }
  };
  if (isLoadingGeocoding || isLoading) return <Spinner />;
  if (geoCodingError) return <Message message={geoCodingError} />;
  const handleBack = function (e) {
    e.preventDefault();
    navigate(-2);
  };

  return (
    <form
      className={`${styles.form} ${isLoading ? "loading" : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          type="date"
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}

        <DatePicker
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary" handleClick={(e) => handleSubmit(e)}>
          Add
        </Button>
        <Button type="back" handleClick={(e) => handleBack(e)}>
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
