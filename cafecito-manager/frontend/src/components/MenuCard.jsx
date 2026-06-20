import { motion } from 'framer-motion';
import { FiShoppingCart, FiEye } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { CATEGORY_COLORS } from '../data/menuItems';
import { formatINR } from '../utils/currency';

const MenuCard = ({ item, onView }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-[#2a1f1a] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-[#c4846a]/10 transition-all duration-300 group border border-[#e8d8ce] dark:border-[#3d2b22]"
    >
      <div className="relative overflow-hidden h-48">
        <img src={item.image} alt={item.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
          loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3d1f10]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <button onClick={() => onView?.(item)}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 dark:bg-[#2a1f1a]/90 rounded-xl flex items-center justify-center text-[#8b5a44] opacity-0 group-hover:opacity-100 transition-all hover:text-[#6b3a2a]">
          <FiEye className="text-sm" />
        </button>
        <span className={`absolute top-3 left-3 badge ${CATEGORY_COLORS[item.category] || 'bg-[#f0d9d0] text-[#6b3a2a]'}`}>
          {item.category}
        </span>
        {!item.available && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-rose-500 text-white px-3 py-1 rounded-full text-sm font-semibold">Unavailable</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-[#3d1f10] dark:text-[#f5ede6] mb-1 truncate font-['Playfair_Display']">{item.name}</h3>
        <p className="text-sm text-[#8b5a44] dark:text-[#c4a89a] mb-3 line-clamp-2">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-[#6b3a2a] dark:text-[#c4846a]">{formatINR(item.price)}</span>
          <motion.button whileTap={{ scale: 0.95 }}
            onClick={() => item.available && addToCart(item)}
            disabled={!item.available}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#6b3a2a] hover:bg-[#5a3020] disabled:bg-[#c4a89a] disabled:cursor-not-allowed text-[#f5ede6] text-sm rounded-full font-medium transition-all shadow-sm">
            <FiShoppingCart className="text-xs" /> Add
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuCard;
