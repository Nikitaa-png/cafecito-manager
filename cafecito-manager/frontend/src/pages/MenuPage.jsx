import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiSliders } from 'react-icons/fi';
import { MENU_ITEMS, CATEGORIES } from '../data/menuItems';
import MenuCard from '../components/MenuCard';
import MenuModal from '../components/MenuModal';

const SORT_OPTIONS = [
  { value: '', label: 'Default' },
  { value: 'price_asc', label: 'Price: Low → High' },
  { value: 'price_desc', label: 'Price: High → Low' },
  { value: 'name', label: 'Name A–Z' },
];

const MenuPage = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const items = useMemo(() => {
    let list = [...MENU_ITEMS];
    if (category !== 'All') list = list.filter(i => i.category === category);
    if (search.trim()) list = list.filter(i => i.name.toLowerCase().includes(search.toLowerCase()));
    if (sortBy === 'price_asc') list.sort((a, b) => a.price - b.price);
    if (sortBy === 'price_desc') list.sort((a, b) => b.price - a.price);
    if (sortBy === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [search, category, sortBy]);

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <div className="relative py-20 px-4 text-center overflow-hidden bg-[#3d1f10]">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920" alt="" className="w-full h-full object-cover" />
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative">
          <span className="text-[#c4846a] font-semibold text-sm uppercase tracking-widest">Explore</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#f5ede6] mt-2 font-['Playfair_Display']">Our Menu</h1>
          <p className="text-[#c4a89a] mt-3 max-w-xl mx-auto">
            {MENU_ITEMS.length} items crafted with love — find your favourite.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search + Sort */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c4a89a]" />
            <input type="text" placeholder="Search menu items…" value={search}
              onChange={e => setSearch(e.target.value)} className="input pl-11" />
          </div>
          <div className="relative">
            <FiSliders className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c4a89a] pointer-events-none" />
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}
              className="input pl-11 pr-8 appearance-none cursor-pointer min-w-48">
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 flex-wrap mb-8">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                category === cat
                  ? 'bg-[#6b3a2a] text-[#f5ede6] shadow-md'
                  : 'bg-white dark:bg-[#2a1f1a] text-[#8b5a44] dark:text-[#c4a89a] border border-[#e8d8ce] dark:border-[#3d2b22] hover:border-[#6b3a2a] hover:text-[#6b3a2a] dark:hover:text-[#c4846a]'
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {items.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-7xl mb-4">☕</div>
            <p className="text-xl font-semibold text-[#8b5a44] dark:text-[#c4a89a]">No items found</p>
            <p className="text-[#c4a89a] mt-1">Try a different search or category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item, i) => (
              <motion.div key={item._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                <MenuCard item={item} onView={setSelectedItem} />
              </motion.div>
            ))}
          </div>
        )}

        <p className="text-sm text-[#c4a89a] mt-8 text-center">
          {items.length} item{items.length !== 1 ? 's' : ''} shown
        </p>
      </div>

      {selectedItem && <MenuModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
    </div>
  );
};

export default MenuPage;
