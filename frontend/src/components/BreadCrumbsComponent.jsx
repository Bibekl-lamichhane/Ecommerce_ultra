"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const params = useParams();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className="font-semibold mx-8 text-orange-400">
      <Link href="/">Home</Link>

      {segments.map((segment, index) => {
        if (segment === params?.id) return null;

        const isProduct = segment === "product";

        const href = "/" + segments.slice(0, index + 1).join("/");

        const label = isProduct
          ? "Product"
          : decodeURIComponent(segment);

        return (
          <span key={href}>
            {" > "}
            {isProduct ? (
              <span>{label}</span>
            ) : (
              <Link href={href}>{label}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}