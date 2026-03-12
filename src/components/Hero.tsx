"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Shield, Zap, Star } from "lucide-react";
import { AnimatedRopeLogo } from "./RopeLogo";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden bg-[#141414]">
      {/* Grain Overlay */}
      <div className="absolute inset-0 bg-grain pointer-events-none" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      {/* Content */}
      <div className="relative container mx-auto px-6 py-20 flex flex-col justify-center min-h-[90vh]">
        {/* Badge */}
        <div className={`inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 mb-8 w-fit transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <Zap className="w-4 h-4" />
          <span className="text-xs font-bold tracking-widest">BOSTON BUILT • STREETS APPROVED</span>
        </div>

        {/* Main Headline */}
        <h1 className={`font-display text-5xl md:text-7xl lg:text-[8rem] text-white leading-[0.9] mb-6 transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          WE DON'T
          <br />
          <span className="text-orange-500">BULLSHIT</span>
          <br />
          OUR CLOTHES
        </h1>

        {/* Subheadline */}
        <p className={`text-white/70 text-lg md:text-xl max-w-xl mb-10 leading-relaxed transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          Premium heavyweight 6.5oz cotton. Reinforced construction.
          Honest pricing. Quality you can feel from day one.
        </p>

        {/* CTAs */}
        <div className={`flex flex-col sm:flex-row gap-4 mb-16 transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <Link
            href="/shop"
            className="group bg-orange-500 text-white px-8 py-4 text-sm font-bold tracking-widest hover:bg-orange-600 transition-all flex items-center justify-center gap-3 border-2 border-orange-500"
          >
            SHOP THE COLLECTION
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/quality"
            className="bg-transparent text-white px-8 py-4 text-sm font-bold tracking-widest hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3 border-2 border-white"
          >
            SEE THE DIFFERENCE
          </Link>
        </div>

        {/* Trust Badges */}
        <div className={`flex flex-wrap gap-8 transition-all duration-700 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-center gap-3 text-white/60">
            <Shield className="w-5 h-5 text-orange-500" />
            <span className="text-sm font-medium">1-YEAR QUALITY WARRANTY</span>
          </div>
          <div className="flex items-center gap-3 text-white/60">
            <Star className="w-5 h-5 text-orange-500" />
            <span className="text-sm font-medium">100% SATISFACTION GUARANTEE</span>
          </div>
          <div className="flex items-center gap-3 text-white/60">
            <Zap className="w-5 h-5 text-orange-500" />
            <span className="text-sm font-medium">BUILT TO LAST 5+ YEARS</span>
          </div>
        </div>
      </div>

      {/* Side Accent */}
      <div className="absolute right-0 top-0 bottom-0 w-2 bg-orange-500" />

      {/* Animated Rope Logo - Desktop */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden xl:block opacity-20 hover:opacity-40 transition-opacity duration-500">
        <AnimatedRopeLogo size="xl" variant="light" />
      </div>

      {/* Bottom Stats Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t-4 border-orange-500">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x-2 divide-black">
            <div className="py-6 px-4 text-center">
              <p className="font-display text-3xl md:text-4xl">6.5oz</p>
              <p className="text-xs text-gray-500 font-medium tracking-wider mt-1">HEAVYWEIGHT COTTON</p>
            </div>
            <div className="py-6 px-4 text-center">
              <p className="font-display text-3xl md:text-4xl">5+</p>
              <p className="text-xs text-gray-500 font-medium tracking-wider mt-1">YEARS LIFESPAN</p>
            </div>
            <div className="py-6 px-4 text-center hidden md:block">
              <p className="font-display text-3xl md:text-4xl">100%</p>
              <p className="text-xs text-gray-500 font-medium tracking-wider mt-1">SATISFACTION</p>
            </div>
            <div className="py-6 px-4 text-center hidden md:block">
              <p className="font-display text-3xl md:text-4xl">100%</p>
              <p className="text-xs text-gray-500 font-medium tracking-wider mt-1">BUSINESS READY</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
