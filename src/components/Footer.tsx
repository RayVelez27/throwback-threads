"use client";

import { useState } from "react";
import Link from "next/link";
import { Instagram, Mail, ArrowRight, MapPin, Phone } from "lucide-react";
import { AnimatedRopeLogo } from "./RopeLogo";

const shopLinks = [
  { name: "All Products", href: "/shop" },
  { name: "Heavyweight Tees", href: "/tees" },
  { name: "Hoodies", href: "/hoodies" },
  { name: "New Drops", href: "/new-arrivals" },
  { name: "Sale", href: "/sale" },
];

const aboutLinks = [
  { name: "Our Story", href: "/about" },
  { name: "Quality Promise", href: "/quality" },
  { name: "FAFO", href: "/fafo" },
  { name: "Contact Us", href: "/contact" },
];

const supportLinks = [
  { name: "FAQ", href: "/faq" },
  { name: "Shipping Info", href: "/shipping" },
  { name: "Returns & Exchanges", href: "/returns" },
  { name: "Size Guide", href: "/size-guide" },
  { name: "Terms of Service", href: "/terms" },
  { name: "Privacy Policy", href: "/privacy" },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
    alert("Welcome to the No BS club!");
  };

  return (
    <footer className="bg-[#141414] text-white">
      {/* Top Section */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Brand Statement */}
            <div>
              <div className="mb-6">
                <AnimatedRopeLogo size="lg" variant="light" />
              </div>
              <p className="text-white/60 leading-relaxed max-w-md mb-6">
                What you wear after taking care of business. Premium heavyweight cotton, reinforced construction,
                honest pricing. Boston built, streets approved. Quality you can feel from day one.
              </p>
              <div className="flex items-center gap-4 text-white/40 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Boston, MA</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>support@throwbackthreads.com</span>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-white/5 border border-white/10 p-8">
              <h4 className="font-display text-2xl mb-2">JOIN THE NO BS CLUB</h4>
              <p className="text-white/60 text-sm mb-6">
                Get early access to drops, exclusive offers, and real talk about quality.
              </p>
              <form onSubmit={handleSubscribe} className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 bg-transparent border-2 border-white/30 text-white placeholder-white/40 py-4 px-4 text-sm focus:outline-none focus:border-orange-500"
                  required
                />
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-6 py-4 font-bold tracking-wider hover:bg-orange-600 transition flex items-center gap-2 border-2 border-orange-500"
                >
                  JOIN
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Links Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Shop */}
          <div>
            <h4 className="font-bold text-sm tracking-wider mb-6 text-orange-500">SHOP</h4>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-bold text-sm tracking-wider mb-6 text-orange-500">ABOUT</h4>
            <ul className="space-y-3">
              {aboutLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-sm tracking-wider mb-6 text-orange-500">SUPPORT</h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Quality */}
          <div>
            <h4 className="font-bold text-sm tracking-wider mb-6 text-orange-500">CONNECT</h4>
            <div className="flex gap-3 mb-8">
              <a
                href="https://instagram.com/throwbackthreads"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/30 flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 transition"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="mailto:support@throwbackthreads.com"
                className="w-10 h-10 border border-white/30 flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 transition"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>

            {/* Quality Badge */}
            <div className="border border-white/20 p-4">
              <p className="font-display text-xl mb-1">6.5OZ</p>
              <p className="text-xs text-white/50 font-mono">HEAVYWEIGHT COTTON</p>
              <p className="text-xs text-white/50 font-mono mt-1">1-YEAR WARRANTY</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/40">
              © 2024 Throwback Threads. All Rights Reserved. Boston Built.
            </p>
            <p className="text-xs text-white/40 font-mono">
              NO BS • REAL QUALITY • HONEST PRICING
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
