"use client";

import React from 'react';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const { isOpen, close, items, total, updateQuantity, removeItem } = useCart();

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? '' : 'pointer-events-none'}`} aria-hidden={!isOpen}>
      <div className={`absolute inset-0 bg-black/30 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`} onClick={close}></div>
      <aside className={`absolute right-0 top-0 h-full w-[90%] sm:w-[420px] bg-white border-l border-black/10 p-4 flex flex-col transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between mb-4">
          <h4 className="heading-serif text-lg">Your Cart</h4>
          <button onClick={close} className="text-black/60 hover:text-black">Close</button>
        </div>
        <div className="flex-1 overflow-auto space-y-3">
          {items.length === 0 && (
            <p className="text-black/60">Your cart is empty.</p>
          )}
          {items.map((it) => (
            <div key={`${it.id}-${it.size}`} className="p-3 flex gap-3 border border-black/10 rounded-xl bg-white">
              <img src={it.thumbnail} alt={it.name} className="w-16 h-16 object-cover rounded-md" />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm">{it.name}</p>
                    <p className="text-xs text-black/60">Size: {it.size}</p>
                  </div>
                  <button onClick={() => removeItem(it.id, it.size)} className="text-xs text-black/60 hover:text-black">Remove</button>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button className="btn-outline px-2 py-1 text-xs rounded-full" onClick={() => updateQuantity(it.id, it.size, Math.max(1, it.quantity - 1))}>-</button>
                    <span className="text-sm">{it.quantity}</span>
                    <button className="btn-outline px-2 py-1 text-xs rounded-full" onClick={() => updateQuantity(it.id, it.size, it.quantity + 1)}>+</button>
                  </div>
                  <p className="text-sm">${(it.price * it.quantity).toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 border-t border-black/10 pt-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-black/70">Total</span>
            <span className="text-lg font-semibold">${total.toFixed(2)}</span>
          </div>
          <a href="/checkout" className="btn w-full inline-block text-center px-4 py-3">Checkout</a>
        </div>
      </aside>
    </div>
  );
}
