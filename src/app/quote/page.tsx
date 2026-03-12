"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, X, FileText, Send, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useQuote } from "@/lib/quote-context";

export default function QuotePage() {
  const { items, totalItems, totalPrice, removeItem, updateQuantity, clearQuote } = useQuote();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to an API
    console.log("Quote submitted:", { items, formData, totalPrice });
    setSubmitted(true);
    clearQuote();
  };

  if (submitted) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-lg mx-auto text-center">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h1 className="font-display text-4xl mb-4">QUOTE SUBMITTED</h1>
            <p className="text-gray-600 mb-8">
              Thanks, {formData.name}! We&apos;ve received your quote request and will get back to you
              at <strong>{formData.email}</strong> within 24 hours.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 text-sm font-bold tracking-wider hover:bg-orange-500 transition border-2 border-black"
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-8">
          <Link href="/" className="text-gray-500 hover:text-black transition">Home</Link>
          <span className="text-gray-300">/</span>
          <span className="font-medium">Quote</span>
        </div>

        <h1 className="font-display text-4xl md:text-5xl mb-8">YOUR QUOTE</h1>

        {items.length === 0 ? (
          <div className="text-center py-16 border-2 border-black">
            <FileText className="w-20 h-20 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-500 mb-2 font-medium text-lg">Your quote is empty</p>
            <p className="text-sm text-gray-400 mb-6">Add some products to get started.</p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 text-sm font-bold tracking-wider hover:bg-orange-500 transition border-2 border-black"
            >
              <ArrowLeft className="w-4 h-4" />
              BROWSE PRODUCTS
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quote Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="border-b-2 border-black pb-2 mb-4">
                <span className="text-sm font-bold tracking-wider">{totalItems} ITEM{totalItems !== 1 ? "S" : ""} IN YOUR QUOTE</span>
              </div>

              {items.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex gap-4 border-2 border-black p-4"
                >
                  <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                    {item.logoSrc && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="bg-orange-500 text-white text-[8px] font-bold px-1.5 py-0.5 absolute bottom-1 right-1">
                          CUSTOM
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-bold tracking-wider">{item.name}</h3>
                        <p className="text-xs text-gray-500 mt-1">Size: {item.size}</p>
                        {item.logoSrc && (
                          <p className="text-xs text-orange-500 font-medium mt-1">Custom logo included</p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id, item.size)}
                        className="p-1 hover:bg-red-50 text-gray-400 hover:text-red-500 transition flex-shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border-2 border-black">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                          className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-9 h-9 flex items-center justify-center text-sm font-bold border-x-2 border-black">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="font-display text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}

              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-sm font-bold tracking-wider hover:text-orange-500 transition mt-4"
              >
                <ArrowLeft className="w-4 h-4" />
                ADD MORE ITEMS
              </Link>
            </div>

            {/* Quote Form */}
            <div className="lg:col-span-1">
              <div className="border-2 border-black p-6 sticky top-32">
                <h2 className="font-display text-2xl mb-2">REQUEST QUOTE</h2>
                <p className="text-xs text-gray-500 mb-6">Fill in your details and we&apos;ll get back to you with a custom quote.</p>

                {/* Price Summary */}
                <div className="border-t-2 border-b-2 border-black py-4 mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">Subtotal ({totalItems} items)</span>
                    <span className="font-bold">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">Shipping</span>
                    <span className="font-bold text-orange-500">TBD</span>
                  </div>
                  <div className="flex justify-between text-lg mt-4 pt-4 border-t border-gray-200">
                    <span className="font-bold">Estimated Total</span>
                    <span className="font-display text-xl">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold tracking-wider block mb-1">
                      FULL NAME <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
                      className="w-full border-2 border-black px-3 py-2.5 text-sm focus:outline-none focus:border-orange-500 transition"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold tracking-wider block mb-1">
                      EMAIL <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData((f) => ({ ...f, email: e.target.value }))}
                      className="w-full border-2 border-black px-3 py-2.5 text-sm focus:outline-none focus:border-orange-500 transition"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold tracking-wider block mb-1">
                      PHONE
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData((f) => ({ ...f, phone: e.target.value }))}
                      className="w-full border-2 border-black px-3 py-2.5 text-sm focus:outline-none focus:border-orange-500 transition"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold tracking-wider block mb-1">
                      COMPANY / ORGANIZATION
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData((f) => ({ ...f, company: e.target.value }))}
                      className="w-full border-2 border-black px-3 py-2.5 text-sm focus:outline-none focus:border-orange-500 transition"
                      placeholder="Optional"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold tracking-wider block mb-1">
                      ADDITIONAL NOTES
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData((f) => ({ ...f, notes: e.target.value }))}
                      rows={3}
                      className="w-full border-2 border-black px-3 py-2.5 text-sm focus:outline-none focus:border-orange-500 transition resize-none"
                      placeholder="Custom colors, quantities, deadlines, etc."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-orange-500 text-white py-4 text-sm font-bold tracking-wider flex items-center justify-center gap-2 hover:bg-orange-600 transition border-2 border-orange-500"
                  >
                    <Send className="w-4 h-4" />
                    SUBMIT QUOTE REQUEST
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
