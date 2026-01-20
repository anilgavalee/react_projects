import { NavLink } from "react-router-dom";
export function Sidebar() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink
            to="cities"
            style={({ isActive }) => {
              return { fontWeight: isActive ? "bold" : "normal" };
            }}
          >
            cities
          </NavLink>
        </li>
        <li>
          <NavLink
            to="countries"
            style={({ isActive }) => ({
              fontWeight: isActive ? "bold" : "normal",
            })}
          >
            countries
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
