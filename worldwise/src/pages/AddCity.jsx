import { useNavigate, useSearchParams } from "react-router-dom";
import Cities from "./Cities";
import { useCities } from "../contexts/CitiesContext";
import { useEffect, useState } from "react";

export default function AddCity() {
  const [searchParams] = useSearchParams();
  const { Cities, setCities } = useCities();
  const navigate = useNavigate();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [emoji, setEmoji] = useState("");
  const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(
          `${BASE_URL}?latitude=${lat}&longitude=${lng}`,
        );
        const data = await response.json();
        console.log(data);
        setCityName(data.city);
        setCountry(data.countryName);
        setEmoji(data.countryCode);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [lat, lng]);
  function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !country) return;
    const newCity = {
      id: Date.now().toString(),
      cityName,
      country,
      emoji,
      date: new Date().toISOString(),
      position: {
        lat,
        lng,
      },
    };
    setCities((pre) => [...pre, newCity]);
    navigate("/app/cities");
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>city name</label>
          <input
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Country</label>
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></input>
        </div>
        <button type="submit">Add City</button>
        <button type="button" onClick={() => navigate(-1)}>
          Cancel
        </button>
      </form>
    </>
  );
}
