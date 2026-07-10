import Image from "next/image";

export default function LogoMark({
  size = 16,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src="/images/onlylogo-watermark.png"
      alt=""
      width={size}
      height={size}
      className={`w-auto shrink-0 opacity-90 ${className}`}
      style={{ height: size }}
      aria-hidden
    />
  );
}
