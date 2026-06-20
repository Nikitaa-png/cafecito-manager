import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheck, FiShoppingBag, FiHome } from 'react-icons/fi';
import { formatINR } from '../utils/currency';

const OrderConfirmationPage = () => {
  const { state } = useLocation();
  const order = state?.order;

  return (
    <div className="min-h-screen pt-28 pb-20 flex items-center justify-center px-4 bg-[#fdf6f0] dark:bg-[#1a1008]">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white dark:bg-[#2a1f1a] rounded-3xl shadow-2xl overflow-hidden border border-[#e8d8ce] dark:border-[#3d2b22]">
        <div className="bg-[#6b3a2a] p-10 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}
            className="w-20 h-20 bg-[#f5ede6] rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
            <FiCheck className="text-[#6b3a2a] text-3xl" strokeWidth={3} />
          </motion.div>
          <h1 className="text-2xl font-bold text-[#f5ede6] font-['Playfair_Display']">Order Placed! 🎉</h1>
          <p className="text-[#c4a89a] mt-2">Thank you — we're on it!</p>
        </div>
        <div className="p-8">
          {order && (
            <>
              <div className="bg-[#fdf6f0] dark:bg-[#3d2b22] rounded-2xl p-4 mb-6">
                <p className="text-xs text-[#c4a89a] mb-1">Order ID</p>
                <p className="font-mono text-sm font-semibold text-[#6b3a2a] dark:text-[#c4846a] break-all">#{order._id}</p>
              </div>
              <div className="space-y-3 mb-6">
                {[
                  ['Customer', order.customerName],
                  ['Items', order.items?.length],
                  ['Total', formatINR(order.totalAmount ?? 0)],
                  ['Status', order.status],
                ].map(([label, val]) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-[#c4a89a]">{label}</span>
                    <span className={`font-semibold ${label === 'Status'
                      ? 'px-2.5 py-0.5 bg-[#f0d9d0] dark:bg-[#3d2b22] text-[#6b3a2a] dark:text-[#c4846a] rounded-full text-xs'
                      : 'text-[#3d1f10] dark:text-[#f5ede6]'}`}>{val}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-[#8b5a44] dark:text-[#c4a89a] text-center mb-6">
                We'll start preparing your order right away!
              </p>
            </>
          )}
          <div className="flex gap-3">
            <Link to="/my-orders"
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#6b3a2a] hover:bg-[#5a3020] text-[#f5ede6] rounded-full font-semibold text-sm shadow-md transition-all">
              <FiShoppingBag className="text-xs" /> My Orders
            </Link>
            <Link to="/"
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#f0d9d0] dark:bg-[#3d2b22] text-[#6b3a2a] dark:text-[#c4846a] rounded-full font-semibold text-sm hover:bg-[#e8c8bc] transition-colors">
              <FiHome className="text-xs" /> Home
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderConfirmationPage;
