import { Outlet, useLocation } from "react-router-dom";
import NavMenu from "./components/NavMenu";
import HomePage from "./pages/HomePage";

export default function App() {
  const location = useLocation();
  const home = location.pathname === "/";
  return (
    <div className="max-w-7xl mx-auto pt-2 pb-10">
      <NavMenu />
      {home ? <HomePage /> : <Outlet />}
    </div>
  );
}
