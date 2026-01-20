import { useCities } from "../contexts/CitiesContext";

export default function CountryList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <p>...loading</p>;
  const countries = cities.reduce((arr, city) => {
    if (!arr.map((ct) => ct.country).includes(city.country)) {
      arr.push({
        country: city.country,
        emoji: city.emoji,
      });
    }
    return arr;
  }, []);
  return (
    <ul>
      {countries.map((country) => (
        <li key={country.country}>
          <span>{country.emoji}</span>
          {country.country}
        </li>
      ))}
    </ul>
  );
}
