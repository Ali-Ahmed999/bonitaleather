"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import { Product } from '@/lib/products';
import { useCart } from '@/context/CartContext';

export default function ProductPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string);
  const [product, setProduct] = useState<Product | null>(null);
  const [size, setSize] = useState<string>('M');
  const [qty, setQty] = useState<number>(1);

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

  return (
    <main className="section">
      <div className="container grid gap-12 md:grid-cols-2 items-start">
        <div className="grid gap-3">
          <div className="img-frame img-elevate rounded-2xl overflow-hidden">
            <img src={product.images[0]} alt={product.name} className="w-full h-[520px] object-cover" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {product.images.slice(1).map((img) => (
              <div key={img} className="img-frame img-elevate rounded-xl overflow-hidden">
                <img src={img} alt={product.name} className="h-28 w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1 className="heading-serif text-3xl md:text-4xl font-semibold">{product.name}</h1>
          <p className="mt-2 text-black/70">{product.description}</p>
          <p className="mt-4 text-2xl font-semibold">{price}</p>

          <div className="mt-6">
            <label className="text-sm text-black/70">Size</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button key={s} onClick={() => setSize(s)} className={`px-3 py-1 rounded-full border ${size === s ? 'border-[var(--accent)] text-[var(--accent)]' : 'border-black/20 text-black/80'} transition-colors`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex items-center gap-2">
              <button className="btn-outline px-3 py-1 rounded-full" onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
              <span>{qty}</span>
              <button className="btn-outline px-3 py-1 rounded-full" onClick={() => setQty(qty + 1)}>+</button>
            </div>
          </div>

          <AddToCart id={product.id} name={product.name} price={product.price} thumbnail={product.thumbnail} size={size} qty={qty} />
        </div>
      </div>
    </main>
  );
}

function AddToCart({ id, name, price, thumbnail, size, qty }: { id: string; name: string; price: number; thumbnail: string; size: string; qty: number; }) {
  const { addItem, open } = useCart();
  return (
    <div className="mt-6 flex gap-3">
      <button
        className="btn px-6 py-3"
        onClick={() => { addItem({ id, name, price, thumbnail, size, quantity: qty }); open(); }}
      >
        Add to Cart
      </button>
      <a href="#shop" className="link-underline text-sm">Continue browsing</a>
    </div>
  );
}
