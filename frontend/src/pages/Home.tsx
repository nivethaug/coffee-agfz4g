import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Flame, Leaf, Star } from "lucide-react";
import { PRODUCTS } from "@/features/catalog";
import { useCart } from "@/features/CartContext";

const HERO_IMG = "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1800&q=80";
const STORY_IMG = "https://images.unsplash.com/photo-1521302200778-33500795e128?auto=format&fit=crop&w=1200&q=80";
const ROAST_IMG = "https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=1200&q=80";
const BARISTA_IMG = "https://images.unsplash.com/photo-1524350876685-274059332603?auto=format&fit=crop&w=1200&q=80";

const Home = () => {
  const { add } = useCart();
  const [loading, setLoading] = useState(true);
  const [addedId, setAddedId] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const featured = PRODUCTS.slice(0, 3);

  const quickAdd = (id: string) => {
    add(id);
    setAddedId(id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <div className="min-h-full">
      {/* Cinematic hero */}
      <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden">
        <img
          src={HERO_IMG}
          alt="A cup of espresso with rich golden crema on a dark wooden table"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#16100c]/70 via-[#16100c]/55 to-[#16100c]" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 py-24 text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.5em] text-amber-400">
            Single-Origin · Small-Batch · Atelier Roasted
          </p>
          <h1 className="mb-6 font-serif text-5xl leading-tight text-stone-50 md:text-7xl">
            Coffee, <span className="italic text-amber-300">Photographed</span> in Every Sip
          </h1>
          <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-stone-300 md:text-lg">
            Rare lots from the world's finest terroirs, roasted in 5kg batches and sealed at
            peak freshness. This is specialty coffee as an object of desire.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/catalog"
              className="group flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 px-8 font-medium text-[#16100c] transition-all duration-300 hover:shadow-xl hover:shadow-amber-900/40"
            >
              <span className="flex items-center gap-2">
                Explore the Catalog
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
            <Link
              to="/product/black-gold"
              className="flex h-12 items-center rounded-full border border-amber-200/30 px-8 text-amber-100 backdrop-blur-sm transition-all duration-300 hover:border-amber-300/60 hover:bg-white/5"
            >
              <span>Meet Black Gold Reserve</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.4em] text-amber-500">The Selection</p>
            <h2 className="font-serif text-3xl text-stone-100 md:text-4xl">This Season's Coveted Lots</h2>
          </div>
          <Link to="/catalog" className="hidden items-center gap-1 text-sm text-amber-300 hover:text-amber-200 md:flex">
            <span>View all coffee</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-3" aria-live="polite">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-96 animate-pulse rounded-2xl bg-white/5" />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {featured.map((p) => (
              <article
                key={p.id}
                className="group overflow-hidden rounded-2xl border border-amber-900/30 bg-[#1d1610] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50"
              >
                <Link to={`/product/${p.id}`} className="block overflow-hidden">
                  <img
                    src={p.image}
                    alt={`${p.name} coffee packaging`}
                    className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </Link>
                <div className="p-6">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-widest text-amber-500">{p.origin}</span>
                    <span className="flex items-center gap-1 text-xs text-amber-300">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" aria-hidden="true" />
                      {p.rating.toFixed(1)}
                    </span>
                  </div>
                  <h3 className="mb-2 font-serif text-xl text-stone-100">{p.name}</h3>
                  <p className="mb-4 text-sm text-stone-400">{p.notes.join(" · ")}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg text-amber-200">${p.price}</span>
                    <button
                      onClick={() => quickAdd(p.id)}
                      className="flex h-10 items-center rounded-full bg-amber-500/15 px-5 text-sm text-amber-200 transition-all duration-300 hover:bg-amber-500 hover:text-[#16100c]"
                    >
                      {addedId === p.id ? "Added ✓" : "Add to Bag"}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Editorial story sections */}
      <section className="border-t border-amber-900/30 bg-[#120d09]">
        <div className="mx-auto grid max-w-7xl gap-0 md:grid-cols-2">
          <div className="relative min-h-[340px] overflow-hidden">
            <img src={STORY_IMG} alt="Barista pouring a latte with delicate rosetta foam art" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
          </div>
          <div className="flex flex-col justify-center p-10 md:p-16">
            <Leaf className="mb-4 h-8 w-8 text-amber-500" aria-hidden="true" />
            <h3 className="mb-4 font-serif text-3xl text-stone-100">Origin</h3>
            <p className="leading-relaxed text-stone-400">
              We travel to the washing stations of Yirgacheffe and the volcanic slopes of
              Antigua, tasting hundreds of lots to select the few worthy of the Noir Roast
              mark. Every farm is paid above fair-trade premiums — craftsmanship begins at
              the cherry.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-7xl border-t border-amber-900/30 md:grid-cols-2">
          <div className="order-2 flex flex-col justify-center p-10 md:order-1 md:p-16">
            <Flame className="mb-4 h-8 w-8 text-amber-500" aria-hidden="true" />
            <h3 className="mb-4 font-serif text-3xl text-stone-100">The Roast</h3>
            <p className="leading-relaxed text-stone-400">
              Our vintage drum roaster curves each batch through nine precise stages,
              developed by a roastmaster with fifteen years at the cupping table. We roast
              to order — nothing sits on a shelf longer than it takes the crema to settle.
            </p>
          </div>
          <div className="relative order-1 min-h-[340px] overflow-hidden md:order-2">
            <img src={ROAST_IMG} alt="Freshly roasted coffee beans cooling in a drum roaster" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
          </div>
        </div>
        <div className="mx-auto grid max-w-7xl border-t border-amber-900/30 md:grid-cols-2">
          <div className="relative min-h-[340px] overflow-hidden">
            <img src={BARISTA_IMG} alt="Espresso shot with thick crema being pulled in a specialty café" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
          </div>
          <div className="flex flex-col justify-center p-10 md:p-16">
            <Star className="mb-4 h-8 w-8 text-amber-500" aria-hidden="true" />
            <h3 className="mb-4 font-serif text-3xl text-stone-100">Craftsmanship</h3>
            <p className="leading-relaxed text-stone-400">
              From the tamp to the thirty-second pour, every element is rehearsed like
              ritual. Our atelier in Copenhagen trains baristas who treat a 20g double shot
              the way a jeweler treats a stone — with patience, precision, and reverence.
            </p>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-gradient-to-r from-amber-900/40 via-[#1d1610] to-amber-900/40 px-4 py-16 text-center md:px-8">
        <h3 className="mb-3 font-serif text-3xl text-stone-100">Begin Your Ritual</h3>
        <p className="mx-auto mb-8 max-w-md text-sm text-stone-400">
          Complimentary shipping on orders over $50. Roasted and shipped within 24 hours.
        </p>
        <Link
          to="/catalog"
          className="inline-flex h-12 items-center rounded-full bg-gradient-to-r from-amber-600 to-amber-500 px-10 font-medium text-[#16100c] transition-all duration-300 hover:shadow-xl hover:shadow-amber-900/40"
        >
          <span>Shop All Coffees</span>
        </Link>
      </section>
    </div>
  );
};

export default Home;
