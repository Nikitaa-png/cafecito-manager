import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { TbCoffee } from 'react-icons/tb';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPwd, setShowPwd] = useState(false);
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async e => {
    e.preventDefault();
    const { success, user } = await login(form.email, form.password);
    if (success) navigate(user?.role === 'admin' ? '/admin' : from, { replace: true });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left visual */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1200&q=80"
          alt="Coffee" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#3d1f10]/70" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-12">
          <div className="w-16 h-16 bg-[#c4846a] rounded-3xl flex items-center justify-center mb-6 shadow-2xl">
            <TbCoffee className="text-white text-2xl" />
          </div>
          <h2 className="text-4xl font-bold text-[#f5ede6] font-['Playfair_Display'] mb-4">Welcome Back</h2>
          <p className="text-[#c4a89a] text-lg max-w-sm">Your perfect cup is waiting. Sign in to manage your orders and bookings.</p>
        </div>
      </div>

      {/* Form side */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 bg-[#fdf6f0] dark:bg-[#1a1008]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">

          <div className="lg:hidden flex items-center gap-2 justify-center mb-8">
            <div className="w-10 h-10 bg-[#6b3a2a] rounded-2xl flex items-center justify-center">
              <TbCoffee className="text-[#f5ede6]" />
            </div>
            <span className="text-2xl font-bold text-[#3d1f10] dark:text-[#f5ede6] font-['Playfair_Display']">Cafecito</span>
          </div>

          <div className="bg-white dark:bg-[#2a1f1a] rounded-3xl shadow-2xl p-8 border border-[#e8d8ce] dark:border-[#3d2b22]">
            <h1 className="text-2xl font-bold text-[#3d1f10] dark:text-[#f5ede6] font-['Playfair_Display'] mb-1">Sign In</h1>
            <p className="text-[#8b5a44] dark:text-[#c4a89a] text-sm mb-8">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#6b3a2a] dark:text-[#c4846a] font-semibold hover:underline">Sign up</Link>
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[#6b3a2a] dark:text-[#c4a89a] mb-2">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-[#dcc8bc] dark:border-[#3d2b22] rounded-2xl bg-white dark:bg-[#2a1f1a] text-[#3d1f10] dark:text-[#f5ede6] placeholder-[#b8998a] dark:placeholder-[#7a5a4a] focus:outline-none focus:ring-2 focus:ring-[#c4846a] transition-shadow"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#6b3a2a] dark:text-[#c4a89a] mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPwd ? 'text' : 'password'}
                    value={form.password}
                    onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                    required
                    placeholder="••••••••"
                    className="w-full px-4 py-3 pr-12 border border-[#dcc8bc] dark:border-[#3d2b22] rounded-2xl bg-white dark:bg-[#2a1f1a] text-[#3d1f10] dark:text-[#f5ede6] placeholder-[#b8998a] dark:placeholder-[#7a5a4a] focus:outline-none focus:ring-2 focus:ring-[#c4846a] transition-shadow"
                  />
                  <button type="button" onClick={() => setShowPwd(p => !p)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#c4a89a] hover:text-[#6b3a2a] dark:hover:text-[#c4846a] transition-colors">
                    {showPwd ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <motion.button whileTap={{ scale: 0.98 }} type="submit" disabled={loading}
                className="w-full py-4 bg-[#6b3a2a] hover:bg-[#5a3020] disabled:opacity-60 text-[#f5ede6] rounded-full font-semibold shadow-lg flex items-center justify-center gap-2 transition-all">
                {loading
                  ? <><span className="w-4 h-4 border-2 border-[#f5ede6] border-t-transparent rounded-full animate-spin" />Signing in…</>
                  : 'Sign In'}
              </motion.button>
            </form>

            <p className="text-center text-xs text-[#c4a89a] mt-6">
              Admin?{' '}
              <Link to="/admin/login" className="text-[#6b3a2a] dark:text-[#c4846a] hover:underline font-medium">
                Go to Admin Login
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
