"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const { items, total, clear } = useCart();
  const router = useRouter();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [payment, setPayment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      const order = {
        id: `ORD-${Date.now()}`,
        items,
        total,
        name,
        address,
      };
      try { localStorage.setItem('bonita_last_order', JSON.stringify(order)); } catch {}
      clear();
      router.push('/confirmation');
    }, 800);
  }

  return (
    <main className="section">
      <div className="container grid md:grid-cols-2 gap-12">
        <form onSubmit={onSubmit} className="card p-6">
          <h1 className="heading-serif text-3xl">Checkout</h1>
          <div className="mt-4">
            <label className="block text-sm text-black/70">Full Name</label>
            <input value={name} onChange={e => setName(e.target.value)} required className="mt-2 w-full bg-white border border-black/10 rounded-md px-3 py-2" />
          </div>
          <div className="mt-4">
            <label className="block text-sm text-black/70">Shipping Address</label>
            <textarea value={address} onChange={e => setAddress(e.target.value)} required className="mt-2 w-full bg-white border border-black/10 rounded-md px-3 py-2 h-28" />
          </div>
          <div className="mt-4">
            <label className="block text-sm text-black/70">Payment Details (mock)</label>
            <input value={payment} onChange={e => setPayment(e.target.value)} placeholder="Card 4242 4242 4242 4242" required className="mt-2 w-full bg-white border border-black/10 rounded-md px-3 py-2" />
          </div>
          <button disabled={submitting || items.length === 0} className="mt-6 btn px-6 py-3 disabled:opacity-60">
            {submitting ? 'Processing…' : 'Pay now'}
          </button>
        </form>
        <aside className="card p-6">
          <h2 className="heading-serif text-2xl">Order Summary</h2>
          <ul className="mt-4 space-y-3">
            {items.map(it => (
              <li key={`${it.id}-${it.size}`} className="flex items-center gap-3">
                <img src={it.thumbnail} className="w-14 h-14 rounded-md object-cover" />
                <div className="flex-1">
                  <p className="text-sm">{it.name}</p>
                  <p className="text-xs text-black/60">Size {it.size} × {it.quantity}</p>
                </div>
                <p className="text-sm">${(it.price * it.quantity).toFixed(2)}</p>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t border-black/10 pt-4 flex items-center justify-between">
            <span className="text-black/70">Total</span>
            <span className="text-lg font-semibold">${total.toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </main>
  );
}
