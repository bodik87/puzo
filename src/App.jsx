import { Outlet, useLocation } from "react-router-dom";
import NavMenu from "./components/NavMenu";
import HomePage from "./pages/HomePage";

export default function App() {
  const location = useLocation();
  const home = location.pathname === "/";
  return (
    <div className="max-w-7xl mx-auto pt-2 pb-10">
      {/* <div className="fixed bg-[#456786] inset-0 -z-10">
        <div className="fixed bg-white/80 backdrop-blur-3xl inset-0 -z-10" />
        <div className="fixed bg-[#d4e8fa] top-1/4 left-0 w-2/3 h-1/2 rounded-full -z-20" />
        <div className="fixed bg-[#6e4586] bottom-0 right-0 rotate-45 w-2/3 h-1/2 rounded-full -z-20" />
        <div className="fixed bg-[#6b9cc9] bottom-0 -left-1/3 rotate-45 w-2/3 h-1/2 rounded-full -z-20" />
        <div className="fixed bg-[#7c3d29] top-0 right-0 w-2/3 h-1/3 rounded-full -z-20" />
      </div> */}

      <NavMenu />
      {home ? <HomePage /> : <Outlet />}
    </div>
  );
}
