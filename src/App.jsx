import { Outlet, useLocation } from "react-router-dom";
import NavMenu from "./components/NavMenu";
import HomePage from "./pages/HomePage";

export default function App() {
  const location = useLocation();
  const home = location.pathname === "/";
  return (
    <div className="max-w-7xl mx-auto pt-2 pb-10">
      <svg
        width="590"
        height="519"
        viewBox="0 0 590 519"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="fixed inset-0 -z-10 w-full h-full"
      >
        <g filter="url(#filter0_f_109_13)">
          <ellipse
            cx="422"
            cy="225.5"
            rx="298"
            ry="259.5"
            fill="#7A9AFF"
            fill-opacity="0.44"
          />
        </g>
        <defs>
          <filter
            id="filter0_f_109_13"
            x="-76"
            y="-234"
            width="996"
            height="919"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="100"
              result="effect1_foregroundBlur_109_13"
            />
          </filter>
        </defs>
      </svg>
      <NavMenu />
      {home ? <HomePage /> : <Outlet />}
    </div>
  );
}
