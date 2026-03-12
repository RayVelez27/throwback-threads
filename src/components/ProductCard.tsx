"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FileText, Plus } from "lucide-react";
import { useQuote } from "@/lib/quote-context";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  hoverImage?: string;
  slug: string;
  badge?: string;
}

interface ProductCardProps {
  product: Product;
}

const sizes = ["S", "M", "L", "XL", "2XL"];

export default function ProductCard({ product }: ProductCardProps) {
  const [showSizes, setShowSizes] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const { addItem } = useQuote();

  const handleAddToQuote = () => {
    if (!selectedSize) return;
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      slug: product.slug,
      size: selectedSize,
      quantity: 1,
    });
    setShowSizes(false);
    setSelectedSize(null);
  };

  return (
    <div className="product-card group relative bg-white border-2 border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-0 left-0 z-10 bg-orange-500 text-white px-3 py-1 text-xs font-bold tracking-wider">
          {product.badge}
        </div>
      )}

      {/* Product Image */}
      <Link href={`/products/${product.slug}`} className="block relative aspect-square overflow-hidden bg-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.hoverImage && (
          <Image
            src={product.hoverImage}
            alt={product.name}
            fill
            className="object-cover product-image-hover absolute inset-0"
          />
        )}

        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setShowSizes(true);
            }}
            className="bg-white text-black px-6 py-3 text-xs font-bold tracking-wider border-2 border-black hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all"
          >
            QUICK ADD
          </button>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4 border-t-2 border-black">
        <h3 className="text-sm font-bold tracking-wide mb-1 line-clamp-2 uppercase">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <p className="font-display text-xl">${product.price.toFixed(2)}</p>
          <span className="text-[10px] font-mono text-gray-500 bg-gray-100 px-2 py-1">6.5OZ COTTON</span>
        </div>
      </div>

      {/* Size Selector Modal */}
      {showSizes && (
        <div className="absolute inset-0 bg-white border-2 border-black z-20 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b-2 border-black">
            <span className="text-sm font-bold">SELECT SIZE</span>
            <button
              type="button"
              onClick={() => setShowSizes(false)}
              className="w-8 h-8 flex items-center justify-center hover:bg-black hover:text-white transition"
            >
              <Plus className="w-5 h-5 rotate-45" />
            </button>
          </div>
          <div className="flex-1 p-4">
            <div className="grid grid-cols-5 gap-2 mb-4">
              {sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 text-xs font-bold border-2 transition ${
                    selectedSize === size
                      ? "bg-black text-white border-black"
                      : "border-black hover:bg-orange-500 hover:text-white hover:border-orange-500"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            <button
              type="button"
              className={`w-full py-4 text-sm font-bold tracking-wider flex items-center justify-center gap-2 transition border-2 ${
                selectedSize
                  ? "bg-orange-500 text-white border-orange-500 hover:bg-orange-600"
                  : "bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed"
              }`}
              onClick={handleAddToQuote}
              disabled={!selectedSize}
            >
              <FileText className="w-4 h-4" />
              ADD TO QUOTE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
