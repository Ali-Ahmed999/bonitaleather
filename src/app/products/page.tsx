"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/products';
import { useCart } from '@/context/CartContext';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const { addItem } = useCart();

  useEffect(() => {
    fetch('/products.json')
      .then(r => r.json())
      .then(setProducts)
      .catch(() => setProducts([]));
  }, []);

  return (
    <main className="section">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="heading-serif text-4xl md:text-5xl font-semibold mb-4">Our Collection</h1>
          <p className="text-black/70 max-w-2xl mx-auto">
            Discover our curated selection of premium leather jackets, each crafted with meticulous attention to detail and timeless design.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <div key={product.id} className="group">
              <Link href={`/product/${product.id}`} className="block">
                <div className="relative aspect-[4/5] overflow-hidden img-frame img-elevate mb-4">
                  <Image 
                    src={product.thumbnail} 
                    alt={product.name} 
                    fill 
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]" 
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />
                </div>
              </Link>
              
              <div className="space-y-3">
                <div>
                  <h3 className="heading-serif text-lg font-medium">{product.name}</h3>
                  <p className="text-black/60 text-sm mt-1 line-clamp-2">{product.description}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">${product.price.toFixed(2)}</span>
                  <button
                    onClick={() => addItem({ 
                      id: product.id, 
                      name: product.name, 
                      price: product.price, 
                      thumbnail: product.thumbnail, 
                      size: 'M', 
                      quantity: 1 
                    })}
                    className="btn-outline px-4 py-2 text-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-black/60">Loading products...</p>
          </div>
        )}
      </div>
    </main>
  );
}
