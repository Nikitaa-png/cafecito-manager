import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiEye, FiEyeOff, FiShield } from 'react-icons/fi';
import { TbCoffee } from 'react-icons/tb';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const AdminLoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPwd, setShowPwd] = useState(false);
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const { success, user } = await login(form.email, form.password);
    if (!success) return;
    if (user?.role !== 'admin') {
      // Logged in but not admin — kick them out
      toast.error('Access denied. Admin credentials required.');
      // Log them back out
      localStorage.removeItem('cafecito_token');
      localStorage.removeItem('cafecito_user');
      return;
    }
    navigate('/admin', { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#3d1f10] px-4">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="absolute w-2 h-2 bg-white rounded-full"
            style={{ left: `${(i * 17) % 100}%`, top: `${(i * 13) % 100}%` }} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-sm"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#c4846a] rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
            <TbCoffee className="text-white text-2xl" />
          </div>
          <h1 className="text-3xl font-bold text-[#f5ede6] font-['Playfair_Display']">Cafecito</h1>
          <div className="flex items-center justify-center gap-2 mt-2">
            <FiShield className="text-[#c4846a] text-sm" />
            <span className="text-[#c4a89a] text-sm">Admin Access Only</span>
          </div>
        </div>

        {/* Form card */}
        <div className="bg-[#2a1f1a] rounded-3xl shadow-2xl p-8 border border-[#3d2b22]">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#c4a89a] mb-2">Admin Email</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                required
                placeholder="admin@cafecito.com"
                className="w-full px-4 py-3 bg-[#3d2b22] border border-[#4d3830] rounded-2xl text-[#f5ede6] placeholder-[#7a5a4a] focus:outline-none focus:ring-2 focus:ring-[#c4846a]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#c4a89a] mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  required
                  placeholder="••••••••••"
                  className="w-full px-4 py-3 pr-12 bg-[#3d2b22] border border-[#4d3830] rounded-2xl text-[#f5ede6] placeholder-[#7a5a4a] focus:outline-none focus:ring-2 focus:ring-[#c4846a]"
                />
                <button type="button" onClick={() => setShowPwd(p => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7a5a4a] hover:text-[#c4846a] transition-colors">
                  {showPwd ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#c4846a] hover:bg-[#b87050] disabled:opacity-60 text-white rounded-2xl font-semibold shadow-lg flex items-center justify-center gap-2 transition-all mt-2"
            >
              {loading
                ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Signing in…</>
                : <><FiShield /> Access Admin Panel</>
              }
            </motion.button>
          </form>

          <p className="text-center text-xs text-[#5a4030] mt-6">
            This area is restricted to authorised personnel only.
          </p>
        </div>

        <p className="text-center mt-6">
          <a href="/" className="text-sm text-[#7a5a4a] hover:text-[#c4a89a] transition-colors">
            ← Back to website
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;
