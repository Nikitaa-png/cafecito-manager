import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { orderAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { formatINR } from '../utils/currency';

const statusStyle = {
  Pending:   'bg-[#f5e6c8] text-[#7a5020]',
  Preparing: 'bg-[#d0e0f0] text-[#204070]',
  Ready:     'bg-[#d8e8d8] text-[#2d5a2d]',
  Delivered: 'bg-[#e8e0d8] text-[#5a4a3a]',
};

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderAPI.getMy().then(({ data }) => setOrders(data.orders)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="pt-28"><LoadingSpinner /></div>;

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 bg-[#fdf6f0] dark:bg-[#1a1008]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#3d1f10] dark:text-[#f5ede6] font-['Playfair_Display'] mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-7xl mb-4">📦</div>
            <p className="text-xl font-semibold text-[#8b5a44] dark:text-[#c4a89a] mb-2">No orders yet</p>
            <Link to="/menu" className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-[#6b3a2a] text-[#f5ede6] rounded-full font-semibold shadow-md">
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, i) => (
              <motion.div key={order._id}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-[#2a1f1a] rounded-3xl p-6 shadow-sm border border-[#e8d8ce] dark:border-[#3d2b22]"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="font-mono text-xs text-[#c4a89a]">#{order._id?.slice(-8)}</p>
                    <p className="font-semibold text-[#3d1f10] dark:text-[#f5ede6] font-['Playfair_Display']">{order.customerName}</p>
                    <p className="text-sm text-[#8b5a44] dark:text-[#c4a89a] mt-0.5">
                      {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`badge ${statusStyle[order.status] || 'bg-[#f0d9d0] text-[#6b3a2a]'}`}>{order.status}</span>
                    <p className="text-lg font-bold text-[#6b3a2a] dark:text-[#c4846a] mt-1">${order.totalAmount?.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {order.items?.map((item, j) => (
                    <span key={j} className="text-xs bg-[#fdf6f0] dark:bg-[#3d2b22] text-[#6b3a2a] dark:text-[#c4846a] px-2.5 py-1 rounded-full border border-[#e8d8ce] dark:border-[#4d3830]">
                      {item.name} × {item.quantity}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrdersPage;
