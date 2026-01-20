import { Routes, Route, Navigate } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import { Login } from "./pages/Login";
import { AppLayout } from "./pages/AppLayout";
import Cities from "./pages/Cities";
import { Countries } from "./pages/Countries";
import City from "./pages/City";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="app" element={<AppLayout />}>
          <Route index element={<Navigate replace to={"cities"} />}></Route>
          <Route path="cities" element={<Cities />}></Route>
          <Route path="cities/:id" element={<City/>}></Route>
          <Route path="countries" element={<Countries />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
