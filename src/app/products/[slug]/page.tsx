"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FileText, ArrowLeft, Minus, Plus, Truck, Shield, RotateCcw, Upload, X, Move, ZoomIn, Sparkles, Loader2, ArrowLeftRight, ArrowUpDown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useQuote } from "@/lib/quote-context";
import { allProducts, type Product } from "@/lib/products";

const sizes = ["S", "M", "L", "XL", "2XL"];

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = require("react").use(params);
  const product = allProducts.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}

function ProductDetail({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToQuote, setAddedToQuote] = useState(false);
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
      quantity,
      logoSrc,
    });
    setAddedToQuote(true);
    setTimeout(() => setAddedToQuote(false), 2000);
  };

  // Logo customizer state
  const [logoSrc, setLogoSrc] = useState<string | null>(null);
  const [logoSize, setLogoSize] = useState(25); // percentage of container width
  const [logoPos, setLogoPos] = useState({ x: 50, y: 40 }); // percentage position (center point)
  const [isDragging, setIsDragging] = useState(false);
  const [renderedImage, setRenderedImage] = useState<string | null>(null);
  const [isRendering, setIsRendering] = useState(false);
  const [renderError, setRenderError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setLogoSrc(ev.target?.result as string);
      setLogoPos({ x: 50, y: 40 });
      setLogoSize(25);
    };
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    setLogoSrc(null);
    setRenderedImage(null);
    setRenderError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const generateMockup = async () => {
    if (!logoSrc || !containerRef.current) return;
    setIsRendering(true);
    setRenderError(null);

    try {
      // Draw the product image + logo composite on a canvas
      const canvas = document.createElement("canvas");
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext("2d")!;

      // Load and draw the product image
      const productImg = await loadImage(product.image);
      ctx.drawImage(productImg, 0, 0, 1024, 1024);

      // Load and draw the logo at the user's chosen position/size
      const logoImg = await loadImage(logoSrc);
      const logoW = (logoSize / 100) * 1024;
      const logoH = (logoImg.height / logoImg.width) * logoW;
      const logoX = (logoPos.x / 100) * 1024 - logoW / 2;
      const logoY = (logoPos.y / 100) * 1024 - logoH / 2;
      ctx.drawImage(logoImg, logoX, logoY, logoW, logoH);

      const compositeDataUrl = canvas.toDataURL("image/png");

      const res = await fetch("/api/render-logo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productImage: compositeDataUrl,
          logo: logoSrc,
          productName: product.name,
          category: product.category,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate mockup");
      setRenderedImage(data.image);
    } catch (err) {
      setRenderError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsRendering(false);
    }
  };

  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };

  const getPointerPos = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return null;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    return { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) };
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const pos = getPointerPos(e.clientX, e.clientY);
    if (pos) setLogoPos(pos);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <main className="min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-8">
          <Link href="/" className="text-gray-500 hover:text-black transition">Home</Link>
          <span className="text-gray-300">/</span>
          <Link href="/products" className="text-gray-500 hover:text-black transition">Products</Link>
          <span className="text-gray-300">/</span>
          <span className="font-medium">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image + Logo Preview */}
          <div>
            <div
              ref={containerRef}
              className="relative aspect-square border-2 border-black overflow-hidden bg-gray-100 select-none"
            >
              {product.badge && (
                <div className="absolute top-0 left-0 z-10 bg-orange-500 text-white px-4 py-2 text-xs font-bold tracking-wider">
                  {product.badge}
                </div>
              )}
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />

              {/* Logo Overlay */}
              {logoSrc && (
                <div
                  className="absolute z-20 cursor-grab active:cursor-grabbing touch-none"
                  style={{
                    left: `${logoPos.x}%`,
                    top: `${logoPos.y}%`,
                    width: `${logoSize}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logoSrc}
                    alt="Your logo"
                    className="w-full h-auto pointer-events-none"
                    draggable={false}
                  />
                </div>
              )}

              {/* Customization mode indicator */}
              {logoSrc && (
                <div className="absolute bottom-0 left-0 right-0 z-20 bg-black/70 text-white text-center py-2 text-xs font-mono tracking-wider">
                  <Move className="w-3 h-3 inline mr-1" />
                  DRAG TO REPOSITION YOUR LOGO
                </div>
              )}
            </div>

            {/* AI Rendered Mockup */}
            {renderedImage && (
              <div className="mt-4 border-2 border-orange-500 p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-orange-500" />
                    AI-GENERATED MOCKUP
                  </span>
                  <button
                    type="button"
                    onClick={() => setRenderedImage(null)}
                    className="text-xs font-bold text-gray-500 hover:text-black transition"
                  >
                    DISMISS
                  </button>
                </div>
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={renderedImage}
                    alt="AI-rendered mockup"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-2 text-center">
                  Generated with AI — actual print may vary
                </p>
              </div>
            )}

            {/* Logo Upload Controls */}
            <div className="mt-4 border-2 border-black p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold tracking-wider">CUSTOMIZE WITH YOUR LOGO</span>
                {logoSrc && (
                  <button
                    type="button"
                    onClick={removeLogo}
                    className="text-xs font-bold text-red-500 hover:text-red-700 transition flex items-center gap-1"
                  >
                    <X className="w-3 h-3" />
                    REMOVE
                  </button>
                )}
              </div>

              {!logoSrc ? (
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 hover:border-orange-500 py-8 cursor-pointer transition group">
                  <Upload className="w-8 h-8 text-gray-400 group-hover:text-orange-500 transition mb-2" />
                  <span className="text-sm font-medium text-gray-500 group-hover:text-orange-500 transition">
                    Upload your logo
                  </span>
                  <span className="text-xs text-gray-400 mt-1">PNG, SVG, or JPG (transparent background works best)</span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/svg+xml,image/jpeg,image/webp"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </label>
              ) : (
                <div>
                  {/* Size slider */}
                  <div className="flex items-center gap-3">
                    <ZoomIn className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <label className="flex-1">
                      <span className="text-xs font-mono text-gray-500 block mb-1">LOGO SIZE</span>
                      <input
                        type="range"
                        min={8}
                        max={60}
                        value={logoSize}
                        onChange={(e) => setLogoSize(Number(e.target.value))}
                        className="w-full accent-orange-500"
                      />
                    </label>
                    <span className="text-xs font-mono text-gray-500 w-10 text-right">{logoSize}%</span>
                  </div>

                  {/* Horizontal position slider */}
                  <div className="flex items-center gap-3 mt-3">
                    <ArrowLeftRight className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <label className="flex-1">
                      <span className="text-xs font-mono text-gray-500 block mb-1">HORIZONTAL</span>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={logoPos.x}
                        onChange={(e) => setLogoPos((p) => ({ ...p, x: Number(e.target.value) }))}
                        className="w-full accent-orange-500"
                      />
                    </label>
                    <span className="text-xs font-mono text-gray-500 w-10 text-right">{Math.round(logoPos.x)}%</span>
                  </div>

                  {/* Vertical position slider */}
                  <div className="flex items-center gap-3 mt-3">
                    <ArrowUpDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <label className="flex-1">
                      <span className="text-xs font-mono text-gray-500 block mb-1">VERTICAL</span>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={logoPos.y}
                        onChange={(e) => setLogoPos((p) => ({ ...p, y: Number(e.target.value) }))}
                        className="w-full accent-orange-500"
                      />
                    </label>
                    <span className="text-xs font-mono text-gray-500 w-10 text-right">{Math.round(logoPos.y)}%</span>
                  </div>

                  {/* Generate Mockup button */}
                  <button
                    type="button"
                    onClick={generateMockup}
                    disabled={isRendering}
                    className="mt-3 w-full bg-black text-white py-3 text-xs font-bold tracking-wider flex items-center justify-center gap-2 hover:bg-orange-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isRendering ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        GENERATING REALISTIC MOCKUP...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        GENERATE REALISTIC MOCKUP
                      </>
                    )}
                  </button>

                  {renderError && (
                    <p className="mt-2 text-xs text-red-500 font-medium">{renderError}</p>
                  )}

                  {/* Change logo button */}
                  <label className="mt-3 inline-flex items-center gap-2 text-xs font-bold tracking-wider text-orange-500 hover:text-orange-600 cursor-pointer transition">
                    <Upload className="w-3 h-3" />
                    CHANGE LOGO
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/svg+xml,image/jpeg,image/webp"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <p className="text-xs font-mono text-orange-500 tracking-wider mb-2">{product.category?.toUpperCase()}</p>
            <h1 className="font-display text-4xl md:text-5xl mb-4">{product.name}</h1>
            <p className="font-display text-3xl mb-6">${product.price.toFixed(2)}</p>

            <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
            <p className="text-xs font-mono text-gray-400 mb-8">SKU: {product.code}</p>

            {/* Color Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <span className="text-sm font-bold tracking-wider block mb-3">
                  AVAILABLE COLORS ({product.colors.length})
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <div
                      key={color.id}
                      className="group relative"
                    >
                      <div
                        className="w-8 h-8 border-2 border-black cursor-pointer hover:scale-110 transition-transform"
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-[10px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        {color.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold tracking-wider">SELECT SIZE</span>
                <button type="button" className="text-xs text-orange-500 font-medium hover:underline">SIZE GUIDE</button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 text-sm font-bold border-2 transition ${
                      selectedSize === size
                        ? "bg-black text-white border-black"
                        : "border-black hover:bg-orange-500 hover:text-white hover:border-orange-500"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <span className="text-sm font-bold tracking-wider block mb-3">QUANTITY</span>
              <div className="flex items-center border-2 border-black w-fit">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 h-12 flex items-center justify-center font-bold border-x-2 border-black">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Add to Quote */}
            <button
              type="button"
              onClick={handleAddToQuote}
              disabled={!selectedSize}
              className={`w-full py-4 text-sm font-bold tracking-wider flex items-center justify-center gap-3 transition border-2 mb-4 ${
                !selectedSize
                  ? "bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed"
                  : addedToQuote
                    ? "bg-green-500 text-white border-green-500"
                    : "bg-orange-500 text-white border-orange-500 hover:bg-orange-600"
              }`}
            >
              <FileText className="w-5 h-5" />
              {!selectedSize
                ? "SELECT A SIZE"
                : addedToQuote
                  ? "ADDED TO QUOTE!"
                  : `ADD TO QUOTE — $${(product.price * quantity).toFixed(2)}`}
            </button>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t-2 border-black">
              <div className="text-center">
                <Truck className="w-6 h-6 mx-auto mb-2" />
                <p className="text-xs font-bold">FREE SHIPPING</p>
                <p className="text-[10px] text-gray-500">Over $75</p>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 mx-auto mb-2" />
                <p className="text-xs font-bold">1-YEAR WARRANTY</p>
                <p className="text-[10px] text-gray-500">Quality guaranteed</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-6 h-6 mx-auto mb-2" />
                <p className="text-xs font-bold">EASY RETURNS</p>
                <p className="text-[10px] text-gray-500">30-day policy</p>
              </div>
            </div>

            {/* Product Details */}
            <div className="mt-8 pt-8 border-t-2 border-black">
              <h3 className="text-sm font-bold tracking-wider mb-4">PRODUCT DETAILS</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-500 inline-block" />
                  Premium 6.5oz heavyweight cotton
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-500 inline-block" />
                  Reinforced double-stitched seams
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-500 inline-block" />
                  Preshrunk for true-to-size fit
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-500 inline-block" />
                  Machine wash cold, tumble dry low
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Back to Products */}
        <div className="mt-16 pt-8 border-t-2 border-black">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-bold tracking-wider hover:text-orange-500 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            BACK TO ALL PRODUCTS
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
