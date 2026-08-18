import { useState } from "react";
import { Link } from "react-router-dom";
import { CreditCard, Lock, Minus, Plus, ShoppingBag, Trash2, CheckCircle2 } from "lucide-react";
import { useCart } from "@/features/CartContext";

const Checkout = () => {
  const { items, total, count, setQty, remove, clear } = useCart();
  const [placing, setPlacing] = useState(false);
  const [orderNo, setOrderNo] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", address: "", city: "", zip: "", card: "" });
  const [error, setError] = useState("");

  const shipping = total >= 50 || total === 0 ? 0 : 6;
  const grand = total + shipping;

  const handlePlace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.address || !form.city || !form.zip || form.card.replace(/\s/g, "").length < 12) {
      setError("Please complete every field with a valid card number.");
      return;
    }
    setError("");
    setPlacing(true);
    setTimeout(() => {
      setPlacing(false);
      setOrderNo(`NR-${Math.floor(100000 + Math.random() * 900000)}`);
      clear();
    }, 1400);
  };

  if (orderNo) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center" role="status" aria-live="polite">
        <CheckCircle2 className="mx-auto mb-6 h-16 w-16 text-amber-400" aria-hidden="true" />
        <h1 className="mb-3 font-serif text-4xl text-stone-100">Order Confirmed</h1>
        <p className="mb-2 text-stone-400">Thank you, {form.name.split(" ")[0] || "friend"}. Your coffee will be roasted within hours.</p>
        <p className="mb-8 text-sm uppercase tracking-widest text-amber-400">Order {orderNo}</p>
        <Link
          to="/catalog"
          className="inline-flex h-12 items-center rounded-full bg-gradient-to-r from-amber-600 to-amber-500 px-8 font-medium text-[#16100c] transition-all duration-300 hover:shadow-xl"
        >
          <span>Continue Shopping</span>
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <ShoppingBag className="mx-auto mb-6 h-14 w-14 text-stone-600" aria-hidden="true" />
        <h1 className="mb-3 font-serif text-3xl text-stone-100">Your Bag Is Empty</h1>
        <p className="mb-8 text-sm text-stone-400">Discover a lot worth coveting.</p>
        <Link
          to="/catalog"
          className="inline-flex h-12 items-center rounded-full bg-amber-500 px-8 font-medium text-[#16100c] transition-all duration-300 hover:shadow-xl"
        >
          <span>Browse the Catalog</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <header className="mb-10">
        <p className="mb-2 text-xs uppercase tracking-[0.4em] text-amber-500">Secure Checkout</p>
        <h1 className="font-serif text-4xl text-stone-100">Complete Your Order</h1>
        <p className="mt-2 text-sm text-stone-400">{count} item{count > 1 ? "s" : ""} in your bag</p>
      </header>

      <div className="grid gap-10 lg:grid-cols-5">
        {/* Cart */}
        <section className="lg:col-span-2" aria-label="Cart items">
          <div className="space-y-4">
            {items.map(({ product, qty }) => (
              <div
                key={product.id}
                className="flex gap-4 rounded-2xl border border-amber-900/30 bg-[#1d1610] p-4 transition-all duration-300 hover:border-amber-800/50"
              >
                <img src={product.image} alt={product.name} className="h-24 w-24 shrink-0 rounded-xl object-cover" />
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h2 className="font-serif text-lg text-stone-100">{product.name}</h2>
                      <p className="text-xs text-stone-500">{product.origin} · {product.roast} Roast</p>
                    </div>
                    <button
                      onClick={() => remove(product.id)}
                      aria-label={`Remove ${product.name} from bag`}
                      className="text-stone-500 transition-colors hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-9 items-center rounded-full border border-amber-900/40">
                      <button
                        onClick={() => setQty(product.id, qty - 1)}
                        aria-label={`Decrease ${product.name} quantity`}
                        className="flex h-9 w-9 items-center justify-center text-stone-300 hover:text-amber-300"
                      >
                        <Minus className="h-3 w-3" aria-hidden="true" />
                      </button>
                      <span className="w-8 text-center text-sm" aria-live="polite">{qty}</span>
                      <button
                        onClick={() => setQty(product.id, qty + 1)}
                        aria-label={`Increase ${product.name} quantity`}
                        className="flex h-9 w-9 items-center justify-center text-stone-300 hover:text-amber-300"
                      >
                        <Plus className="h-3 w-3" aria-hidden="true" />
                      </button>
                    </div>
                    <span className="text-amber-200">${(product.price * qty).toFixed(0)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-amber-900/30 bg-[#1d1610] p-5 text-sm">
            <div className="mb-2 flex justify-between text-stone-400">
              <span>Subtotal</span><span>${total.toFixed(2)}</span>
            </div>
            <div className="mb-2 flex justify-between text-stone-400">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between border-t border-amber-900/30 pt-3 text-base text-amber-200">
              <span>Total</span><span>${grand.toFixed(2)}</span>
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="lg:col-span-3" aria-label="Shipping and payment details">
          <form onSubmit={handlePlace} className="rounded-2xl border border-amber-900/30 bg-[#1d1610] p-6 md:p-8" noValidate>
            <h2 className="mb-6 flex items-center gap-2 font-serif text-2xl text-stone-100">
              <CreditCard className="h-5 w-5 text-amber-500" aria-hidden="true" />
              Shipping & Payment
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              <input
                type="text" placeholder="Full name" aria-label="Full name" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="h-12 rounded-xl border border-amber-900/40 bg-[#16100c] px-4 text-sm text-stone-200 placeholder:text-stone-600 focus:border-amber-500/60 focus:outline-none"
              />
              <input
                type="email" placeholder="Email address" aria-label="Email address" value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="h-12 rounded-xl border border-amber-900/40 bg-[#16100c] px-4 text-sm text-stone-200 placeholder:text-stone-600 focus:border-amber-500/60 focus:outline-none"
              />
              <input
                type="text" placeholder="Street address" aria-label="Street address" value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="h-12 rounded-xl border border-amber-900/40 bg-[#16100c] px-4 text-sm text-stone-200 placeholder:text-stone-600 focus:border-amber-500/60 focus:outline-none md:col-span-2"
              />
              <input
                type="text" placeholder="City" aria-label="City" value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="h-12 rounded-xl border border-amber-900/40 bg-[#16100c] px-4 text-sm text-stone-200 placeholder:text-stone-600 focus:border-amber-500/60 focus:outline-none"
              />
              <input
                type="text" placeholder="ZIP / Postal code" aria-label="ZIP code" value={form.zip}
                onChange={(e) => setForm({ ...form, zip: e.target.value })}
                className="h-12 rounded-xl border border-amber-900/40 bg-[#16100c] px-4 text-sm text-stone-200 placeholder:text-stone-600 focus:border-amber-500/60 focus:outline-none"
              />
              <input
                type="text" placeholder="Card number  ····  ····  ····  ····" aria-label="Card number" value={form.card}
                onChange={(e) => setForm({ ...form, card: e.target.value })}
                className="h-12 rounded-xl border border-amber-900/40 bg-[#16100c] px-4 text-sm text-stone-200 placeholder:text-stone-600 focus:border-amber-500/60 focus:outline-none md:col-span-2"
              />
            </div>

            {error && (
              <p className="mt-4 rounded-xl border border-red-900/40 bg-red-950/30 p-3 text-sm text-red-300" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={placing}
              className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 font-medium text-[#16100c] transition-all duration-300 hover:shadow-xl hover:shadow-amber-900/40 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="flex items-center gap-2">
                <Lock className="h-4 w-4" aria-hidden="true" />
                {placing ? "Placing Order…" : `Place Order — $${grand.toFixed(2)}`}
              </span>
            </button>
            <p className="mt-3 text-center text-xs text-stone-500">
              Demo checkout — no payment is processed. 256-bit SSL encrypted.
            </p>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Checkout;
