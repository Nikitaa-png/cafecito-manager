import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiArrowLeft } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { formatINR } from '../utils/currency';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, total, clearCart } = useCart();

  if (cart.length === 0) return (
    <div className="min-h-screen pt-28 pb-20 flex flex-col items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
        <div className="text-8xl mb-6">🛒</div>
        <h2 className="text-2xl font-bold text-[#3d1f10] dark:text-[#f5ede6] font-['Playfair_Display'] mb-3">Your cart is empty</h2>
        <p className="text-[#8b5a44] dark:text-[#c4a89a] mb-8">Add something delicious from our menu!</p>
        <Link to="/menu" className="inline-flex items-center gap-2 px-8 py-4 bg-[#6b3a2a] hover:bg-[#5a3020] text-[#f5ede6] rounded-full font-semibold shadow-lg">
          <FiShoppingBag /> Browse Menu
        </Link>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 bg-[#fdf6f0] dark:bg-[#1a1008]">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Link to="/menu" className="p-2 rounded-xl bg-white dark:bg-[#2a1f1a] shadow-sm border border-[#e8d8ce] dark:border-[#3d2b22] text-[#8b5a44] hover:bg-[#f0d9d0] transition-colors">
            <FiArrowLeft />
          </Link>
          <h1 className="text-3xl font-bold text-[#3d1f10] dark:text-[#f5ede6] font-['Playfair_Display']">Your Cart</h1>
          <span className="px-2.5 py-1 bg-[#f0d9d0] dark:bg-[#3d2b22] text-[#6b3a2a] dark:text-[#c4846a] text-sm font-semibold rounded-full">
            {cart.length} item{cart.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cart.map(item => (
                <motion.div key={item._id}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20, height: 0 }}
                  className="flex gap-4 bg-white dark:bg-[#2a1f1a] rounded-3xl p-4 shadow-sm border border-[#e8d8ce] dark:border-[#3d2b22]"
                >
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-2xl flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[#3d1f10] dark:text-[#f5ede6] truncate font-['Playfair_Display']">{item.name}</h3>
                    <p className="text-sm text-[#8b5a44] dark:text-[#c4a89a]">{item.category}</p>
                    <p className="font-bold text-[#6b3a2a] dark:text-[#c4846a] mt-1">{formatINR(item.price * item.quantity)}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button onClick={() => removeFromCart(item._id)} className="text-[#c4a89a] hover:text-rose-500 transition-colors">
                      <FiTrash2 />
                    </button>
                    <div className="flex items-center gap-2 bg-[#fdf6f0] dark:bg-[#3d2b22] rounded-xl px-2 py-1">
                      <button onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center hover:text-[#6b3a2a] transition-colors">
                        <FiMinus className="text-xs" />
                      </button>
                      <span className="w-6 text-center text-sm font-semibold text-[#3d1f10] dark:text-[#f5ede6]">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center hover:text-[#6b3a2a] transition-colors">
                        <FiPlus className="text-xs" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <button onClick={clearCart} className="text-sm text-rose-500 hover:text-rose-600 transition-colors font-medium">
              Clear all items
            </button>
          </div>

          {/* Summary */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-[#2a1f1a] rounded-3xl p-6 shadow-sm border border-[#e8d8ce] dark:border-[#3d2b22] h-fit">
            <h2 className="text-xl font-bold text-[#3d1f10] dark:text-[#f5ede6] font-['Playfair_Display'] mb-6">Order Summary</h2>
            <div className="space-y-3 mb-6">
              {cart.map(item => (
                <div key={item._id} className="flex justify-between text-sm">
                  <span className="text-[#8b5a44] dark:text-[#c4a89a] truncate pr-2">{item.name} × {item.quantity}</span>
                  <span className="font-medium text-[#3d1f10] dark:text-[#f5ede6] flex-shrink-0">{formatINR(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-[#e8d8ce] dark:border-[#3d2b22] pt-4 mb-6 space-y-2">
              <div className="flex justify-between text-sm text-[#8b5a44] dark:text-[#c4a89a]">
                <span>Subtotal</span><span>{formatINR(total)}</span>
              </div>
              <div className="flex justify-between text-sm text-[#8b5a44] dark:text-[#c4a89a]">
                <span>Tax (8%)</span><span>{formatINR(total * 0.08)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2">
                <span className="text-[#3d1f10] dark:text-[#f5ede6]">Total</span>
                <span className="text-[#6b3a2a] dark:text-[#c4846a]">{formatINR(total * 1.08)}</span>
              </div>
            </div>
            <Link to="/checkout"
              className="block w-full text-center py-4 bg-[#6b3a2a] hover:bg-[#5a3020] text-[#f5ede6] rounded-full font-semibold transition-all shadow-lg">
              Proceed to Checkout
            </Link>
            <Link to="/menu" className="block w-full text-center py-3 mt-3 text-[#8b5a44] hover:text-[#6b3a2a] text-sm transition-colors">
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
