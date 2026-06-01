/* global React */
/* =========================================================================
   Icon — Lucide-style line icons (1.75–2px stroke, round joins).
   Usage: <Icon n="dashboard" /> or <Icon n="shield" s={24} />
   ========================================================================= */
const ICONS = {
  // platform / capability
  dashboard: "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z",
  ai: "M12 5l1.5 4.5 4.5 1.5-4.5 1.5-1.5 4.5-1.5-4.5-4.5-1.5 4.5-1.5zM20 3l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7zM4 19l.5 1.2 1.2.5-1.2.5-.5 1.2-.5-1.2-1.2-.5 1.2-.5z",
  web: "M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5zM3 9h18M9 9v12M6 6h.01M8 6h.01",
  inventory: "M12 2l9 4.5-9 4.5-9-4.5L12 2zM3 12l9 4.5 9-4.5M3 16.5l9 4.5 9-4.5",
  mobile: "M7 2h10a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zM10 18h4",
  analytics: "M3 3v18h18M7 17v-4M11 17V8M15 17v-6M19 17V5",
  academy: "M22 10L12 5 2 10l10 5 10-5zM6 12v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5",
  shield: "M12 3l8 4v4c0 5.5-3.4 8.3-8 10-4.6-1.7-8-4.5-8-10V7l8-4zM9 12l2 2 4-4",
  crm: "M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8",
  // features / actions
  customize: "M12 2v3M12 19v3M5 12H2M22 12h-3M6.3 6.3l-2 -2M19.7 6.3l2-2M6.3 17.7l-2 2M19.7 17.7l2 2M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",
  scale: "M3 21V3M3 21h18M7 17v-5M12 17V7M17 17v-9",
  plug: "M15 7h2a5 5 0 0 1 0 10h-2M9 7H7a5 5 0 0 0 0 10h2M8 12h8",
  calendar: "M3 4h18v17H3zM8 2v4M16 2v4M3 9h18",
  gavel: "m14 7-3-3-9 9 3 3 9-9zM6 12l6 6 9-9-6-6M3 21h8",
  bidders: "M9 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM3 21v-1a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v1M17 11l2 2 4-4",
  card: "M2 6h20v12H2zM2 10h20M6 15h4",
  marketing: "M3 11v2a2 2 0 0 0 2 2h2l5 4V5L7 9H5a2 2 0 0 0-2 2zM16 9a3 3 0 0 1 0 6M19 6a7 7 0 0 1 0 12",
  support: "M4 15v-3a8 8 0 0 1 16 0v3M2 15a2 2 0 0 1 2-2h1v5H4a2 2 0 0 1-2-2zM19 13h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1v-5zM18 19a3 3 0 0 1-3 3h-1",
  // real estate
  home: "M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5M9.5 21v-6h5v6",
  building: "M4 21V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v17M14 21V9h5a1 1 0 0 1 1 1v11M7 7h3M7 11h3M7 15h3M17 13h.5M17 17h.5M3 21h18",
  map: "M9 4 3 6.5v13.5l6-2.5 6 2.5 6-2.5V3l-6 2.5L9 4zM9 4v13.5M15 6.5V20",
  bed: "M3 18v-9M3 13h13a4 4 0 0 1 4 4v1M21 18v-4M3 18h18M7 13v-3h5a3 3 0 0 1 3 3",
  ruler: "M3 17 17 3l4 4L7 21zM7 13l2 2M11 9l2 2M15 5l2 2",
  coins: "M12 8c4.4 0 8-1.1 8-2.5S16.4 3 12 3 4 4.1 4 5.5 7.6 8 12 8zM4 5.5v5C4 11.9 7.6 13 12 13s8-1.1 8-2.5v-5M4 10.5v5c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5v-5",
  idcard: "M2 5h20v14H2zM6 9.5h4M6 13h7M15.5 9h3v4h-3zM15.5 9v4",
  percent: "M19 5 5 19M7 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM17 18.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z",
  doc: "M6 2h8l4 4v16H6zM14 2v4h4M9 13h6M9 17h6M9 9h2",
  code: "M8 8l-4 4 4 4M16 8l4 4-4 4M13 6l-2 12",
  key: "M14 7a4 4 0 1 0-3.5 6.9L9 15l-1.5 1.5L9 18l-1.5 1.5L7 21H4v-3l6.1-6.1A4 4 0 0 0 14 7zM15.5 7.5h.01",
  pin: "M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  down: "M6 9l6 6 6-6",
  phone: "M5 3h4l2 5-3 2a13 13 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A18 18 0 0 1 3 5a2 2 0 0 1 2-2z",
  chat: "M4 5h16v11H9l-4 4V5z",
  arrowdr: "M5 12h14M13 6l6 6-6 6",
  // misc
  check: "M5 13l4 4L19 7",
  arrow: "M5 12h14M13 6l6 6-6 6",
  play: "M8 5v14l11-7z",
  lock: "M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4",
  eye: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  monitor: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2",
  database: "M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3",
  globe: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM2 12h20M12 2c2.5 2.7 4 6.3 4 10s-1.5 7.3-4 10c-2.5-2.7-4-6.3-4-10s1.5-7.3 4-10z",
  zap: "M13 2L4 14h7l-1 8 9-12h-7l1-8z",
  bolt: "M13 2L4 14h7l-1 8 9-12h-7l1-8z",
  menu: "M3 6h18M3 12h18M3 18h18",
  close: "M6 6l12 12M18 6L6 18",
  chevR: "M9 6l6 6-6 6",
  chevL: "M15 6l-6 6 6 6",
  qr: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h3v3h-3zM20 14v3M17 20h4M14 20v1",
  upload: "M12 16V4M7 9l5-5 5 5M4 17v3h16v-3",
  receipt: "M5 2v20l2-1.5L9 22l2-1.5L13 22l2-1.5L17 22l2-1.5V2l-2 1.5L15 2l-2 1.5L11 2 9 3.5 7 2 5 3.5zM8 8h8M8 12h8",
  layers: "M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5",
  twitter: "M22 4c-.8.4-1.6.6-2.5.8a4.3 4.3 0 0 0 1.9-2.4c-.9.5-1.8.9-2.8 1.1a4.2 4.2 0 0 0-7.2 3.9A12 12 0 0 1 3 3.6a4.2 4.2 0 0 0 1.3 5.6c-.7 0-1.3-.2-1.9-.5a4.2 4.2 0 0 0 3.4 4.1c-.6.2-1.2.2-1.8.1a4.2 4.2 0 0 0 3.9 2.9A8.5 8.5 0 0 1 2 17.5a12 12 0 0 0 6.5 1.9c7.8 0 12-6.5 12-12.1v-.5c.8-.6 1.5-1.4 2-2.3z",
  linkedin: "M4 4h4v4H4zM4 9h4v11H4zM10 9h4v2a3 3 0 0 1 6 0v9h-4v-7a1.5 1.5 0 0 0-3 0v7h-4V9z",
};

const FILLED = { twitter: 1, linkedin: 1 };

const Icon = ({ n, s = 22, sw = 1.85, className = "", style }) => {
  const filled = FILLED[n];
  return (
    <svg
      className={className}
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      aria-hidden="true"
    >
      {(ICONS[n] || "").split("M").filter(Boolean).map((d, i) => (
        <path key={i} d={"M" + d} />
      ))}
    </svg>
  );
};

window.Icon = Icon;
window.ICONS = ICONS;
