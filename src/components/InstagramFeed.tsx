"use client";

import { Instagram, ArrowRight } from "lucide-react";
import Link from "next/link";

const socialPosts = [
  { id: 1, text: "Heavyweight 6.5oz cotton. Reinforced stitching. Built to last years. What you wear after taking care of business.", tag: "#HandleBusiness" },
  { id: 2, text: "FAFO about our quality. Premium materials meet street attitude. That's the difference.", tag: "#FAFO" },
  { id: 3, text: "Other brands: Cheap materials, big talk. Us: Premium materials, real talk.", tag: "#ThrowbackThreads" },
  { id: 4, text: "2 years. 100+ washes. Still perfect. That's what quality means.", tag: "#RealResults" },
];

export default function InstagramFeed() {
  return (
    <section className="py-20 bg-white border-t-2 border-black">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-orange-500 text-sm font-bold tracking-widest mb-4">FOLLOW THE MOVEMENT</p>
            <h2 className="font-display text-4xl md:text-5xl">@THROWBACKTHREADS</h2>
          </div>
          <a
            href="https://instagram.com/throwbackthreads"
            target="_blank"
            rel="noopener noreferrer"
            className="group text-sm font-bold tracking-wider flex items-center gap-2 hover:text-orange-500 transition border-b-2 border-black hover:border-orange-500 pb-1"
          >
            FOLLOW US
            <Instagram className="w-4 h-4" />
          </a>
        </div>

        {/* Social Feed Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {socialPosts.map((post) => (
            <div
              key={post.id}
              className="bg-[#141414] text-white p-6 border-2 border-black hover:border-orange-500 transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-orange-500 flex items-center justify-center">
                  <span className="font-display text-sm">TT</span>
                </div>
                <div>
                  <p className="text-sm font-bold">throwbackthreads</p>
                  <p className="text-xs text-white/50">Boston, MA</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-4 group-hover:text-orange-500 transition">
                {post.text}
              </p>
              <p className="text-orange-500 text-sm font-bold">{post.tag}</p>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="bg-[#141414] border-2 border-black p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl md:text-3xl text-white mb-2">
              JOIN THE <span className="text-orange-500">NO BS</span> MOVEMENT
            </h3>
            <p className="text-white/60 text-sm">
              Tag us @throwbackthreads and show us how you wear quality.
            </p>
          </div>
          <Link
            href="/shop"
            className="group bg-orange-500 text-white px-8 py-4 text-sm font-bold tracking-widest hover:bg-orange-600 transition-all flex items-center gap-3 border-2 border-orange-500 flex-shrink-0"
          >
            SHOP NOW
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
