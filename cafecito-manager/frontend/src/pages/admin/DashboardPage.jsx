import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiShoppingBag, FiDollarSign, FiCalendar, FiList, FiUsers } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { orderAPI } from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';

const PIE_COLORS = ['#c4846a', '#8b5a44', '#6b3a2a', '#f0d9d0'];

const statusStyle = {
  Pending:   'bg-[#f5e6c8] text-[#7a5020]',
  Preparing: 'bg-[#d0e0f0] text-[#204070]',
  Ready:     'bg-[#d8e8d8] text-[#2d5a2d]',
  Delivered: 'bg-[#e8e0d8] text-[#5a4a3a]',
};

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderAPI.getStats().then(({ data }) => setStats(data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  const statCards = [
    { label: 'Total Orders',  value: stats?.totalOrders ?? 0,                     icon: FiShoppingBag, bg: 'bg-[#f0d9d0]', color: 'text-[#6b3a2a]' },
    { label: 'Total Revenue', value: `$${(stats?.totalRevenue ?? 0).toFixed(2)}`, icon: FiDollarSign,  bg: 'bg-[#d8e8d8]', color: 'text-[#2d5a2d]' },
    { label: 'Bookings',      value: stats?.totalBookings ?? 0,                    icon: FiCalendar,    bg: 'bg-[#d0e0f0]', color: 'text-[#204070]' },
    { label: 'Menu Items',    value: stats?.totalMenuItems ?? 0,                   icon: FiList,        bg: 'bg-[#f5e6c8]', color: 'text-[#7a5020]' },
    { label: 'Total Users',   value: stats?.totalUsers ?? 0,                       icon: FiUsers,       bg: 'bg-[#f5d0d8]', color: 'text-[#7a2040]' },
  ];

  const chartData = stats?.recentOrders?.map(o => ({ name: `#${o._id?.slice(-4)}`, amount: o.totalAmount })) || [];
  const pieData = ['Pending','Preparing','Ready','Delivered']
    .map(s => ({ name: s, value: stats?.recentOrders?.filter(o => o.status === s).length || 0 }))
    .filter(d => d.value > 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#3d1f10] dark:text-[#f5ede6] font-['Playfair_Display']">Dashboard</h1>
        <p className="text-[#8b5a44] dark:text-[#c4a89a] text-sm mt-1">Welcome back! Here's what's happening at Cafecito.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
        {statCards.map(({ label, value, icon: Icon, bg, color }, i) => (
          <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="bg-white dark:bg-[#2a1f1a] rounded-3xl p-5 shadow-sm border border-[#e8d8ce] dark:border-[#3d2b22]">
            <div className={`w-10 h-10 ${bg} rounded-2xl flex items-center justify-center mb-3`}>
              <Icon className={`${color} text-lg`} />
            </div>
            <p className="text-2xl font-bold text-[#3d1f10] dark:text-[#f5ede6]">{value}</p>
            <p className="text-sm text-[#8b5a44] dark:text-[#c4a89a] mt-0.5">{label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-[#2a1f1a] rounded-3xl p-6 shadow-sm border border-[#e8d8ce] dark:border-[#3d2b22]">
          <h3 className="font-semibold text-[#3d1f10] dark:text-[#f5ede6] mb-4 font-['Playfair_Display']">Recent Orders Revenue</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0d9d0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={v => `$${v.toFixed(2)}`}
                contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(107,58,42,0.12)' }} />
              <Bar dataKey="amount" fill="#c4846a" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-[#2a1f1a] rounded-3xl p-6 shadow-sm border border-[#e8d8ce] dark:border-[#3d2b22]">
          <h3 className="font-semibold text-[#3d1f10] dark:text-[#f5ede6] mb-4 font-['Playfair_Display']">Order Status</h3>
          {pieData.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={3}>
                    {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-3 space-y-1">
                {pieData.map(({ name, value }, i) => (
                  <div key={name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                      <span className="text-[#8b5a44] dark:text-[#c4a89a]">{name}</span>
                    </div>
                    <span className="font-semibold text-[#3d1f10] dark:text-[#f5ede6]">{value}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center py-12">
              <p className="text-[#c4a89a] text-sm">No order data yet</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-[#2a1f1a] rounded-3xl shadow-sm overflow-hidden border border-[#e8d8ce] dark:border-[#3d2b22]">
        <div className="px-6 py-4 border-b border-[#f0e4dc] dark:border-[#3d2b22]">
          <h3 className="font-semibold text-[#3d1f10] dark:text-[#f5ede6] font-['Playfair_Display']">Recent Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#fdf6f0] dark:bg-[#3d2b22]/30">
              <tr>
                {['Order ID','Customer','Items','Total','Status','Date'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-[#c4a89a] uppercase tracking-wider px-6 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0e4dc] dark:divide-[#3d2b22]">
              {!stats?.recentOrders?.length ? (
                <tr><td colSpan={6} className="text-center py-8 text-[#c4a89a]">No orders yet</td></tr>
              ) : stats.recentOrders.map(order => (
                <tr key={order._id} className="hover:bg-[#fdf6f0] dark:hover:bg-[#3d2b22]/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-[#c4a89a]">#{order._id?.slice(-8)}</td>
                  <td className="px-6 py-4 text-sm font-medium text-[#3d1f10] dark:text-[#f5ede6]">{order.customerName}</td>
                  <td className="px-6 py-4 text-sm text-[#8b5a44]">{order.items?.length} items</td>
                  <td className="px-6 py-4 text-sm font-semibold text-[#6b3a2a] dark:text-[#c4846a]">${order.totalAmount?.toFixed(2)}</td>
                  <td className="px-6 py-4"><span className={`badge ${statusStyle[order.status] || ''}`}>{order.status}</span></td>
                  <td className="px-6 py-4 text-sm text-[#c4a89a]">{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
