import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FiHome, FiShoppingBag, FiBook, FiUsers, FiList, FiLogOut, FiMenu, FiSun, FiMoon, FiMessageSquare } from 'react-icons/fi';
import { TbCoffee } from 'react-icons/tb';
import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { messageAPI } from '../services/api';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: FiHome, end: true },
  { to: '/admin/menu', label: 'Menu', icon: FiList },
  { to: '/admin/orders', label: 'Orders', icon: FiShoppingBag },
  { to: '/admin/bookings', label: 'Bookings', icon: FiBook },
  { to: '/admin/messages', label: 'Messages', icon: FiMessageSquare },
  { to: '/admin/users', label: 'Users', icon: FiUsers },
];

const AdminLayout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { dark, toggleTheme } = useTheme();
  const [unreadCount, setUnreadCount] = useState(0);
  const handleLogout = () => { logout(); navigate('/'); };

  // Poll unread messages count every 30s
  useEffect(() => {
    const fetchUnread = () => {
      messageAPI.getAll()
        .then(({ data }) => setUnreadCount(data.messages.filter(m => !m.read).length))
        .catch(() => {});
    };
    fetchUnread();
    const interval = setInterval(fetchUnread, 30000);
    return () => clearInterval(interval);
  }, []);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-[#e8d8ce] dark:border-[#3d2b22]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#6b3a2a] rounded-2xl flex items-center justify-center shadow-md">
            <TbCoffee className="text-[#f5ede6] text-xl" />
          </div>
          <div>
            <p className="font-bold text-[#3d1f10] dark:text-[#f5ede6] font-['Playfair_Display']">Cafecito</p>
            <p className="text-xs text-[#c4846a]">Admin Panel</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-[#6b3a2a] text-[#f5ede6] shadow-md'
                  : 'text-[#8b5a44] dark:text-[#c4a89a] hover:bg-[#f0d9d0] dark:hover:bg-[#3d2b22] hover:text-[#6b3a2a] dark:hover:text-[#f5ede6]'
              }`
            }
          >
            <Icon className="text-lg flex-shrink-0" />
            <span className="flex-1">{label}</span>
            {/* Unread badge on Messages */}
            {label === 'Messages' && unreadCount > 0 && (
              <span className="w-5 h-5 bg-[#c4846a] text-white text-xs rounded-full flex items-center justify-center font-bold">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-[#e8d8ce] dark:border-[#3d2b22]">
        <div className="px-4 py-2 mb-2 bg-[#fdf6f0] dark:bg-[#2a1f1a] rounded-2xl">
          <p className="text-xs text-[#c4a89a]">Logged in as</p>
          <p className="text-sm font-semibold text-[#3d1f10] dark:text-[#f5ede6] truncate">{user?.name}</p>
        </div>
        <button onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-sm font-medium text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors">
          <FiLogOut /> Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fdf6f0] dark:bg-[#1a1008] flex transition-colors duration-300">
      <aside className="hidden lg:flex lg:flex-col w-64 bg-white dark:bg-[#2a1f1a] shadow-lg border-r border-[#e8d8ce] dark:border-[#3d2b22] flex-shrink-0">
        <SidebarContent />
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-[#3d1f10]/40 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <motion.aside initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
            className="relative w-64 h-full bg-white dark:bg-[#2a1f1a] shadow-2xl">
            <SidebarContent />
          </motion.aside>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white/80 dark:bg-[#2a1f1a]/80 backdrop-blur-md border-b border-[#e8d8ce] dark:border-[#3d2b22] px-6 py-4 flex items-center justify-between">
          <button className="lg:hidden text-[#8b5a44]" onClick={() => setSidebarOpen(true)}>
            <FiMenu className="text-2xl" />
          </button>
          <h1 className="text-lg font-semibold text-[#3d1f10] dark:text-[#f5ede6] lg:ml-0 ml-4 font-['Playfair_Display']">
            Admin Dashboard
          </h1>
          <button onClick={toggleTheme}
            className="p-2 rounded-xl bg-[#fdf6f0] dark:bg-[#3d2b22] text-[#8b5a44] dark:text-[#c4a89a] hover:bg-[#f0d9d0] dark:hover:bg-[#4d3830] transition-colors"
            title={dark ? 'Light mode' : 'Dark mode'}>
            {dark ? <FiSun className="text-[#c4846a]" /> : <FiMoon className="text-[#6b3a2a]" />}
          </button>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
