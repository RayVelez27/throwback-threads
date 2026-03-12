"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { allProducts, categories, type Category } from "@/lib/products";

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");

  const filtered = activeCategory === "All"
    ? allProducts
    : allProducts.filter((p) => p.category === activeCategory);

  return (
    <main className="min-h-screen">
      <Header />

      <section className="bg-black text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-5xl md:text-6xl mb-4">ALL PRODUCTS</h1>
          <p className="text-white/60 max-w-xl mx-auto">
            Premium heavyweight cotton. Bold designs that actually last. No BS, just quality.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            type="button"
            onClick={() => setActiveCategory("All")}
            className={`px-4 py-2 text-xs font-bold tracking-wider border-2 transition ${
              activeCategory === "All"
                ? "bg-black text-white border-black"
                : "border-black hover:bg-orange-500 hover:text-white hover:border-orange-500"
            }`}
          >
            ALL ({allProducts.length})
          </button>
          {categories.map((cat) => {
            const count = allProducts.filter((p) => p.category === cat).length;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-bold tracking-wider border-2 transition ${
                  activeCategory === cat
                    ? "bg-black text-white border-black"
                    : "border-black hover:bg-orange-500 hover:text-white hover:border-orange-500"
                }`}
              >
                {cat.toUpperCase()} ({count})
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between mb-6">
          <p className="text-sm font-mono text-gray-500">{filtered.length} PRODUCTS</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
