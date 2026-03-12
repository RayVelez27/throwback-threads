"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Check, Heart, MapPin, Shield, Users, Zap } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AnimatedRopeLogo } from "@/components/RopeLogo";

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] w-full overflow-hidden bg-[#141414]">
        <div className="absolute inset-0 bg-grain pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />

        <div className="relative container mx-auto px-6 py-20 flex flex-col justify-center min-h-[60vh]">
          <div className={`inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 mb-8 w-fit transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Heart className="w-4 h-4" />
            <span className="text-xs font-bold tracking-widest">OUR STORY</span>
          </div>

          <h1 className={`font-display text-5xl md:text-7xl lg:text-[7rem] text-white leading-[0.9] mb-6 transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            BUILT ON
            <br />
            <span className="text-orange-500">HONESTY.</span>
            <br />
            BUILT TO LAST.
          </h1>

          <p className={`text-white/70 text-lg md:text-xl max-w-xl leading-relaxed transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Throwback Threads was born out of frustration — tired of overpriced,
            paper-thin tees that fall apart after a few washes. We decided to
            build something real.
          </p>
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-2 bg-orange-500" />

        <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden xl:block opacity-20 hover:opacity-40 transition-opacity duration-500">
          <AnimatedRopeLogo size="xl" variant="light" />
        </div>
      </section>

      {/* Origin Story */}
      <section className="border-b-2 border-black">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-black">
            <div className="py-16 lg:py-24 lg:pr-12">
              <span className="text-xs font-bold tracking-widest text-orange-500">WHERE IT ALL STARTED</span>
              <h2 className="font-display text-4xl md:text-5xl mt-4 mb-6">BOSTON ROOTS</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Started on the streets of Boston, Throwback Threads was founded with a
                simple belief: what you wear should be as real as you are. No gimmicks, no
                inflated prices, no cutting corners. Just premium heavyweight cotton, honest
                construction, and designs that say what everyone&apos;s thinking.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Every piece we make is a reflection of the grind — the early mornings, the
                late nights, the hustle that never stops. We build clothes for people who
                handle their business first and look good doing it.
              </p>
            </div>

            <div className="py-16 lg:py-24 lg:pl-12">
              <span className="text-xs font-bold tracking-widest text-orange-500">THE MISSION</span>
              <h2 className="font-display text-4xl md:text-5xl mt-4 mb-6">NO BS. EVER.</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                The fashion industry is full of it. Brands charging $60 for a tee that costs
                $3 to make. &quot;Limited drops&quot; that are anything but. Marketing that means
                nothing. We&apos;re not here for any of that.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We use premium 6.5oz heavyweight cotton because it&apos;s the best. We reinforce
                every seam because we want it to last. We price it fairly because we respect
                you. That&apos;s the Throwback Threads promise — what you see is what you get.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#141414] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
        <div className="absolute left-0 top-0 bottom-0 w-2 bg-orange-500" />

        <div className="relative container mx-auto px-6 py-20 lg:py-32">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 mb-6">
              <span className="text-xs font-bold tracking-widest">WHAT WE STAND FOR</span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl text-white">OUR VALUES</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "QUALITY FIRST",
                desc: "6.5oz heavyweight cotton, reinforced seams, preshrunk. Built to outlast everything else in your closet.",
              },
              {
                icon: Zap,
                title: "NO SHORTCUTS",
                desc: "Every stitch matters. We don't cut corners on materials, construction, or the details that count.",
              },
              {
                icon: Users,
                title: "COMMUNITY",
                desc: "We're not just a brand — we're a family. Built by the streets, for the streets. Real ones only.",
              },
              {
                icon: MapPin,
                title: "BOSTON BUILT",
                desc: "Proudly rooted in Boston. Our city's grit, determination, and realness run through every thread.",
              },
            ].map((value, i) => (
              <div
                key={i}
                className="border-2 border-white/10 p-8 hover:border-orange-500 transition-colors group"
              >
                <div className="w-12 h-12 bg-orange-500 flex items-center justify-center mb-6 group-hover:shadow-[4px_4px_0px_0px_rgba(249,115,22,0.3)] transition-shadow">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display text-xl text-white mb-3">{value.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Difference */}
      <section className="border-b-2 border-black">
        <div className="container mx-auto px-6 py-20 lg:py-32">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs font-bold tracking-widest text-orange-500">THE THROWBACK DIFFERENCE</span>
              <h2 className="font-display text-4xl md:text-5xl mt-4">WHAT SETS US APART</h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8">
              {[
                "Premium 6.5oz heavyweight cotton",
                "Reinforced double-stitched seams",
                "Preshrunk for true-to-size fit",
                "Colorfast dyes that don't fade",
                "1-year quality warranty",
                "100% satisfaction guarantee",
                "Honest, transparent pricing",
                "Built to last 5+ years",
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-4 py-3 border-b-2 border-black">
                  <div className="w-6 h-6 bg-orange-500 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-bold tracking-wider">{feature.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b-4 border-orange-500">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x-2 divide-black">
            {[
              { stat: "6.5oz", label: "HEAVYWEIGHT COTTON" },
              { stat: "5+", label: "YEARS LIFESPAN" },
              { stat: "100%", label: "SATISFACTION RATE" },
              { stat: "24HR", label: "QUOTE RESPONSE" },
            ].map((item, i) => (
              <div key={i} className="py-8 px-4 text-center">
                <p className="font-display text-3xl md:text-4xl">{item.stat}</p>
                <p className="text-xs text-gray-500 font-medium tracking-wider mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black">
        <div className="container mx-auto px-6 py-20 text-center">
          <h2 className="font-display text-4xl md:text-5xl text-white mb-4">
            READY TO SEE THE <span className="text-orange-500">DIFFERENCE</span>?
          </h2>
          <p className="text-white/60 max-w-lg mx-auto mb-8">
            Stop settling for clothes that don&apos;t last. Experience premium heavyweight
            quality at honest prices.
          </p>
          <Link
            href="/products"
            className="group inline-flex items-center gap-3 bg-orange-500 text-white px-8 py-4 text-sm font-bold tracking-widest hover:bg-orange-600 transition-all border-2 border-orange-500"
          >
            SHOP THE COLLECTION
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
