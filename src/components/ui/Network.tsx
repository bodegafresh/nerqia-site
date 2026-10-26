import type { Copy } from "../../content/copy";
export function Network({
  labels,
  foot,
}: {
  labels: Copy["hero"]["graphic"];
  foot: string;
}) {
  return (
    <div className="network" aria-hidden="true">
      <div className="network-grid" />
      <svg viewBox="0 0 540 520" className="network-svg" fill="none">
        <defs>
          <linearGradient
            id="route"
            x1="70"
            y1="100"
            x2="470"
            y2="440"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#93f0d2" />
            <stop offset="1" stopColor="#458cb5" />
          </linearGradient>
          <radialGradient id="core">
            <stop stopColor="#1a4149" />
            <stop offset="1" stopColor="#102730" />
          </radialGradient>
        </defs>
        <circle
          cx="270"
          cy="260"
          r="190"
          stroke="#33545d"
          strokeDasharray="2 10"
        />
        <circle cx="270" cy="260" r="139" stroke="#2c4c56" />
        <ellipse
          cx="270"
          cy="260"
          rx="225"
          ry="100"
          transform="rotate(-40 270 260)"
          stroke="#27454f"
        />
        <g stroke="url(#route)" strokeWidth="1.5">
          <path d="M80 157h85l55 60M413 121v80l-94 50M447 362h-72l-59-60M122 403v-72l93-49" />
          <path
            d="M89 157v-48h149M413 121h51v95M447 362v76H302M122 403H65v-95"
            opacity=".25"
          />
        </g>
        <g className="orbit-dots" fill="#93f0d2">
          <circle cx="270" cy="70" r="3" />
          <circle cx="460" cy="260" r="3" />
          <circle cx="270" cy="450" r="3" />
          <circle cx="80" cy="260" r="3" />
        </g>
        <g fill="#122a33" stroke="#477879">
          <rect x="46" y="125" width="66" height="66" rx="16" />
          <rect x="380" y="88" width="66" height="66" rx="16" />
          <rect x="414" y="330" width="66" height="66" rx="16" />
          <rect x="89" y="370" width="66" height="66" rx="16" />
        </g>
        <g stroke="#a9eddd" strokeWidth="1.8">
          <path d="M64 145h30v9H64zM64 162h30v9H64zM387 121h14m7-13 13 13-13 13M432 353h8v19h-8zM446 345h8v27h-8zM460 358h8v14h-8zM109 391h26v24h-26zM116 398h12M116 406h7" />
        </g>
        <path
          d="m270 172 77 44v88l-77 44-77-44v-88Z"
          fill="url(#core)"
          stroke="#6cccb6"
        />
        <path d="m270 184 67 39v75l-67 38-67-38v-75Z" stroke="#315e61" />
        <path
          d="M239 289v-58h13l36 58h13v-58"
          stroke="#e4fbf3"
          strokeWidth="8"
        />
        <circle cx="301" cy="228" r="7" fill="#93f0d2" />
        <g fill="#93f0d2">
          <circle cx="165" cy="157" r="3" />
          <circle cx="413" cy="201" r="3" />
          <circle cx="375" cy="362" r="3" />
          <circle cx="122" cy="331" r="3" />
        </g>
      </svg>
      {labels.map((label, i) => (
        <span key={label} className={`network-label label-${i}`}>
          {label}
        </span>
      ))}
      <p className="network-caption">
        <span className="status-dot" />
        {foot}
      </p>
    </div>
  );
}
