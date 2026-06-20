// Static fallback menu data — used when backend is unavailable
export const MENU_ITEMS = [
  // ─── Coffee ───────────────────────────────────────────────────
  {
    _id: 'local-01', name: 'Espresso', category: 'Coffee', price: 295,
    description: 'Rich, bold shot of pure coffee perfection.',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&q=80',
    available: true,
  },
  {
    _id: 'local-02', name: 'Cappuccino', category: 'Coffee', price: 380,
    description: 'Espresso topped with velvety steamed milk foam.',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&q=80',
    available: true,
  },
  {
    _id: 'local-03', name: 'Caramel Latte', category: 'Coffee', price: 440,
    description: 'Smooth espresso with creamy milk and caramel drizzle.',
    image: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=400&q=80',
    available: true,
  },
  {
    _id: 'local-04', name: 'Americano', category: 'Coffee', price: 315,
    description: 'Espresso diluted with hot water for a clean, milder taste.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&q=80',
    available: true,
  },
  {
    _id: 'local-05', name: 'Cold Brew', category: 'Coffee', price: 460,
    description: 'Slow-steeped cold coffee — smooth, dark, refreshing.',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80',
    available: true,
  },
  {
    _id: 'local-06', name: 'Mocha', category: 'Coffee', price: 440,
    description: 'Espresso meets chocolate in this indulgent classic.',
    image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=400&q=80',
    available: true,
  },

  // ─── Tea ──────────────────────────────────────────────────────
  {
    _id: 'local-07', name: 'Matcha Latte', category: 'Tea', price: 400,
    description: 'Ceremonial matcha whisked with silky oat milk.',
    image: 'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?w=400&q=80',
    available: true,
  },
  {
    _id: 'local-08', name: 'Chai Latte', category: 'Tea', price: 380,
    description: 'Spiced tea concentrate blended with steamed milk.',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80',
    available: true,
  },
  {
    _id: 'local-09', name: 'Earl Grey', category: 'Tea', price: 275,
    description: 'Classic bergamot-scented black tea, served with lemon.',
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=400&q=80',
    available: true,
  },
  {
    _id: 'local-10', name: 'Butterfly Pea Tea', category: 'Tea', price: 335,
    description: 'Magical blue tea that changes colour with citrus.',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=80',
    available: true,
  },

  // ─── Snacks ───────────────────────────────────────────────────
  {
    _id: 'local-11', name: 'Avocado Toast', category: 'Snacks', price: 715,
    description: 'Smashed avocado on sourdough with chili flakes & microgreens.',
    image: 'https://images.unsplash.com/photo-1603046891744-1f7a5e787616?w=400&q=80',
    available: true,
  },
  {
    _id: 'local-12', name: 'Butter Croissant', category: 'Snacks', price: 335,
    description: 'Flaky, golden French croissant, baked fresh daily.',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80',
    available: true,
  },
  {
    _id: 'local-13', name: 'Banana Bread', category: 'Snacks', price: 315,
    description: 'Moist homemade slice with walnuts and a hint of cinnamon.',
    image: 'https://images.unsplash.com/photo-1568471173242-461f0a730452?w=400&q=80',
    available: true,
  },
  {
    _id: 'local-14', name: 'Granola Bowl', category: 'Snacks', price: 590,
    description: 'House granola, Greek yoghurt, seasonal berries and honey.',
    image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400&q=80',
    available: true,
  },

  // ─── Desserts ─────────────────────────────────────────────────
  {
    _id: 'local-15', name: 'Chocolate Cake', category: 'Desserts', price: 545,
    description: 'Rich layered chocolate cake with dark ganache.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80',
    available: true,
  },
  {
    _id: 'local-16', name: 'Tiramisu', category: 'Desserts', price: 590,
    description: 'Classic Italian coffee-soaked dessert, dusted with cocoa.',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80',
    available: true,
  },
  {
    _id: 'local-17', name: 'Cheesecake', category: 'Desserts', price: 570,
    description: 'New York style creamy cheesecake on a buttery biscuit base.',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80',
    available: true,
  },
  {
    _id: 'local-18', name: 'Cinnamon Roll', category: 'Desserts', price: 460,
    description: 'Soft, pillowy roll glazed with vanilla cream cheese frosting.',
    image: 'https://images.unsplash.com/photo-1509365390695-33aee754301f?w=400&q=80',
    available: true,
  },
  {
    _id: 'local-19', name: 'Strawberry Tart', category: 'Desserts', price: 505,
    description: 'Crisp pastry shell with custard cream and fresh strawberries.',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80',
    available: true,
  },

  // ─── Beverages ────────────────────────────────────────────────
  {
    _id: 'local-20', name: 'Mango Smoothie', category: 'Beverages', price: 505,
    description: 'Fresh mango blended with yoghurt and a squeeze of lime.',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a90a3e3a?w=400&q=80',
    available: true,
  },
  {
    _id: 'local-21', name: 'Fresh Orange Juice', category: 'Beverages', price: 420,
    description: 'Freshly squeezed Valencia oranges, served chilled.',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80',
    available: true,
  },
  {
    _id: 'local-22', name: 'Sparkling Water', category: 'Beverages', price: 210,
    description: 'Premium Italian sparkling mineral water.',
    image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&q=80',
    available: true,
  },
  {
    _id: 'local-23', name: 'Pink Lemonade', category: 'Beverages', price: 380,
    description: 'House-made lemonade with raspberry syrup and fresh mint.',
    image: 'https://images.unsplash.com/photo-1437418747212-8d9709afab22?w=400&q=80',
    available: true,
  },
  {
    _id: 'local-24', name: 'Berry Blast Smoothie', category: 'Beverages', price: 545,
    description: 'Mixed berries, banana and almond milk — energising and delicious.',
    image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=400&q=80',
    available: true,
  },
];

export const CATEGORIES = ['All', 'Coffee', 'Tea', 'Snacks', 'Desserts', 'Beverages'];

export const CATEGORY_COLORS = {
  Coffee:    'bg-[#f0d9d0] text-[#6b3a2a]',
  Tea:       'bg-[#d8e8d8] text-[#2d5a2d]',
  Snacks:    'bg-[#f5e6c8] text-[#7a5020]',
  Desserts:  'bg-[#f5d0d8] text-[#7a2040]',
  Beverages: 'bg-[#d0e0f0] text-[#204070]',
};
