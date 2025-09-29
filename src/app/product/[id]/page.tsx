"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/products';
import { useCart } from '@/context/CartContext';

export default function ProductPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string);
  const [product, setProduct] = useState<Product | null>(null);
  const [size, setSize] = useState<string>('M');
  const [qty, setQty] = useState<number>(1);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    if (!id) return;
    fetch('/products.json').then(r => r.json()).then((list: Product[]) => {
      const p = list.find((x) => x.id === id) || null;
      setProduct(p);
    });
  }, [id]);

  const price = useMemo(() => product ? `$${product.price.toFixed(2)}` : '', [product]);

  if (!id) return null;
  if (product === null) return (
    <main className="container section">
      <p className="text-black/60">Loading...</p>
    </main>
  );
  if (!product) return notFound();

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <main className="section">
      <div className="container grid gap-12 lg:grid-cols-2 items-start">
        {/* Image Gallery */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative group">
            <div className="img-frame img-elevate rounded-2xl overflow-hidden">
              <Image 
                src={product.images[currentImageIndex]} 
                alt={`${product.name} - Image ${currentImageIndex + 1}`}
                width={800}
                height={600}
                className="w-full h-[500px] object-cover transition-transform duration-300 group-hover:scale-[1.02]" 
                priority={currentImageIndex === 0}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            
            {/* Navigation Arrows */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-black p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Previous image"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-black p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Next image"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Grid */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((img, index) => (
                <button
                  key={img}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative aspect-square overflow-hidden rounded-lg transition-all ${
                    index === currentImageIndex 
                      ? 'ring-2 ring-[var(--accent)] ring-offset-2' 
                      : 'hover:opacity-80'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 1024px) 25vw, 12.5vw"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Image Counter */}
          {product.images.length > 1 && (
            <p className="text-sm text-black/60 text-center">
              {currentImageIndex + 1} of {product.images.length}
            </p>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="heading-serif text-3xl md:text-4xl font-semibold">{product.name}</h1>
            <p className="mt-2 text-black/70 text-lg">{product.description}</p>
            <p className="mt-4 text-3xl font-semibold">{price}</p>
          </div>

          {/* Size Selection */}
          <div>
            <label className="text-sm font-medium text-black/70">Size</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button 
                  key={s} 
                  onClick={() => setSize(s)} 
                  className={`px-4 py-2 rounded-full border transition-all ${
                    size === s 
                      ? 'border-[var(--accent)] text-[var(--accent)] bg-[var(--accent)]/10' 
                      : 'border-black/20 text-black/80 hover:border-black/40'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selection */}
          <div>
            <label className="text-sm font-medium text-black/70">Quantity</label>
            <div className="mt-2 flex items-center gap-3">
              <button 
                className="btn-outline px-3 py-2 rounded-full" 
                onClick={() => setQty(Math.max(1, qty - 1))}
              >
                -
              </button>
              <span className="text-lg font-medium min-w-[2rem] text-center">{qty}</span>
              <button 
                className="btn-outline px-3 py-2 rounded-full" 
                onClick={() => setQty(qty + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <AddToCart 
            id={product.id} 
            name={product.name} 
            price={product.price} 
            thumbnail={product.thumbnail} 
            size={size} 
            qty={qty} 
          />

          {/* Additional Info */}
          <div className="pt-6 border-t border-black/10">
            <h3 className="font-medium mb-2">Product Details</h3>
            <ul className="text-sm text-black/70 space-y-1">
              <li>• Premium leather construction</li>
              <li>• Hand-finished details</li>
              <li>• Available in sizes S, M, L, XL</li>
              <li>• Free shipping on orders over $200</li>
              <li>• 30-day return policy</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

function AddToCart({ id, name, price, thumbnail, size, qty }: { 
  id: string; 
  name: string; 
  price: number; 
  thumbnail: string; 
  size: string; 
  qty: number; 
}) {
  const { addItem, open } = useCart();
  
  return (
    <div className="space-y-4">
      <button
        className="btn w-full px-6 py-4 text-lg"
        onClick={() => { 
          addItem({ id, name, price, thumbnail, size, quantity: qty }); 
          open(); 
        }}
      >
        Add to Cart - ${(price * qty).toFixed(2)}
      </button>
      <Link href="/products" className="link-underline text-sm block text-center">
        ← Continue Shopping
      </Link>
    </div>
  );
}