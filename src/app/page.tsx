import ProductGrid from "@/components/ProductGrid";
import Image from "next/image";
export default function Home() {
  return (
    <main className="font-sans">
      {/* Hero */}
      <section id="home" className="section-lg">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs tracking-widest text-black/50">HANDCRAFTED QUALITY</p>
              <h1 className="heading-serif mt-2 text-5xl md:text-6xl font-semibold leading-tight">
                Timeless Leather, Effortlessly Refined
              </h1>
              <p className="mt-4 text-black/70 max-w-prose">
                Premium jackets crafted with meticulous attention to detail. Quiet design. Enduring quality.
              </p>
              <div className="mt-6 flex items-center gap-4">
                <a href="#shop" className="btn px-6 py-3 text-sm">Shop Collection</a>
                <a href="#about" className="link-underline text-sm">Learn more</a>
              </div>
            </div>
            <div>
              <Image src="/images/jacket1.jpeg" alt="Leather Jacket" width={1200} height={800} className="w-full h-[480px] object-cover rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section id="shop" className="section">
        <div className="container">
          <div className="flex items-end justify-between mb-6">
            <h2 className="heading-serif text-3xl md:text-4xl font-semibold">Featured Jackets</h2>
            <a href="#" className="link-underline text-sm">View all</a>
          </div>
          <ProductGrid />
        </div>
      </section>

      {/* About */}
      <section id="about" className="section">
        <div className="container grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="heading-serif text-2xl md:text-3xl font-semibold">Crafted to Endure</h3>
            <p className="mt-3 text-black/70">
              We use premium hides and meticulous construction to ensure every piece ages with character. Minimal lines, maximum impact.
            </p>
            <div className="mt-5 flex gap-3">
              <a href="#contact" className="btn px-5 py-2 text-sm">Contact</a>
              <a href="#shop" className="link-underline text-sm">Shop now</a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Image src="/images/jacket8.jpeg" alt="Detail" width={600} height={400} className="h-48 w-full object-cover rounded-xl" />
            <Image src="/images/jacket9.jpeg" alt="Stitch" width={600} height={400} className="h-48 w-full object-cover rounded-xl" />
            <Image src="/images/jacket10.jpeg" alt="Texture" width={600} height={400} className="h-48 w-full object-cover rounded-xl" />
            <Image src="/images/jacket11.jpeg" alt="Finish" width={600} height={400} className="h-48 w-full object-cover rounded-xl" />
          </div>
        </div>
      </section>

      {/* Contact stub */}
      <section id="contact" className="section">
        <div className="container text-center">
          <p className="text-black/60 text-sm">Questions? Email us at <span className="text-[var(--accent)]">hello@bonitaleather.com</span></p>
        </div>
      </section>
    </main>
  );
}
