import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 mt-16">
      <div className="container py-8 grid gap-6 md:grid-cols-3 items-center">
        <div className="order-2 md:order-1 text-center md:text-left">
          <p className="heading-serif text-lg">Bonita Leather</p>
          <p className="text-black/60 text-sm mt-1">Timeless leather, modern craftsmanship.</p>
        </div>
        <nav className="order-1 md:order-2 flex justify-center gap-6 text-sm">
          <Link href="/#shop" className="link-underline">Shop</Link>
          <Link href="/#about" className="link-underline">About</Link>
          <Link href="/#contact" className="link-underline">Contact</Link>
        </nav>
        <div className="order-3 text-center md:text-right text-sm text-black/60">
          <p>© {new Date().getFullYear()} Bonita Leather</p>
        </div>
      </div>
    </footer>
  );
}


