type Props = { size?: number; className?: string; accent?: boolean };

export default function BrandMark({ size = 22, className, accent }: Props) {
  const fg = accent ? "var(--brand)" : "currentColor";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-label="zengo"
    >
      {/* architectural 4-quadrant mark, rotated for motion */}
      <g>
        <path d="M2 2h7v7H2z" fill={fg} />
        <path d="M15 2h7v7h-7z" fill={fg} opacity="0.55" />
        <path d="M2 15h7v7H2z" fill={fg} opacity="0.55" />
        <path d="M15 15h7v7h-7z" fill={fg} />
      </g>
    </svg>
  );
}
