import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiTrash2, FiRefreshCw } from 'react-icons/fi';
import { orderAPI } from '../../services/api';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/LoadingSpinner';

const STATUSES = ['Pending', 'Preparing', 'Ready', 'Delivered'];
const statusStyle = {
  Pending:   'bg-[#f5e6c8] text-[#7a5020]',
  Preparing: 'bg-[#d0e0f0] text-[#204070]',
  Ready:     'bg-[#d8e8d8] text-[#2d5a2d]',
  Delivered: 'bg-[#e8e0d8] text-[#5a4a3a]',
};

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  const fetchOrders = () => {
    setLoading(true);
    orderAPI.getAll().then(({ data }) => setOrders(data.orders)).catch(() => toast.error('Failed to load')).finally(() => setLoading(false));
  };
  useEffect(fetchOrders, []);

  const handleStatus = async (id, status) => {
    setUpdating(id);
    try { await orderAPI.updateStatus(id, status); setOrders(prev => prev.map(o => o._id === id ? { ...o, status } : o)); toast.success('Updated'); }
    catch { toast.error('Failed'); }
    finally { setUpdating(null); }
  };

  const handleDelete = async id => {
    if (!confirm('Delete?')) return;
    try { await orderAPI.delete(id); setOrders(prev => prev.filter(o => o._id !== id)); toast.success('Deleted'); }
    catch { toast.error('Failed'); }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#3d1f10] dark:text-[#f5ede6] font-['Playfair_Display']">Orders</h1>
          <p className="text-[#8b5a44] dark:text-[#c4a89a] text-sm mt-1">{orders.length} total orders</p>
        </div>
        <button onClick={fetchOrders}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#f0d9d0] dark:bg-[#3d2b22] text-[#6b3a2a] dark:text-[#c4846a] rounded-full font-medium hover:bg-[#e8c8bc] transition-colors border border-[#e8d8ce] dark:border-[#4d3830]">
          <FiRefreshCw className="text-sm" /> Refresh
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-[#2a1f1a] rounded-3xl border border-[#e8d8ce] dark:border-[#3d2b22]">
          <p className="text-[#c4a89a]">No orders yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order, i) => (
            <motion.div key={order._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              className="bg-white dark:bg-[#2a1f1a] rounded-3xl p-6 shadow-sm border border-[#e8d8ce] dark:border-[#3d2b22]">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs text-[#c4a89a]">#{order._id?.slice(-8)}</p>
                  <p className="font-semibold text-[#3d1f10] dark:text-[#f5ede6]">{order.customerName}</p>
                  <p className="text-sm text-[#8b5a44] dark:text-[#c4a89a]">{order.phone} · {order.email}</p>
                  <p className="text-xs text-[#c4a89a] mt-1">{new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-[#6b3a2a] dark:text-[#c4846a]">${order.totalAmount?.toFixed(2)}</span>
                  <button onClick={() => handleDelete(order._id)} className="p-2 text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-colors">
                    <FiTrash2 className="text-sm" />
                  </button>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {order.items?.map((item, j) => (
                  <span key={j} className="text-xs bg-[#fdf6f0] dark:bg-[#3d2b22] text-[#6b3a2a] dark:text-[#c4846a] px-2.5 py-1 rounded-full border border-[#e8d8ce] dark:border-[#4d3830]">
                    {item.name} × {item.quantity}
                  </span>
                ))}
              </div>
              {order.notes && <p className="mt-3 text-sm text-[#8b5a44] bg-[#fdf6f0] dark:bg-[#3d2b22] rounded-2xl px-4 py-2">📝 {order.notes}</p>}
              <div className="mt-4 flex flex-wrap gap-2">
                {STATUSES.map(s => (
                  <button key={s} disabled={updating === order._id} onClick={() => handleStatus(order._id, s)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      order.status === s
                        ? `${statusStyle[s]} ring-2 ring-offset-1 ring-current`
                        : 'bg-[#fdf6f0] dark:bg-[#3d2b22] text-[#8b5a44] dark:text-[#c4a89a] hover:bg-[#f0d9d0] dark:hover:bg-[#4d3830]'
                    }`}>
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPage;
