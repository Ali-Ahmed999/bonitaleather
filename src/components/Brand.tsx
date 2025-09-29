import Link from "next/link";

export default function Brand() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="Bonita Leather Home">
      <div className="text-center">
        <div className="heading-serif text-xl font-medium tracking-wide">BONITA</div>
        <div className="heading-serif text-xs font-light tracking-widest text-black/70">LEATHER</div>
      </div>
    </Link>
  );
}


