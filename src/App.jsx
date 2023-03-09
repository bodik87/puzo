import { Outlet, useLocation } from "react-router-dom";
import NavMenu from "./components/NavMenu";
import BackgroundImg from "./components/ui/BackgroundImg";
import HomePage from "./pages/HomePage";

export default function App() {
  const location = useLocation();
  const home = location.pathname === "/";
  return (
    <div className="max-w-7xl mx-auto pt-3 pb-10">
      <BackgroundImg color={"#1D4ED8"} />
      <NavMenu />
      {home ? <HomePage /> : <Outlet />}
    </div>
  );
}
