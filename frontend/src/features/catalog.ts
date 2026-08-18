export interface Product {
  id: string;
  name: string;
  origin: string;
  roast: "Light" | "Medium" | "Medium-Dark" | "Dark";
  price: number;
  notes: string[];
  description: string;
  image: string;
  gallery: string[];
  badge?: string;
  rating: number;
}

export const PRODUCTS: Product[] = [
  {
    id: "black-gold",
    name: "Black Gold Reserve",
    origin: "Yirgacheffe, Ethiopia",
    roast: "Light",
    price: 28,
    notes: ["Jasmine", "Bergamot", "Honey"],
    description:
      "A single-origin microlot from 2,100m altitude washing stations. Delicate florals and a shimmering citrus acidity finish like chilled white wine. Roasted in 5kg batches for precision.",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1524350876685-274059332603?auto=format&fit=crop&w=900&q=80",
    ],
    badge: "Microlot",
    rating: 4.9,
  },
  {
    id: "midnight-harvest",
    name: "Midnight Harvest",
    origin: "Huila, Colombia",
    roast: "Medium-Dark",
    price: 22,
    notes: ["Dark Chocolate", "Cherry", "Cane Sugar"],
    description:
      "Sourced from family farms in the Huila highlands. A syrupy body wrapped in deep cacao and ripe red fruit, with a caramel-sweet finish that lingers long after the last sip.",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
    ],
    badge: "Best Seller",
    rating: 4.8,
  },
  {
    id: "velvet-crema",
    name: "Velvet Crema Blend",
    origin: "Brazil × Sumatra",
    roast: "Medium",
    price: 19,
    notes: ["Hazelnut", "Molasses", "Cream"],
    description:
      "Our signature espresso blend engineered for a dense, honey-gold crema. Brazilian sweetness meets Sumatran earthiness — flawless under milk, extraordinary on its own.",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1521302200778-33500795e128?auto=format&fit=crop&w=900&q=80",
    ],
    rating: 4.7,
  },
  {
    id: "obsidian-roast",
    name: "Obsidian Roast",
    origin: "Aceh, Sumatra",
    roast: "Dark",
    price: 24,
    notes: ["Cedar", "Black Pepper", "Tobacco"],
    description:
      "A bold, slow-roasted classic. Wet-hulled Sumatran beans deliver a heavy body, savory spice, and a smoky intensity built for those who take their coffee seriously.",
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=900&q=80",
    ],
    rating: 4.6,
  },
  {
    id: "golden-hour",
    name: "Golden Hour Decaf",
    origin: "Antigua, Guatemala",
    roast: "Medium",
    price: 21,
    notes: ["Toffee", "Orange Zest", "Silk"],
    description:
      "Sugarcane-processed decaf that sacrifices nothing. Bright stone-fruit acidity and a toffee roundness prove that evening coffee deserves the same reverence as the morning cup.",
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1610889556528-9a770e32642f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&w=900&q=80",
    ],
    badge: "Low Caffeine",
    rating: 4.5,
  },
  {
    id: "atelier-noir",
    name: "Atelier Noir",
    origin: "Nyeri, Kenya",
    roast: "Light",
    price: 32,
    notes: ["Blackcurrant", "Grapefruit", "Floral"],
    description:
      "A limited-release Kenya AA with electric acidity and an unmistakable blackcurrant signature. Only 200 numbered tins produced per harvest — once gone, gone forever.",
    image: "https://images.unsplash.com/photo-1524350876685-274059332603?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1524350876685-274059332603?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=900&q=80",
    ],
    badge: "Limited",
    rating: 5.0,
  },
];

export const ORIGINS = ["All", ...Array.from(new Set(PRODUCTS.map((p) => p.origin)))];
export const ROASTS = ["All", "Light", "Medium", "Medium-Dark", "Dark"];
