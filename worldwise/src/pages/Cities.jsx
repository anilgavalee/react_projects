import { Outlet, useParams, useSearchParams} from "react-router-dom";
import CityList from "../components/CityList";
import AddCity from "./AddCity";

export default function Cities() {
  const {id} = useParams();
  console.log(id);
  
const [searchParam] = useSearchParams();
const lat = searchParam.get('lat');
const lng = searchParam.get('lng');
  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      <CityList />
      <Outlet></Outlet>
      {lat && lng && <AddCity></AddCity>}
    </div>
  );
}
