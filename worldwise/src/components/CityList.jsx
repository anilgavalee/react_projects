import { useCities } from "../contexts/CitiesContext";
import { NavLink } from "react-router-dom";
export default function CityList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <p>Loading...</p>;
  if (!cities.length) return <p>Add your first city ✨</p>;

  return (
    <ul>
      {cities.map((city) => (
        <li key={city.id}>
          <NavLink
            to={`${city.id}`}
            style={({ isActive }) => ({
              fontWeight: isActive ? "bold" : "normal",
            })}
          >
            <span>{city.emoji}</span> {city.cityName}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
