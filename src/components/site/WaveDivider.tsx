export function WaveDivider({ flip = false, color = "var(--color-background)" }: { flip?: boolean; color?: string }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none -mb-px w-full overflow-hidden leading-[0]"
      style={{ transform: flip ? "rotate(180deg)" : undefined }}
    >
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="block h-[60px] w-full md:h-[90px]"
      >
        <path
          d="M0,32 C240,96 480,0 720,32 C960,64 1200,96 1440,40 L1440,90 L0,90 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}
