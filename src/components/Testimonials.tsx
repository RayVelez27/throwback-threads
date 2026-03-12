"use client";

import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    text: "2 years. 100+ washes. Still perfect. That's what quality means. Real talk, real results.",
    author: "Mike R.",
    location: "Boston, MA",
    rating: 5,
    product: "NO BS TEE",
  },
  {
    id: 2,
    text: "Finally a brand that backs up their claims. The weight of this cotton is insane. Worth every penny.",
    author: "Sarah T.",
    location: "Brooklyn, NY",
    rating: 5,
    product: "HEAVYWEIGHT HOODIE",
  },
  {
    id: 3,
    text: "I was skeptical about the price. Then I felt the fabric. Then I wore it for 6 months. No regrets.",
    author: "James K.",
    location: "Chicago, IL",
    rating: 5,
    product: "FAFO TEE",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-[#f5f3f0]">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-orange-500 text-sm font-bold tracking-widest mb-4">REAL ONES ONLY</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4">
            WHAT THEY'RE SAYING
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            We don't pay for reviews. These are real customers who put our quality to the test.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white border-2 border-black p-8 relative hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 -left-2 bg-orange-500 w-10 h-10 flex items-center justify-center">
                <Quote className="w-5 h-5 text-white" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4 mt-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-orange-500 text-orange-500" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-lg font-medium leading-relaxed mb-6">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="border-t-2 border-black pt-4">
                <p className="font-bold">{testimonial.author}</p>
                <p className="text-sm text-gray-500">{testimonial.location}</p>
                <p className="text-xs font-mono text-orange-500 mt-2">{testimonial.product}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-white border-2 border-black p-6">
            <p className="font-display text-4xl">2,500+</p>
            <p className="text-xs font-mono text-gray-500 mt-1">HAPPY CUSTOMERS</p>
          </div>
          <div className="bg-white border-2 border-black p-6">
            <p className="font-display text-4xl">4.9</p>
            <p className="text-xs font-mono text-gray-500 mt-1">AVERAGE RATING</p>
          </div>
          <div className="bg-white border-2 border-black p-6">
            <p className="font-display text-4xl">0.5%</p>
            <p className="text-xs font-mono text-gray-500 mt-1">RETURN RATE</p>
          </div>
          <div className="bg-white border-2 border-black p-6">
            <p className="font-display text-4xl">100%</p>
            <p className="text-xs font-mono text-gray-500 mt-1">SATISFACTION</p>
          </div>
        </div>
      </div>
    </section>
  );
}
