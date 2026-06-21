import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCheck } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../services/api';
import toast from 'react-hot-toast';
import { formatINR } from '../utils/currency';

const CheckoutPage = () => {
  const { cart, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    customerName: user?.name || '', email: user?.email || '', phone: '', notes: '',
  });

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.phone.trim()) { toast.error('Please enter your phone number'); return; }
    setLoading(true);
    try {
      const { data } = await orderAPI.create({
        ...form,
        items: cart.map(item => ({
          menuItem: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        totalAmount: parseFloat((total * 1.08).toFixed(2)),
      });
      clearCart();
      navigate('/order-confirmation', { state: { order: data.order } });
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to place order. Is the backend running?';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) return (
    <div className="min-h-screen pt-28 flex items-center justify-center">
      <div className="text-center">
        <p className="text-xl text-[#8b5a44] mb-4">Your cart is empty</p>
        <Link to="/menu" className="px-6 py-3 bg-[#6b3a2a] text-[#f5ede6] rounded-full font-semibold">Browse Menu</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 bg-[#fdf6f0] dark:bg-[#1a1008]">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Link to="/cart" className="p-2 rounded-xl bg-white dark:bg-[#2a1f1a] shadow-sm border border-[#e8d8ce] dark:border-[#3d2b22] text-[#8b5a44] hover:bg-[#f0d9d0] transition-colors">
            <FiArrowLeft />
          </Link>
          <h1 className="text-3xl font-bold text-[#3d1f10] dark:text-[#f5ede6] font-['Playfair_Display']">Checkout</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white dark:bg-[#2a1f1a] rounded-3xl p-6 shadow-sm border border-[#e8d8ce] dark:border-[#3d2b22]">
              <h2 className="text-xl font-bold text-[#3d1f10] dark:text-[#f5ede6] mb-6 font-['Playfair_Display']">Your Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: 'customerName', label: 'Full Name *', type: 'text', placeholder: 'Your name' },
                  { name: 'email', label: 'Email *', type: 'email', placeholder: 'your@email.com' },
                  { name: 'phone', label: 'Phone *', type: 'text', placeholder: '+1 (555) 000-0000' },
                  { name: 'notes', label: 'Special Notes', type: 'text', placeholder: 'Allergies, requests…' },
                ].map(f => (
                  <div key={f.name}>
                    <label className="block text-sm font-medium text-[#6b3a2a] dark:text-[#c4a89a] mb-2">{f.label}</label>
                    <input name={f.name} type={f.type} value={form[f.name]} onChange={handleChange}
                      required={f.label.includes('*')} placeholder={f.placeholder} className="input" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-[#2a1f1a] rounded-3xl p-6 shadow-sm border border-[#e8d8ce] dark:border-[#3d2b22] h-fit">
              <h2 className="text-xl font-bold text-[#3d1f10] dark:text-[#f5ede6] font-['Playfair_Display'] mb-4">Your Order</h2>
              <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                {cart.map(item => (
                  <div key={item._id} className="flex justify-between text-sm">
                    <span className="text-[#8b5a44] dark:text-[#c4a89a] truncate pr-2">{item.name} × {item.quantity}</span>
                    <span className="font-medium text-[#3d1f10] dark:text-[#f5ede6] flex-shrink-0">{formatINR(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#e8d8ce] dark:border-[#3d2b22] pt-4 space-y-2">
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
              <motion.button whileTap={{ scale: 0.98 }} type="submit" disabled={loading}
                className="mt-6 w-full py-4 bg-[#6b3a2a] hover:bg-[#5a3020] disabled:opacity-60 text-[#f5ede6] rounded-full font-semibold shadow-lg flex items-center justify-center gap-2 transition-all">
                {loading
                  ? <><span className="w-4 h-4 border-2 border-[#f5ede6] border-t-transparent rounded-full animate-spin" /> Placing…</>
                  : <><FiCheck /> Place Order</>}
              </motion.button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
