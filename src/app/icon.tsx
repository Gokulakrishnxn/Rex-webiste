import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="#1a1a1a"
            stroke="#ffffff"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />
          <line x1="17" y1="9" x2="17" y2="15" stroke="#ffffff" strokeWidth="0.9" strokeLinecap="round" />
          <line x1="14" y1="12" x2="20" y2="12" stroke="#ffffff" strokeWidth="0.9" strokeLinecap="round" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
