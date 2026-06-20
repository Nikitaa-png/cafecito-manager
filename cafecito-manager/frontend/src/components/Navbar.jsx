import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiUser, FiMenu, FiX, FiSun, FiMoon, FiLogOut, FiSettings } from 'react-icons/fi';
import { TbCoffee } from 'react-icons/tb';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/menu', label: 'Menu' },
  { to: '/booking', label: 'Book Table' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const { itemCount } = useCart();
  const { user, logout, isAdmin } = useAuth();
  const { dark, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const handleLogout = () => { logout(); setUserMenuOpen(false); navigate('/'); };

  return (
    <header className={`fixed top-0 w-full z-40 transition-all duration-300 ${
      scrolled
        ? 'bg-[#fdf6f0]/95 dark:bg-[#1a1008]/95 backdrop-blur-lg shadow-sm shadow-[#e8d8ce]'
        : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-[#6b3a2a] rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              <TbCoffee className="text-[#f5ede6] text-lg" />
            </div>
            <span className="text-xl font-bold text-[#3d1f10] dark:text-[#f5ede6] font-['Playfair_Display']">
              Cafecito
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label, end }) => (
              <NavLink key={to} to={to} end={end}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#6b3a2a] text-[#f5ede6]'
                      : 'text-[#8b5a44] dark:text-[#c4a89a] hover:bg-[#f0d9d0] dark:hover:bg-[#3d2b22] hover:text-[#6b3a2a] dark:hover:text-[#f5ede6]'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme}
              className="p-2 rounded-xl text-[#8b5a44] dark:text-[#c4a89a] hover:bg-[#f0d9d0] dark:hover:bg-[#3d2b22] transition-colors group relative"
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={dark ? 'Light mode' : 'Dark mode'}
            >
              {dark
                ? <FiSun className="text-lg text-[#c4846a]" />
                : <FiMoon className="text-lg text-[#6b3a2a]" />
              }
            </button>

            <Link to="/cart" className="relative p-2 rounded-xl text-[#8b5a44] dark:text-[#c4a89a] hover:bg-[#f0d9d0] dark:hover:bg-[#3d2b22] transition-colors">
              <FiShoppingCart className="text-lg" />
              {itemCount > 0 && (
                <motion.span key={itemCount} initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#c4846a] text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {itemCount > 9 ? '9+' : itemCount}
                </motion.span>
              )}
            </Link>

            {user ? (
              <div className="relative">
                <button onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#f0d9d0] dark:bg-[#3d2b22] text-[#6b3a2a] dark:text-[#f5ede6] text-sm font-medium hover:bg-[#e8c8bc] dark:hover:bg-[#4d3830] transition-all">
                  <FiUser className="text-base" />
                  <span className="hidden sm:block max-w-24 truncate">{user.name}</span>
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                      className="absolute right-0 top-12 w-48 bg-white dark:bg-[#2a1f1a] rounded-2xl shadow-2xl border border-[#e8d8ce] dark:border-[#3d2b22] overflow-hidden z-50">
                      <div className="p-3 border-b border-[#f0e4dc] dark:border-[#3d2b22]">
                        <p className="text-xs text-[#c4a89a]">Signed in as</p>
                        <p className="text-sm font-semibold text-[#3d1f10] dark:text-[#f5ede6] truncate">{user.email}</p>
                      </div>
                      <div className="p-1">
                        {isAdmin && (
                          <Link to="/admin" onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-[#6b3a2a] dark:text-[#c4846a] hover:bg-[#fdf6f0] dark:hover:bg-[#3d2b22] transition-colors">
                            <FiSettings className="text-xs" /> Admin Panel
                          </Link>
                        )}
                        <Link to="/my-orders" onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-[#8b5a44] dark:text-[#c4a89a] hover:bg-[#fdf6f0] dark:hover:bg-[#3d2b22] transition-colors">
                          <FiShoppingCart className="text-xs" /> My Orders
                        </Link>
                        <button onClick={handleLogout}
                          className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-sm text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors">
                          <FiLogOut className="text-xs" /> Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login"
                className="px-5 py-2 bg-[#6b3a2a] hover:bg-[#5a3020] text-[#f5ede6] rounded-full text-sm font-semibold transition-all shadow-md">
                Sign In
              </Link>
            )}

            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl text-[#8b5a44] hover:bg-[#f0d9d0] transition-colors">
              {mobileOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden border-t border-[#e8d8ce] dark:border-[#3d2b22] bg-[#fdf6f0]/98 dark:bg-[#1a1008]/98">
              <div className="py-3 space-y-1">
                {navLinks.map(({ to, label, end }) => (
                  <NavLink key={to} to={to} end={end} onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                        isActive ? 'bg-[#6b3a2a] text-[#f5ede6]' : 'text-[#8b5a44] dark:text-[#c4a89a]'
                      }`
                    }>
                    {label}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      {userMenuOpen && <div className="fixed inset-0 z-30" onClick={() => setUserMenuOpen(false)} />}
    </header>
  );
};

export default Navbar;
