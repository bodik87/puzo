import React from "react";

export default function BackgroundImg({ color }) {
  return (
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
          fill={color}
          fillOpacity="0.15"
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
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
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
  );
}
