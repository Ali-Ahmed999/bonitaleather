"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ConfirmationPage() {
  const [order, setOrder] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    try {
      const raw = localStorage.getItem('bonita_last_order');
      if (raw) setOrder(JSON.parse(raw));
    } catch {}
  }, []);

  if (!order) {
    return (
      <main className="section">
        <div className="container text-center">
          <p className="text-black/60">No recent order found.</p>
          <a href="/" className="btn inline-block mt-4 px-5 py-2">Continue Shopping</a>
        </div>
      </main>
    );
  }

  return (
    <main className="section-lg">
      <div className="container text-center">
        <div className="inline-block text-left card p-8">
          <div className="text-center">
            <p className="text-xs tracking-widest text-black/50">ORDER CONFIRMED</p>
            <h1 className="heading-serif mt-2 text-3xl md:text-4xl font-semibold">
              Thank you. You're all set.
            </h1>
            <p className="mt-2 text-black/70">Order <span className="text-black">{order.id}</span> is being prepared.</p>
          </div>
          <div className="mt-6 border-t border-white/10 pt-6">
            <h2 className="heading-serif text-lg mb-3">Summary</h2>
            <ul className="space-y-2">
              {order.items.map((it: any) => (
                <li key={`${it.id}-${it.size}`} className="flex items-center gap-3">
                  <img src={it.thumbnail} className="w-12 h-12 rounded-md object-cover" />
                  <div className="flex-1">
                    <p className="text-sm">{it.name}</p>
                    <p className="text-xs text-black/60">Size {it.size} × {it.quantity}</p>
                  </div>
                  <p className="text-sm">${(it.price * it.quantity).toFixed(2)}</p>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-black/70">Total</span>
              <span className="text-lg font-semibold">${order.total.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-6 text-center">
            <a href="/" className="btn inline-block px-6 py-3">Continue Shopping</a>
          </div>
        </div>
      </div>
    </main>
  );
}
