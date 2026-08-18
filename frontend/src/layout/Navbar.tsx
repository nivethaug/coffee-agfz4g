import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Coffee, Menu, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/features/CartContext";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/catalog", label: "Catalog" },
  { to: "/product/black-gold", label: "Product Detail" },
  { to: "/checkout", label: "Checkout" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-amber-900/30 bg-[#16100c]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2 text-amber-100">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-amber-800 shadow-lg shadow-amber-900/50">
            <Coffee className="h-5 w-5 text-[#16100c]" aria-hidden="true" />
          </span>
          <span className="font-serif text-xl tracking-wide">
            NOIR <span className="text-amber-500">ROAST</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `flex h-11 items-center rounded-full px-4 text-sm tracking-wide transition-all duration-300 ${
                  isActive
                    ? "bg-amber-500/15 text-amber-300"
                    : "text-stone-300 hover:bg-white/5 hover:text-amber-100"
                }`
              }
            >
              <span>{l.label}</span>
            </NavLink>
          ))}
          <Link
            to="/checkout"
            className="relative ml-3 flex h-11 items-center gap-2 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 px-5 text-sm font-medium text-[#16100c] transition-all duration-300 hover:shadow-lg hover:shadow-amber-900/50"
          >
            <span className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" aria-hidden="true" />
              Cart
              <span className="rounded-full bg-[#16100c]/25 px-2 py-0.5 text-xs" aria-live="polite">
                {count}
              </span>
            </span>
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <Link
            to="/checkout"
            className="relative flex h-11 w-11 items-center justify-center rounded-full text-amber-200"
            aria-label={`Cart with ${count} items`}
          >
            <ShoppingBag className="h-5 w-5" aria-hidden="true" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-[#16100c]">
                {count}
              </span>
            )}
          </Link>
          <button
            className="flex h-11 w-11 items-center justify-center rounded-full text-amber-100 hover:bg-white/5"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-amber-900/30 transition-all duration-300 md:hidden ${
          open ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col px-4 py-3" aria-label="Mobile navigation">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex h-12 items-center rounded-lg px-4 text-sm transition-colors ${
                  isActive ? "bg-amber-500/15 text-amber-300" : "text-stone-300 hover:bg-white/5"
                }`
              }
            >
              <span>{l.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
