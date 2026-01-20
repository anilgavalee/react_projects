import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";
import "leaflet/dist/leaflet.css";
import { NavLink } from "react-router-dom";
import { useMapEvents } from "react-leaflet";
export default function MapView() {
  const { cities } = useCities();
  const navigate = useNavigate();
  function DetectClick() {
    const navigate = useNavigate();

    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        navigate(`/app/cities?lat=${lat}&lng=${lng}`);
      },
    });

    return null;
  }

  return (
    <MapContainer
      center={[40, 0]}
      zoom={3}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {cities.map((city) => (
        <Marker key={city.id} position={[city.position.lat, city.position.lng]}>
          <Popup>
            <span>{city.emoji}</span> {city.cityName}
            <br />
            <button onClick={() => navigate(`/app/cities/${city.id}`)}>
              Open
            </button>
          </Popup>
        </Marker>
      ))}
      <DetectClick />
    </MapContainer>
  );
}
