import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductCarousel from "@/components/ProductCarousel";
import CollectionBanner from "@/components/CollectionBanner";
import Testimonials from "@/components/Testimonials";
import InstagramFeed from "@/components/InstagramFeed";
import Footer from "@/components/Footer";
import { tees, hoodies, jackets, caps } from "@/lib/products";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />

      <ProductCarousel
        title="TEES & TOPS"
        subtitle="Premium cotton tees in every style. From heavyweight essentials to performance fabrics."
        products={tees}
        viewAllLink="/products"
      />

      <CollectionBanner />

      <ProductCarousel
        title="HEAVYWEIGHT HOODIES"
        subtitle="Built for years, not months. The weight you want, the quality you deserve."
        products={hoodies}
        viewAllLink="/products"
      />

      <ProductCarousel
        title="JACKETS & OUTERWEAR"
        subtitle="From lightweight windbreakers to insulated systems. Protection meets style."
        products={jackets}
        viewAllLink="/products"
      />

      <Testimonials />

      <ProductCarousel
        title="CAPS & HEADWEAR"
        subtitle="Trucker caps, rope caps, beanies. The finishing touch for any fit."
        products={caps}
        viewAllLink="/products"
      />

      <InstagramFeed />

      <Footer />
    </main>
  );
}
