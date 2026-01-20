import { useParams } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";

export default function City() {
  const { id } = useParams();
  const { cities, isLoading } = useCities();

  if (isLoading) return <p>Loading...</p>;

  const city = cities.find(
    city => city && String(city.id) === id
  );

  if (!city) return <p>City not found</p>;

  return (
    <div>
      <h2>
        {city.emoji} {city.cityName}
      </h2>
      <p>Country: {city.country}</p>
      <p>Visited on: {city.date}</p>
    </div>
  );
}
