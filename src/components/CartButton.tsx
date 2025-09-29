"use client";

import React from 'react';
import { useCart } from '@/context/CartContext';

export default function CartButton() {
  const { count, toggle } = useCart();
  return (
    <button onClick={toggle} className="relative btn-outline px-4 py-2 text-sm rounded-full">
      Cart
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-[var(--accent)] text-black rounded-full text-xs px-2 py-0.5">{count}</span>
      )}
    </button>
  );
}
