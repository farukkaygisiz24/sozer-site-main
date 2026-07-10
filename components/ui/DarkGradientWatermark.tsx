import Image from "next/image";

const VARIANTS = {
  hero: {
    width: 340,
    height: 297,
    desktop: {
      imageClass: "h-[297px]",
      position: "right-[-70px] bottom-[-90px]",
      opacity: "opacity-[.08]",
    },
    mobile: {
      imageClass: "h-[160px]",
      position: "right-3 bottom-4",
      opacity: "opacity-[.18]",
    },
    glow: true,
  },
  card: {
    width: 280,
    height: 245,
    desktop: {
      imageClass: "h-[245px]",
      position: "right-[-55px] bottom-[-70px]",
      opacity: "opacity-[.08]",
    },
    mobile: {
      imageClass: "h-[140px]",
      position: "right-3 bottom-4",
      opacity: "opacity-[.2]",
    },
    glow: false,
  },
  compact: {
    width: 220,
    height: 192,
    desktop: {
      imageClass: "h-[192px]",
      position: "right-[-40px] bottom-[-48px]",
      opacity: "opacity-[.08]",
    },
    mobile: {
      imageClass: "h-[128px]",
      position: "right-3 bottom-4",
      opacity: "opacity-[.26]",
    },
    glow: false,
  },
} as const;

type DarkGradientWatermarkProps = {
  variant?: keyof typeof VARIANTS;
};

function WatermarkMark({
  width,
  height,
  imageClass,
  position,
  opacity,
  className = "",
}: {
  width: number;
  height: number;
  imageClass: string;
  position: string;
  opacity: string;
  className?: string;
}) {
  return (
    <span
      className={`absolute block rotate-[8deg] ${opacity} ${position} ${className}`}
    >
      <Image
        src="/images/brand/sozer-mark.png"
        alt=""
        width={width}
        height={height}
        className={`${imageClass} w-auto`}
      />
    </span>
  );
}

export default function DarkGradientWatermark({ variant = "card" }: DarkGradientWatermarkProps) {
  const config = VARIANTS[variant];

  return (
    <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
      {config.glow ? (
        <>
          <div className="absolute -top-[160px] -right-[120px] hidden h-[420px] w-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(43,142,194,.22),transparent_70%)] min-[901px]:block" />
          <div className="absolute -top-[90px] -right-[60px] block h-[240px] w-[320px] rounded-full bg-[radial-gradient(closest-side,rgba(43,142,194,.18),transparent_70%)] min-[901px]:hidden" />
        </>
      ) : null}

      <WatermarkMark
        width={config.width}
        height={config.height}
        imageClass={config.desktop.imageClass}
        position={config.desktop.position}
        opacity={config.desktop.opacity}
        className="hidden min-[901px]:block"
      />
      <WatermarkMark
        width={config.width}
        height={config.height}
        imageClass={config.mobile.imageClass}
        position={config.mobile.position}
        opacity={config.mobile.opacity}
        className="block min-[901px]:hidden"
      />
    </div>
  );
}
