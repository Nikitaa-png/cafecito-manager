import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { CATEGORY_COLORS } from '../data/menuItems';
import { formatINR } from '../utils/currency';

const MenuModal = ({ item, onClose }) => {
  const { addToCart } = useCart();
  if (!item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute inset-0 bg-[#3d1f10]/50 backdrop-blur-sm" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={e => e.stopPropagation()}
          className="relative bg-white dark:bg-[#2a1f1a] rounded-3xl overflow-hidden shadow-2xl max-w-md w-full z-10 border border-[#e8d8ce] dark:border-[#3d2b22]"
        >
          <div className="relative h-64">
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            <button onClick={onClose}
              className="absolute top-3 right-3 w-9 h-9 bg-white/90 dark:bg-[#2a1f1a]/90 rounded-xl flex items-center justify-center text-[#6b3a2a] hover:bg-[#f0d9d0] transition-colors">
              <FiX />
            </button>
            <span className={`absolute bottom-3 left-3 badge ${CATEGORY_COLORS[item.category] || ''}`}>
              {item.category}
            </span>
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-[#3d1f10] dark:text-[#f5ede6] font-['Playfair_Display'] mb-2">{item.name}</h2>
            <p className="text-[#8b5a44] dark:text-[#c4a89a] mb-6 leading-relaxed">{item.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-[#6b3a2a] dark:text-[#c4846a]">{formatINR(item.price)}</span>
              <button onClick={() => { addToCart(item); onClose(); }} disabled={!item.available}
                className="flex items-center gap-2 px-6 py-3 bg-[#6b3a2a] hover:bg-[#5a3020] disabled:bg-[#c4a89a] text-[#f5ede6] rounded-full font-semibold transition-all shadow-md">
                <FiShoppingCart />
                {item.available ? 'Add to Cart' : 'Unavailable'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default MenuModal;
