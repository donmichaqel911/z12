type Props = {
  data: number[];
  width?: number;
  height?: number;
  up?: boolean;
  stroke?: string;
  fill?: boolean;
};

export default function Sparkline({
  data,
  width = 88,
  height = 32,
  up,
  stroke,
  fill = false,
}: Props) {
  if (!data || data.length < 2) {
    return <div style={{ width, height }} />;
  }
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const dx = width / (data.length - 1);

  const pts = data
    .map((p, i) => `${(i * dx).toFixed(2)},${(height - ((p - min) / range) * height).toFixed(2)}`)
    .join(" ");

  const color = stroke ?? (up === undefined
    ? data[data.length - 1] >= data[0]
      ? "var(--up)"
      : "var(--down)"
    : up
    ? "var(--up)"
    : "var(--down)");

  const areaPath = `M0,${height} L${pts.replaceAll(" ", " L")} L${width},${height} Z`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {fill && (
        <path d={areaPath} fill={color} opacity={0.15} />
      )}
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
