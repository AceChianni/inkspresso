// /src/data/products.js
const products = [
  {
    id: "latte-golden-cardamom",
    name: "Golden Honey & Cardamom Latte",
    category: "Cafe Drinks",
    image: "/menu/golden-latte.jpg",
    shortDescription:
      "Sun-warmed turmeric with cardamom and raw honey for a gently spiced, silky latte.",
    sizes: [
      { size: "8oz", price: 4.75 },
      { size: "12oz", price: 5.75 },
      { size: "16oz", price: 6.50 },
    ],
  },
  {
    id: "latte-lavender-chai",
    name: "Lavender Maple Chai",
    category: "Cafe Drinks",
    image: "/menu/lavender-chai.jpg",
    shortDescription:
      "Fragrant lavender folded into a cozy chai, rounded with maple for floral-sweet comfort.",
    sizes: [
      { size: "8oz", price: 4.95 },
      { size: "12oz", price: 5.95 },
      { size: "16oz", price: 6.75 },
    ],
  },
  {
    id: "latte-rose-vanilla",
    name: "Rose Vanilla Latte",
    category: "Cafe Drinks",
    image: "/menu/rose-vanilla.jpg",
    shortDescription:
      "Velvety vanilla kissed with rose—soft, aromatic, and quietly indulgent.",
    sizes: [
      { size: "8oz", price: 5.25 },
      { size: "12oz", price: 6.25 },
      { size: "16oz", price: 7.00 },
    ],
  },
  {
    id: "blend-blush",
    name: "Blush — Heart Opening Tea Blend",
    category: "Herbal Blends",
    image: "/menu/blush.jpg",
    shortDescription:
      "A tender bouquet of petals and herbs to invite warmth, softness, and gentle openness.",
    sizes: [
      { size: "1oz", price: 7 },
      { size: "3oz", price: 18 },
      { size: "8oz", price: 40 },
    ],
  },
  {
    id: "blend-soothe",
    name: "Soothe — Nervous System Blend",
    category: "Herbal Blends",
    image: "/menu/soothe.jpg",
    shortDescription:
      "Calming botanicals crafted to settle the mind and unwind the body after long days.",
    sizes: [
      { size: "1oz", price: 6 },
      { size: "3oz", price: 14 },
      { size: "8oz", price: 32 },
    ],
  },
  {
    id: "smoke-open",
    name: "Open — Sensual Smoke Blend",
    category: "Smoke Blends",
    image: "/menu/open.jpg",
    shortDescription:
      "A smooth, aromatic smoke to relax the senses and invite slow, sensual presence.",
    sizes: [
      { size: "7g", price: 12 },
      { size: "14g", price: 22 },
      { size: "28g", price: 36 },
    ],
  },
];

export default products;
