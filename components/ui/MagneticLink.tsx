"use client";

import Link from "next/link";
import { useMagnetic } from "@/lib/hooks/useMagnetic";

type MagneticLinkProps = React.ComponentProps<typeof Link> & {
  className?: string;
};

export default function MagneticLink({ className = "", children, ...props }: MagneticLinkProps) {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic();

  return (
    <Link
      ref={ref as React.Ref<HTMLAnchorElement>}
      className={`inline-block transition-transform duration-[250ms] ease-out ${className}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      {children}
    </Link>
  );
}
