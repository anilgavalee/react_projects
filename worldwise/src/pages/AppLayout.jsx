import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import MapView from "../components/MapView";
export function AppLayout() {
  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      <Sidebar />
      {/* Child routes will render here */}
      <Outlet />
      <MapView />
    </div>
  );
}
