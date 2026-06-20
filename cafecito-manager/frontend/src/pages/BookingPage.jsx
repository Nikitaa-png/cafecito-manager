import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiUsers, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { bookingAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const TIME_SLOTS = ['09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00'];

const BookingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [backendError, setBackendError] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '', email: user?.email || '',
    phone: '', date: '', time: '', guests: 2, specialRequests: '',
  });

  const today = new Date().toISOString().split('T')[0];
  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.date) { toast.error('Please select a date'); return; }
    if (!form.time) { toast.error('Please select a time slot'); return; }
    setLoading(true); setBackendError(false);
    try {
      await bookingAPI.create({ ...form, guests: Number(form.guests) });
      toast.success('Table booked successfully!');
      setSubmitted(true);
    } catch (error) {
      const msg = error.response?.data?.message;
      if (msg) { toast.error(msg); }
      else { setBackendError(true); toast.error('Cannot reach the server. Please start the backend first.'); }
    } finally { setLoading(false); }
  };

  if (submitted) return (
    <div className="min-h-screen pt-28 pb-20 flex items-center justify-center px-4 bg-[#fdf6f0] dark:bg-[#1a1008]">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white dark:bg-[#2a1f1a] rounded-3xl shadow-2xl overflow-hidden border border-[#e8d8ce] dark:border-[#3d2b22] text-center">
        <div className="bg-[#6b3a2a] p-10">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}
            className="w-20 h-20 bg-[#f5ede6] rounded-full flex items-center justify-center mx-auto mb-4">
            <FiCheck className="text-[#6b3a2a] text-3xl" strokeWidth={3} />
          </motion.div>
          <h2 className="text-2xl font-bold text-[#f5ede6] font-['Playfair_Display']">Booking Confirmed!</h2>
          <p className="text-[#c4a89a] mt-2">We'll see you soon ☕</p>
        </div>
        <div className="p-8">
          <div className="bg-[#fdf6f0] dark:bg-[#3d2b22] rounded-2xl p-4 mb-6 text-left space-y-2">
            {[['Name', form.name], ['Date', form.date], ['Time', form.time], ['Guests', `${form.guests} person${form.guests > 1 ? 's' : ''}`]].map(([l, v]) => (
              <div key={l} className="flex justify-between text-sm">
                <span className="text-[#c4a89a]">{l}</span>
                <span className="font-semibold text-[#3d1f10] dark:text-[#f5ede6]">{v}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={() => { setSubmitted(false); setForm({ name: user?.name || '', email: user?.email || '', phone: '', date: '', time: '', guests: 2, specialRequests: '' }); }}
              className="flex-1 py-3 bg-[#f0d9d0] dark:bg-[#3d2b22] text-[#6b3a2a] dark:text-[#c4846a] rounded-full font-semibold hover:bg-[#e8c8bc] transition-colors">
              Book Again
            </button>
            <button onClick={() => navigate('/')}
              className="flex-1 py-3 bg-[#6b3a2a] hover:bg-[#5a3020] text-[#f5ede6] rounded-full font-semibold shadow-lg transition-all">
              Back to Home
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen pt-16 pb-20">
      <div className="relative py-20 px-4 text-center overflow-hidden bg-[#3d1f10]">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1920" alt="" className="w-full h-full object-cover" />
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative">
          <span className="text-[#c4846a] font-semibold text-sm uppercase tracking-widest">Reservations</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#f5ede6] mt-2 font-['Playfair_Display']">Book a Table</h1>
          <p className="text-[#c4a89a] mt-3 max-w-xl mx-auto">Reserve your spot for a memorable café experience.</p>
        </motion.div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 mt-10">
        {backendError && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex gap-3 items-start p-4 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-2xl text-rose-600 dark:text-rose-300">
            <FiAlertCircle className="text-lg mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-sm">Backend not running</p>
              <p className="text-sm mt-0.5 opacity-80">Run: <code className="ml-1 px-1.5 py-0.5 bg-rose-100 dark:bg-rose-900/40 rounded text-xs font-mono">cd backend && npm run dev</code></p>
            </div>
          </motion.div>
        )}

        <motion.form initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit}
          className="bg-white dark:bg-[#2a1f1a] rounded-3xl shadow-xl p-8 border border-[#e8d8ce] dark:border-[#3d2b22]">
          <h2 className="text-xl font-bold text-[#3d1f10] dark:text-[#f5ede6] font-['Playfair_Display'] mb-6">Your Reservation</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-[#6b3a2a] dark:text-[#c4a89a] mb-2">Full Name *</label>
              <input name="name" value={form.name} onChange={handleChange} required placeholder="Your name" className="input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#6b3a2a] dark:text-[#c4a89a] mb-2">Email *</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" className="input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#6b3a2a] dark:text-[#c4a89a] mb-2">Phone *</label>
              <input name="phone" type="tel" value={form.phone} onChange={handleChange} required placeholder="+1 (555) 000-0000" className="input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#6b3a2a] dark:text-[#c4a89a] mb-2"><FiUsers className="inline mr-1" />Guests *</label>
              <input name="guests" type="number" min={1} max={20} value={form.guests} onChange={handleChange} required className="input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#6b3a2a] dark:text-[#c4a89a] mb-2"><FiCalendar className="inline mr-1" />Date *</label>
              <input name="date" type="date" min={today} value={form.date} onChange={handleChange} required className="input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#6b3a2a] dark:text-[#c4a89a] mb-2"><FiClock className="inline mr-1" />Time Slot *</label>
              <select name="time" value={form.time} onChange={handleChange} required className="input">
                <option value="">Select a time</option>
                {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-[#6b3a2a] dark:text-[#c4a89a] mb-2">Special Requests</label>
              <textarea name="specialRequests" value={form.specialRequests} onChange={handleChange} rows={3}
                className="input resize-none" placeholder="Dietary restrictions, occasions, seating preferences…" />
            </div>
          </div>

          <motion.button whileTap={{ scale: 0.98 }} type="submit" disabled={loading}
            className="mt-6 w-full py-4 bg-[#6b3a2a] hover:bg-[#5a3020] disabled:opacity-60 text-[#f5ede6] rounded-full font-semibold shadow-lg flex items-center justify-center gap-2 transition-all">
            {loading
              ? <><span className="w-4 h-4 border-2 border-[#f5ede6] border-t-transparent rounded-full animate-spin" />Booking…</>
              : <><FiCalendar />Reserve Table</>}
          </motion.button>
          <p className="text-xs text-[#c4a89a] text-center mt-4">Confirmed by our team within 24 hours.</p>
        </motion.form>
      </div>
    </div>
  );
};

export default BookingPage;
