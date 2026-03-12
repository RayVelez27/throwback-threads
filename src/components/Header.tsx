"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, Menu, X, ChevronDown, User, Minus, Plus, FileText } from "lucide-react";
import RopeLogo, { RopeLogoText } from "./RopeLogo";
import { useQuote } from "@/lib/quote-context";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { items, totalItems, totalPrice, removeItem, updateQuantity } = useQuote();

  return (
    <header className="w-full sticky top-0 z-50">
      {/* Top Marquee Banner */}
      <div className="bg-black text-white py-2 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="mx-8 text-xs tracking-[0.2em] font-medium flex items-center gap-3">
              <span className="text-orange-500">●</span>
              FREE SHIPPING OVER $75
              <span className="text-orange-500">●</span>
              WHAT YOU WEAR AFTER TAKING CARE OF BUSINESS
              <span className="text-orange-500">●</span>
              HEAVYWEIGHT 6.5OZ COTTON
              <span className="text-orange-500">●</span>
              BOSTON BUILT
            </span>
          ))}
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white border-b-2 border-black">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Mobile Menu Button */}
            <button
              type="button"
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <RopeLogo size="sm" variant="dark" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-10">
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown("shop")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button type="button" className="flex items-center space-x-1 text-sm font-semibold tracking-wide hover:text-orange-500 transition">
                  <span>SHOP</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {activeDropdown === "shop" && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="space-y-4">
                      <Link href="/shop" className="block text-sm font-medium hover:text-orange-500 transition">All Products</Link>
                      <Link href="/new-arrivals" className="block text-sm font-medium hover:text-orange-500 transition">New Drops</Link>
                      <Link href="/tees" className="block text-sm font-medium hover:text-orange-500 transition">Heavyweight Tees</Link>
                      <Link href="/hoodies" className="block text-sm font-medium hover:text-orange-500 transition">Hoodies</Link>
                      <Link href="/bottoms" className="block text-sm font-medium hover:text-orange-500 transition">Bottoms</Link>
                    </div>
                  </div>
                )}
              </div>

              <Link href="/about" className="text-sm font-semibold tracking-wide hover:text-orange-500 transition">
                OUR STORY
              </Link>

              <Link href="/quality" className="text-sm font-semibold tracking-wide hover:text-orange-500 transition">
                QUALITY PROMISE
              </Link>

              <Link href="/fafo" className="text-sm font-semibold tracking-wide text-orange-500 hover:text-orange-600 transition">
                FAFO
              </Link>
            </nav>

            {/* Right Icons */}
            <div className="flex items-center space-x-3">
              <button type="button" className="p-2 hover:bg-black hover:text-white transition border-2 border-transparent hover:border-black">
                <Search className="w-5 h-5" />
              </button>
              <button type="button" className="p-2 hover:bg-black hover:text-white transition border-2 border-transparent hover:border-black hidden lg:block">
                <User className="w-5 h-5" />
              </button>
              <button
                type="button"
                className="p-2 hover:bg-black hover:text-white transition border-2 border-transparent hover:border-black relative"
                onClick={() => setIsCartOpen(!isCartOpen)}
              >
                <FileText className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {totalItems}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[calc(2.5rem+5rem)] bg-white z-40 overflow-y-auto border-t-2 border-black">
          <nav className="p-6 space-y-6">
            <div>
              <p className="text-sm font-bold mb-4 text-orange-500">SHOP</p>
              <div className="space-y-3 pl-4 border-l-2 border-black">
                <Link href="/shop" className="block text-sm font-medium" onClick={() => setIsMenuOpen(false)}>All Products</Link>
                <Link href="/new-arrivals" className="block text-sm font-medium" onClick={() => setIsMenuOpen(false)}>New Drops</Link>
                <Link href="/tees" className="block text-sm font-medium" onClick={() => setIsMenuOpen(false)}>Heavyweight Tees</Link>
                <Link href="/hoodies" className="block text-sm font-medium" onClick={() => setIsMenuOpen(false)}>Hoodies</Link>
              </div>
            </div>
            <Link href="/about" className="block text-sm font-bold" onClick={() => setIsMenuOpen(false)}>OUR STORY</Link>
            <Link href="/quality" className="block text-sm font-bold" onClick={() => setIsMenuOpen(false)}>QUALITY PROMISE</Link>
            <Link href="/fafo" className="block text-sm font-bold text-orange-500" onClick={() => setIsMenuOpen(false)}>FAFO</Link>
          </nav>
        </div>
      )}

      {/* Quote Sidebar */}
      {isCartOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/70 z-40"
            onClick={() => setIsCartOpen(false)}
            onKeyDown={(e) => e.key === "Escape" && setIsCartOpen(false)}
          />
          <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 border-l-2 border-black flex flex-col">
            <div className="p-6 flex-1 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl">YOUR QUOTE</h2>
                <button type="button" onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-black hover:text-white transition">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <FileText className="w-20 h-20 text-gray-200 mb-4" />
                  <p className="text-gray-500 mb-2 font-medium">Your quote is empty</p>
                  <p className="text-sm text-gray-400 mb-6">Add some products to get a quote.</p>
                  <Link
                    href="/products"
                    className="bg-black text-white px-8 py-4 text-sm font-bold tracking-wider hover:bg-orange-500 transition border-2 border-black"
                    onClick={() => setIsCartOpen(false)}
                  >
                    SHOP NOW
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-4 border-2 border-black p-3">
                      <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs font-bold tracking-wider truncate">{item.name}</h3>
                        <p className="text-xs text-gray-500 mt-1">Size: {item.size}</p>
                        <p className="text-sm font-bold mt-1">${item.price.toFixed(2)}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-black">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 transition"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-7 h-7 flex items-center justify-center text-xs font-bold border-x border-black">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 transition"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id, item.size)}
                            className="text-[10px] font-bold text-red-500 hover:text-red-700 transition"
                          >
                            REMOVE
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t-2 border-black">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold tracking-wider">ESTIMATED TOTAL</span>
                  <span className="font-display text-xl">${totalPrice.toFixed(2)}</span>
                </div>
                <Link
                  href="/quote"
                  className="w-full bg-orange-500 text-white py-4 text-sm font-bold tracking-wider flex items-center justify-center gap-2 hover:bg-orange-600 transition border-2 border-orange-500"
                  onClick={() => setIsCartOpen(false)}
                >
                  <FileText className="w-4 h-4" />
                  SUBMIT QUOTE REQUEST
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </header>
  );
}
