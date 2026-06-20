import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiTrash2, FiCheck, FiX, FiRefreshCw } from 'react-icons/fi';
import { bookingAPI } from '../../services/api';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/LoadingSpinner';

const statusStyle = {
  Pending:  'bg-[#f5e6c8] text-[#7a5020]',
  Approved: 'bg-[#d8e8d8] text-[#2d5a2d]',
  Rejected: 'bg-[#f5d0d8] text-[#7a2040]',
};

const AdminBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  const fetchBookings = () => {
    setLoading(true);
    bookingAPI.getAll()
      .then(({ data }) => setBookings(data.bookings))
      .catch(() => toast.error('Failed to load bookings'))
      .finally(() => setLoading(false));
  };
  useEffect(fetchBookings, []);

  const handleStatus = async (id, status) => {
    setUpdating(id);
    try {
      await bookingAPI.updateStatus(id, status);
      setBookings(prev => prev.map(b => b._id === id ? { ...b, status } : b));
      toast.success(`Booking ${status.toLowerCase()}`);
    } catch { toast.error('Failed to update'); }
    finally { setUpdating(null); }
  };

  const handleDelete = async id => {
    if (!confirm('Delete this booking?')) return;
    try {
      await bookingAPI.delete(id);
      setBookings(prev => prev.filter(b => b._id !== id));
      toast.success('Booking deleted');
    } catch { toast.error('Failed to delete'); }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#3d1f10] dark:text-[#f5ede6] font-['Playfair_Display']">Bookings</h1>
          <p className="text-[#8b5a44] dark:text-[#c4a89a] text-sm mt-1">{bookings.length} total bookings</p>
        </div>
        <button onClick={fetchBookings}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#f0d9d0] dark:bg-[#3d2b22] text-[#6b3a2a] dark:text-[#c4846a] rounded-full font-medium hover:bg-[#e8c8bc] transition-colors border border-[#e8d8ce] dark:border-[#4d3830]">
          <FiRefreshCw className="text-sm" /> Refresh
        </button>
      </div>

      <div className="bg-white dark:bg-[#2a1f1a] rounded-3xl shadow-sm overflow-hidden border border-[#e8d8ce] dark:border-[#3d2b22]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#fdf6f0] dark:bg-[#3d2b22]/30">
              <tr>
                {['Guest', 'Date & Time', 'Party', 'Requests', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-[#c4a89a] uppercase tracking-wider px-6 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0e4dc] dark:divide-[#3d2b22]">
              {bookings.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-12 text-[#c4a89a]">No bookings yet</td></tr>
              ) : bookings.map((b, i) => (
                <motion.tr key={b._id}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                  className="hover:bg-[#fdf6f0] dark:hover:bg-[#3d2b22]/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-[#3d1f10] dark:text-[#f5ede6]">{b.name}</p>
                    <p className="text-sm text-[#8b5a44] dark:text-[#c4a89a]">{b.phone}</p>
                    <p className="text-xs text-[#c4a89a]">{b.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-[#3d1f10] dark:text-[#f5ede6]">{b.date}</p>
                    <p className="text-sm text-[#8b5a44] dark:text-[#c4a89a]">{b.time}</p>
                  </td>
                  <td className="px-6 py-4 text-[#3d1f10] dark:text-[#f5ede6]">{b.guests} guests</td>
                  <td className="px-6 py-4 text-sm text-[#8b5a44] dark:text-[#c4a89a] max-w-32 truncate">
                    {b.specialRequests || '—'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`badge ${statusStyle[b.status] || 'bg-[#f0d9d0] text-[#6b3a2a]'}`}>{b.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      {b.status === 'Pending' && (
                        <>
                          <button onClick={() => handleStatus(b._id, 'Approved')} disabled={updating === b._id}
                            className="p-1.5 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-xl transition-colors" title="Approve">
                            <FiCheck className="text-sm" />
                          </button>
                          <button onClick={() => handleStatus(b._id, 'Rejected')} disabled={updating === b._id}
                            className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-colors" title="Reject">
                            <FiX className="text-sm" />
                          </button>
                        </>
                      )}
                      <button onClick={() => handleDelete(b._id)}
                        className="p-1.5 text-[#c4a89a] hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-colors" title="Delete">
                        <FiTrash2 className="text-sm" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminBookingsPage;
