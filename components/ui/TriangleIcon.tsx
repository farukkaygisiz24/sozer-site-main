export default function TriangleIcon({
  className,
  fill = "#056492",
  size = 11,
}: {
  className?: string;
  fill?: string;
  size?: number;
}) {
  const h = Math.round((size * 11) / 12);
  return (
    <svg width={size} height={h} viewBox="0 0 12 11" className={className} aria-hidden>
      <path d="M6 0L12 11H0Z" fill={fill} />
    </svg>
  );
}
