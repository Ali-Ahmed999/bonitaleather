"use client";

import React, { useEffect, useState } from 'react';
import { Product } from '@/lib/products';
import { useCart } from '@/context/CartContext';

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const { addItem } = useCart();

  useEffect(() => {
    fetch('/products.json', { cache: 'no-store' })
      .then(r => r.json())
      .then(setProducts)
      .catch(() => setProducts([]));
  }, []);

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => (
        <div key={p.id} className="group">
          <a href={`/product/${p.id}`} className="block">
            <div className="relative aspect-[4/5] overflow-hidden img-frame img-elevate">
              <img src={p.thumbnail} alt={p.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
            </div>
          </a>
          <div className="px-1 py-3 flex items-center justify-between">
            <div>
              <p className="heading-serif text-lg">{p.name}</p>
              <p className="text-black/60 text-sm">${p.price.toFixed(2)}</p>
            </div>
            <button
              className="btn-outline px-3 py-1 text-xs opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all"
              onClick={() => addItem({ id: p.id, name: p.name, price: p.price, thumbnail: p.thumbnail, size: 'M', quantity: 1 })}
            >
              Add
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
