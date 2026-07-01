export function Logo({
  className = "h-10 w-auto",
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "dark";
}) {
  const lilFill = variant === "dark" ? "#FAF6EF" : "#3A352F";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 352 100"
      role="img"
      aria-label="Lil Champs"
      className={className}
    >
      <g transform="translate(56,52)">
        <polygon
          points="-34,-35 -31.3,-27.7 -23.5,-27.4 -29.6,-22.6 -27.5,-15.1 -34,-19.4 -40.5,-15.1 -38.4,-22.6 -44.5,-27.4 -36.7,-27.7"
          fill="#F7D9A0"
        />
        <g transform="translate(20.4,-35.6) scale(0.8)">
          <path
            d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"
            fill="#8DA47E"
          />
        </g>
        <circle cx="32" cy="18" r="5" fill="#F4A28C" />
        <circle cx="0" cy="0" r="32" fill="#F3D9B6" />
        <circle cx="-16" cy="9" r="5" fill="#EC9A82" />
        <circle cx="16" cy="9" r="5" fill="#EC9A82" />
        <circle cx="-10" cy="-2" r="3.4" fill="#3A352F" />
        <circle cx="10" cy="-2" r="3.4" fill="#3A352F" />
        <path
          d="M-10 10 Q0 20 10 10"
          fill="none"
          stroke="#3A352F"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M-4 -30 q5 -13 17 -6"
          fill="none"
          stroke="#3A352F"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </g>
      <text
        x="116"
        y="66"
        fontFamily="Nunito, Quicksand, 'Segoe UI', sans-serif"
        fontSize="42"
        fontWeight="800"
        rotate="-7 6 -5 0 -8 5 -4 7 -5 5"
      >
        <tspan fill={lilFill}>Lil </tspan>
        <tspan fill="#8DA47E">Champs</tspan>
      </text>
    </svg>
  );
}
