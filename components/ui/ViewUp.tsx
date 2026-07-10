export default function ViewUp({
  children,
  className = "",
  range = "entry 0% cover 28%",
}: {
  children: React.ReactNode;
  className?: string;
  range?: string;
}) {
  return (
    <div className={`animate-view-up ${className}`} style={{ animationRange: range }}>
      {children}
    </div>
  );
}
