import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { TbCoffee } from 'react-icons/tb';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [errors, setErrors] = useState({});
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email) errs.email = 'Email is required';
    if (form.password.length < 6) errs.password = 'Min. 6 characters';
    if (form.password !== form.confirm) errs.confirm = 'Passwords do not match';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;
    const { success } = await register(form.name, form.email, form.password);
    if (success) navigate('/');
  };

  const inputCls = field => `input ${errors[field] ? 'border-rose-400 focus:ring-rose-400' : ''}`;

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1200&q=80" alt="Coffee" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#3d1f10]/70" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-12">
          <div className="w-16 h-16 bg-[#c4846a] rounded-3xl flex items-center justify-center mb-6">
            <TbCoffee className="text-white text-2xl" />
          </div>
          <h2 className="text-4xl font-bold text-[#f5ede6] font-['Playfair_Display'] mb-4">Join Cafecito</h2>
          <p className="text-[#c4a89a] text-lg max-w-sm">Create your account and start enjoying the best café experience in town.</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12 bg-[#fdf6f0] dark:bg-[#1a1008]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 justify-center mb-8">
            <div className="w-10 h-10 bg-[#6b3a2a] rounded-2xl flex items-center justify-center">
              <TbCoffee className="text-[#f5ede6]" />
            </div>
            <span className="text-2xl font-bold text-[#3d1f10] dark:text-[#f5ede6] font-['Playfair_Display']">Cafecito</span>
          </div>

          <div className="bg-white dark:bg-[#2a1f1a] rounded-3xl shadow-2xl p-8 border border-[#e8d8ce] dark:border-[#3d2b22]">
            <h1 className="text-2xl font-bold text-[#3d1f10] dark:text-[#f5ede6] font-['Playfair_Display'] mb-1">Create Account</h1>
            <p className="text-[#8b5a44] dark:text-[#c4a89a] text-sm mb-8">
              Already have an account? <Link to="/login" className="text-[#6b3a2a] dark:text-[#c4846a] font-semibold hover:underline">Sign in</Link>
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { key: 'name', label: 'Full Name', icon: FiUser, type: 'text', placeholder: 'Your full name' },
                { key: 'email', label: 'Email', icon: FiMail, type: 'email', placeholder: 'your@email.com' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-sm font-medium text-[#6b3a2a] dark:text-[#c4a89a] mb-2">{f.label}</label>
                  <div className="relative">
                    <f.icon className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c4a89a]" />
                    <input type={f.type} className={`${inputCls(f.key)} pl-11`}
                      value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                      placeholder={f.placeholder} />
                  </div>
                  {errors[f.key] && <p className="text-rose-400 text-xs mt-1">{errors[f.key]}</p>}
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-[#6b3a2a] dark:text-[#c4a89a] mb-2">Password</label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c4a89a]" />
                  <input type={showPwd ? 'text' : 'password'} className={`${inputCls('password')} pl-11 pr-12`}
                    value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} placeholder="Min. 6 characters" />
                  <button type="button" onClick={() => setShowPwd(p => !p)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#c4a89a] hover:text-[#6b3a2a]">
                    {showPwd ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {errors.password && <p className="text-rose-400 text-xs mt-1">{errors.password}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-[#6b3a2a] dark:text-[#c4a89a] mb-2">Confirm Password</label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c4a89a]" />
                  <input type="password" className={`${inputCls('confirm')} pl-11`}
                    value={form.confirm} onChange={e => setForm(p => ({ ...p, confirm: e.target.value }))} placeholder="Repeat password" />
                </div>
                {errors.confirm && <p className="text-rose-400 text-xs mt-1">{errors.confirm}</p>}
              </div>
              <motion.button whileTap={{ scale: 0.98 }} type="submit" disabled={loading}
                className="w-full py-4 bg-[#6b3a2a] hover:bg-[#5a3020] disabled:opacity-60 text-[#f5ede6] rounded-full font-semibold shadow-lg flex items-center justify-center gap-2 transition-all">
                {loading ? <><span className="w-4 h-4 border-2 border-[#f5ede6] border-t-transparent rounded-full animate-spin" />Creating…</> : 'Create Account'}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
