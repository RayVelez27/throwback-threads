"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export default function CollectionBanner() {
  const features = [
    "Premium heavyweight 6.5oz cotton",
    "Reinforced double-stitched seams",
    "Pre-shrunk & colorfast",
    "Built to last 5+ years",
    "1-year quality warranty",
  ];

  return (
    <section className="relative bg-[#141414] overflow-hidden">
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-20 lg:py-32">
          {/* Content */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 mb-8">
              <span className="text-xs font-bold tracking-widest">FLAGSHIP PRODUCT</span>
            </div>

            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-white leading-[0.95] mb-6">
              "WHAT YOU WEAR
              <br />
              <span className="text-orange-500">AFTER TAKING</span>
              <br />
              CARE OF BUSINESS"
            </h2>

            <p className="text-white/70 text-lg max-w-md mb-8 leading-relaxed">
              Our motto. Our promise. This isn't just a t-shirt—it's a manifesto.
              Premium heavyweight cotton, reinforced construction, honest pricing.
              What you see is what you get—excellence.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 text-white/80">
                  <div className="w-5 h-5 bg-orange-500 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* Price & CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div>
                <span className="text-white/50 text-sm font-mono">STARTING AT</span>
                <p className="font-display text-4xl text-white">$34.99</p>
              </div>
              <Link
                href="/products/no-bs-tee"
                className="group bg-orange-500 text-white px-8 py-4 text-sm font-bold tracking-widest hover:bg-orange-600 transition-all flex items-center gap-3 border-2 border-orange-500"
              >
                SHOP THE NO BS TEE
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-orange-500/20 to-transparent border-2 border-white/10 flex items-center justify-center relative">
              {/* Mock T-shirt Design */}
              <div className="text-center p-8">
                <div className="border-4 border-white p-8 md:p-12">
                  <p className="font-display text-2xl md:text-4xl text-white leading-tight">
                    WHAT YOU WEAR
                    <br />
                    <span className="text-orange-500">AFTER TAKING</span>
                    <br />
                    CARE OF BUSINESS
                  </p>
                  <div className="mt-6 pt-6 border-t border-white/30">
                    <p className="text-white/60 text-xs tracking-widest">THROWBACK THREADS</p>
                    <p className="text-white/40 text-xs tracking-wider mt-1">BOSTON • EST. 2024</p>
                  </div>
                </div>
              </div>

              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-orange-500" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-orange-500" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-orange-500" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-orange-500" />
            </div>

            {/* Quality Badge */}
            <div className="absolute -bottom-6 -right-6 bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <p className="font-display text-2xl">6.5oz</p>
              <p className="text-xs font-mono text-gray-500">HEAVYWEIGHT</p>
            </div>
          </div>
        </div>
      </div>

      {/* Side Accent */}
      <div className="absolute left-0 top-0 bottom-0 w-2 bg-orange-500" />
    </section>
  );
}
