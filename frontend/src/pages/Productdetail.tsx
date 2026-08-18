import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Minus, Plus, ShoppingBag, Star, Truck, ShieldCheck } from "lucide-react";
import { PRODUCTS } from "@/features/catalog";
import { useCart } from "@/features/CartContext";

const Productdetail = () => {
  const { id } = useParams<{ id: string }>();
  const { add } = useCart();
  const product = PRODUCTS.find((p) => p.id === id);

  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    setActiveImg(0);
    setQty(1);
    setAdded(false);
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8" aria-live="polite">
        <div className="grid h-[500px] animate-pulse gap-10 rounded-2xl bg-white/5 md:grid-cols-2" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="mb-3 font-serif text-3xl text-stone-100">Coffee Not Found</h1>
        <p className="mb-8 text-sm text-stone-400">This lot has sold out or the link is incorrect.</p>
        <Link
          to="/catalog"
          className="inline-flex h-12 items-center rounded-full bg-amber-500 px-8 font-medium text-[#16100c] transition-all duration-300 hover:shadow-xl"
        >
          <span>Back to Catalog</span>
        </Link>
      </div>
    );
  }

  const handleAdd = () => {
    add(product.id, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
      <Link to="/catalog" className="mb-8 inline-flex items-center gap-2 text-sm text-stone-400 transition-colors hover:text-amber-300">
        <span className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to catalog
        </span>
      </Link>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Gallery */}
        <div>
          <div className="overflow-hidden rounded-2xl border border-amber-900/30">
            <img
              src={product.gallery[activeImg]}
              alt={`${product.name} — view ${activeImg + 1}`}
              className="h-[420px] w-full object-cover transition-opacity duration-300 md:h-[520px]"
            />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3" role="group" aria-label="Product photo gallery">
            {product.gallery.map((g, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                aria-label={`View photo ${i + 1} of ${product.name}`}
                className={`overflow-hidden rounded-xl border transition-all duration-300 ${
                  activeImg === i ? "border-amber-500 ring-2 ring-amber-500/40" : "border-amber-900/30 opacity-70 hover:opacity-100"
                }`}
              >
                <img src={g} alt="" className="h-24 w-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          {product.badge && (
            <span className="mb-3 inline-flex w-fit rounded-full bg-amber-500/15 px-3 py-1 text-[10px] uppercase tracking-widest text-amber-300">
              {product.badge}
            </span>
          )}
          <p className="mb-2 text-xs uppercase tracking-[0.4em] text-amber-500">{product.origin}</p>
          <h1 className="mb-3 font-serif text-4xl text-stone-100 md:text-5xl">{product.name}</h1>
          <div className="mb-6 flex items-center gap-3">
            <span className="flex items-center gap-1 text-amber-300">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "text-stone-700"}`}
                  aria-hidden="true"
                />
              ))}
            </span>
            <span className="text-sm text-stone-400">{product.rating.toFixed(1)} · 240+ reviews</span>
          </div>
          <p className="mb-6 leading-relaxed text-stone-400">{product.description}</p>

          <div className="mb-6 flex flex-wrap gap-2">
            {product.notes.map((n) => (
              <span key={n} className="rounded-full border border-amber-900/40 px-4 py-1.5 text-xs text-amber-200">
                {n}
              </span>
            ))}
          </div>

          <div className="mb-6 grid grid-cols-2 gap-3 text-xs text-stone-400">
            <div className="flex items-center gap-2 rounded-xl border border-amber-900/30 bg-[#1d1610] p-3">
              <Truck className="h-4 w-4 text-amber-500" aria-hidden="true" /> Roasted & shipped in 24h
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-amber-900/30 bg-[#1d1610] p-3">
              <ShieldCheck className="h-4 w-4 text-amber-500" aria-hidden="true" /> Freshness guarantee
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex h-12 items-center rounded-full border border-amber-900/40">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="flex h-12 w-12 items-center justify-center text-stone-300 transition-colors hover:text-amber-300"
              >
                <Minus className="h-4 w-4" aria-hidden="true" />
              </button>
              <span className="w-10 text-center text-sm" aria-live="polite">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(12, q + 1))}
                aria-label="Increase quantity"
                className="flex h-12 w-12 items-center justify-center text-stone-300 transition-colors hover:text-amber-300"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <button
              onClick={handleAdd}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 px-8 font-medium text-[#16100c] transition-all duration-300 hover:shadow-xl hover:shadow-amber-900/40 sm:flex-none"
            >
              <span className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                {added ? "Added to Bag ✓" : `Add to Bag — $${(product.price * qty).toFixed(0)}`}
              </span>
            </button>
          </div>
          <p className="mt-4 text-xs text-stone-500">250g whole bean · Free shipping over $50</p>
        </div>
      </div>
    </div>
  );
};

export default Productdetail;
