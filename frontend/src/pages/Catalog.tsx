import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingBag, SlidersHorizontal, Star } from "lucide-react";
import { PRODUCTS, ROASTS, type Product } from "@/features/catalog";
import { useCart } from "@/features/CartContext";

const Catalog = () => {
  const { add } = useCart();
  const [query, setQuery] = useState("");
  const [roast, setRoast] = useState("All");
  const [sort, setSort] = useState<"featured" | "price-asc" | "price-desc">("featured");
  const [loading, setLoading] = useState(true);
  const [addedId, setAddedId] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo<Product[]>(() => {
    let list = PRODUCTS.filter(
      (p) =>
        (roast === "All" || p.roast === roast) &&
        (query.trim() === "" ||
          `${p.name} ${p.origin} ${p.notes.join(" ")}`
            .toLowerCase()
            .includes(query.toLowerCase()))
    );
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [query, roast, sort]);

  const quickAdd = (id: string) => {
    add(id);
    setAddedId(id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <header className="mb-10 text-center">
        <p className="mb-2 text-xs uppercase tracking-[0.4em] text-amber-500">The Collection</p>
        <h1 className="font-serif text-4xl text-stone-100 md:text-5xl">Curated Premium Coffee</h1>
        <p className="mx-auto mt-4 max-w-lg text-sm text-stone-400">
          Six signature lots, each scored 86+ at cupping. Whole bean, roasted to order.
        </p>
      </header>

      {/* Filters */}
      <div className="mb-10 flex flex-col gap-4 rounded-2xl border border-amber-900/30 bg-[#1d1610] p-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" aria-hidden="true" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search coffee, origin, or tasting notes…"
            aria-label="Search coffees"
            className="h-12 w-full rounded-xl border border-amber-900/40 bg-[#16100c] pl-11 pr-4 text-sm text-stone-200 placeholder:text-stone-600 focus:border-amber-500/60 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-3 overflow-x-auto pb-1 md:pb-0" role="group" aria-label="Filter by roast level">
          <SlidersHorizontal className="h-4 w-4 shrink-0 text-amber-500" aria-hidden="true" />
          {ROASTS.map((r) => (
            <button
              key={r}
              onClick={() => setRoast(r)}
              className={`h-10 shrink-0 rounded-full px-4 text-xs transition-all duration-300 ${
                roast === r
                  ? "bg-amber-500 font-medium text-[#16100c]"
                  : "border border-amber-900/40 text-stone-300 hover:border-amber-500/50 hover:text-amber-200"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as typeof sort)}
          aria-label="Sort products"
          className="h-12 rounded-xl border border-amber-900/40 bg-[#16100c] px-4 text-sm text-stone-200 focus:border-amber-500/60 focus:outline-none"
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-96 animate-pulse rounded-2xl bg-white/5" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-amber-900/30 bg-[#1d1610] p-16 text-center" role="status">
          <p className="mb-2 text-lg text-stone-200">No coffees match your search</p>
          <p className="text-sm text-stone-500">Try a different note, origin, or roast level.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
          {filtered.map((p) => (
            <article
              key={p.id}
              className="group overflow-hidden rounded-2xl border border-amber-900/30 bg-[#1d1610] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50"
            >
              <Link to={`/product/${p.id}`} className="relative block overflow-hidden">
                <img
                  src={p.image}
                  alt={`${p.name} — ${p.origin} coffee`}
                  className="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {p.badge && (
                  <span className="absolute left-4 top-4 rounded-full bg-[#16100c]/80 px-3 py-1 text-[10px] uppercase tracking-widest text-amber-300 backdrop-blur-sm">
                    {p.badge}
                  </span>
                )}
              </Link>
              <div className="p-6">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-amber-500">{p.origin}</span>
                  <span className="flex items-center gap-1 text-xs text-amber-300">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" aria-hidden="true" />
                    {p.rating.toFixed(1)}
                  </span>
                </div>
                <h2 className="mb-1 font-serif text-xl text-stone-100">{p.name}</h2>
                <p className="mb-1 text-xs text-stone-500">{p.roast} Roast</p>
                <p className="mb-4 text-sm text-stone-400">{p.notes.join(" · ")}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg text-amber-200">${p.price} <span className="text-xs text-stone-500">/ 250g</span></span>
                  <button
                    onClick={() => quickAdd(p.id)}
                    className="flex h-10 items-center gap-2 rounded-full bg-amber-500/15 px-5 text-sm text-amber-200 transition-all duration-300 hover:bg-amber-500 hover:text-[#16100c]"
                  >
                    <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                    {addedId === p.id ? "Added" : "Add"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Catalog;
