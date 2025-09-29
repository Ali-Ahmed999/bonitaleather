"use client";

import React, { useState } from 'react';
import CartButton from '@/components/CartButton';
import Link from 'next/link';

export default function NavbarLinks() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Desktop */}
      <div className="hidden md:flex items-center gap-3">
        <Link href="/#shop" className="link-underline text-sm">Shop</Link>
        <Link href="/#about" className="link-underline text-sm">About</Link>
        <CartButton />
      </div>

      {/* Mobile */}
      <div className="md:hidden flex items-center gap-2">
        <CartButton />
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen(v => !v)}
          className="btn-outline px-3 py-2 text-sm rounded-full"
        >
          Menu
        </button>
      </div>

      {/* Mobile panel */}
      <div className={`md:hidden absolute right-0 mt-2 w-48 bg-white border border-black/10 rounded-xl shadow-sm transition-opacity ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <nav className="flex flex-col p-2">
          <Link href="/#shop" className="px-3 py-2 rounded-lg hover:bg-black/5" onClick={() => setOpen(false)}>Shop</Link>
          <Link href="/#about" className="px-3 py-2 rounded-lg hover:bg-black/5" onClick={() => setOpen(false)}>About</Link>
        </nav>
      </div>
    </div>
  );
}


