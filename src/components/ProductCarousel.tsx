"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  hoverImage?: string;
  slug: string;
  badge?: string;
}

interface ProductCarouselProps {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllLink?: string;
}

export default function ProductCarousel({ title, subtitle, products, viewAllLink }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight">{title}</h2>
            {subtitle && (
              <p className="text-gray-500 mt-2 max-w-md">{subtitle}</p>
            )}
          </div>
          {viewAllLink && (
            <a
              href={viewAllLink}
              className="group text-sm font-bold tracking-wider flex items-center gap-2 hover:text-orange-500 transition border-b-2 border-black hover:border-orange-500 pb-1"
            >
              VIEW ALL PRODUCTS
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          )}
        </div>

        {/* Carousel */}
        <div className="relative">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="carousel-btn left-0 -translate-x-1/2 hidden md:flex"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto hide-scrollbar pb-4 -mx-4 px-4"
          >
            {products.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-[300px] md:w-[320px]">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scroll("right")}
            className="carousel-btn right-0 translate-x-1/2 hidden md:flex"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
