import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiCheck } from 'react-icons/fi';
import { menuAPI } from '../../services/api';
import { MENU_ITEMS, CATEGORY_COLORS } from '../../data/menuItems';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/LoadingSpinner';

const CATEGORIES = ['Coffee', 'Tea', 'Snacks', 'Desserts', 'Beverages'];
const EMPTY = { name: '', description: '', category: 'Coffee', price: '', image: '', available: true };

const MenuModal = ({ item, onClose, onSave }) => {
  const [form, setForm] = useState(item || EMPTY);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault(); setLoading(true);
    try {
      if (item?._id && !item._id.startsWith('local-')) {
        await menuAPI.update(item._id, { ...form, price: parseFloat(form.price) });
        toast.success('Updated');
      } else {
        await menuAPI.create({ ...form, price: parseFloat(form.price) });
        toast.success('Added');
      }
      onSave();
    } catch { toast.error('Failed — check backend connection'); }
    finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-[#3d1f10]/50 backdrop-blur-sm" />
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        onClick={e => e.stopPropagation()}
        className="relative bg-white dark:bg-[#2a1f1a] rounded-3xl shadow-2xl p-6 w-full max-w-lg z-10 border border-[#e8d8ce] dark:border-[#3d2b22]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#3d1f10] dark:text-[#f5ede6] font-['Playfair_Display']">{item ? 'Edit Item' : 'Add Menu Item'}</h2>
          <button onClick={onClose} className="text-[#c4a89a] hover:text-[#6b3a2a] transition-colors"><FiX className="text-xl" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-[#6b3a2a] dark:text-[#c4a89a] mb-1">Name *</label>
              <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required className="input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#6b3a2a] dark:text-[#c4a89a] mb-1">Category *</label>
              <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className="input">
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#6b3a2a] dark:text-[#c4a89a] mb-1">Price ($) *</label>
              <input type="number" step="0.01" min="0" value={form.price}
                onChange={e => setForm(p => ({ ...p, price: e.target.value }))} required className="input" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-[#6b3a2a] dark:text-[#c4a89a] mb-1">Image URL *</label>
              <input value={form.image} onChange={e => setForm(p => ({ ...p, image: e.target.value }))} required
                placeholder="https://images.unsplash.com/…" className="input" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-[#6b3a2a] dark:text-[#c4a89a] mb-1">Description *</label>
              <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} required rows={2} className="input resize-none" />
            </div>
            <div className="col-span-2 flex items-center gap-3">
              <input type="checkbox" id="avail" checked={form.available}
                onChange={e => setForm(p => ({ ...p, available: e.target.checked }))}
                className="w-4 h-4 cursor-pointer accent-[#6b3a2a]" />
              <label htmlFor="avail" className="text-sm text-[#6b3a2a] dark:text-[#c4a89a] cursor-pointer">Available for order</label>
            </div>
          </div>
          {form.image && <img src={form.image} alt="Preview" className="w-full h-32 object-cover rounded-2xl" onError={e => { e.target.style.display = 'none'; }} />}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-3 bg-[#f0d9d0] dark:bg-[#3d2b22] text-[#6b3a2a] dark:text-[#c4a89a] rounded-full font-medium hover:bg-[#e8c8bc] transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 py-3 bg-[#6b3a2a] hover:bg-[#5a3020] text-[#f5ede6] rounded-full font-semibold shadow-md flex items-center justify-center gap-2 transition-all">
              {loading ? <span className="w-4 h-4 border-2 border-[#f5ede6] border-t-transparent rounded-full animate-spin" /> : <FiCheck />}
              {item ? 'Update' : 'Add Item'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const AdminMenuPage = () => {
  const [dbItems, setDbItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);

  const fetchItems = () => {
    setLoading(true);
    menuAPI.getAll().then(({ data }) => setDbItems(data.items)).catch(() => setDbItems([])).finally(() => setLoading(false));
  };
  useEffect(fetchItems, []);

  const allItems = loading ? [] : [
    ...dbItems,
    ...MENU_ITEMS.filter(si => !dbItems.some(di => di.name === si.name)),
  ];

  const handleDelete = async id => {
    if (id.startsWith('local-')) { toast.error('Demo item — connect backend to delete'); return; }
    if (!confirm('Delete this item?')) return;
    try { await menuAPI.delete(id); toast.success('Deleted'); fetchItems(); }
    catch { toast.error('Failed to delete'); }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#3d1f10] dark:text-[#f5ede6] font-['Playfair_Display']">Menu Management</h1>
          <p className="text-[#8b5a44] dark:text-[#c4a89a] text-sm mt-1">{allItems.length} items total</p>
        </div>
        <button onClick={() => setModal('add')}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#6b3a2a] hover:bg-[#5a3020] text-[#f5ede6] rounded-full font-semibold shadow-md transition-all">
          <FiPlus /> Add Item
        </button>
      </div>

      <div className="bg-white dark:bg-[#2a1f1a] rounded-3xl shadow-sm overflow-hidden border border-[#e8d8ce] dark:border-[#3d2b22]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#fdf6f0] dark:bg-[#3d2b22]/30">
              <tr>
                {['Item','Category','Price','Available','Actions'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-[#c4a89a] uppercase tracking-wider px-6 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0e4dc] dark:divide-[#3d2b22]">
              {allItems.map(item => (
                <tr key={item._id} className="hover:bg-[#fdf6f0] dark:hover:bg-[#3d2b22]/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-2xl" />
                      <div>
                        <p className="font-medium text-[#3d1f10] dark:text-[#f5ede6]">{item.name}</p>
                        <p className="text-xs text-[#c4a89a] truncate max-w-40">{item.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`badge ${CATEGORY_COLORS[item.category] || 'bg-[#f0d9d0] text-[#6b3a2a]'}`}>{item.category}</span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-[#6b3a2a] dark:text-[#c4846a]">${item.price.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`badge ${item.available ? 'bg-[#d8e8d8] text-[#2d5a2d]' : 'bg-[#f5d0d8] text-[#7a2040]'}`}>
                      {item.available ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => setModal(item)} className="p-2 text-[#c4846a] hover:bg-[#f0d9d0] dark:hover:bg-[#3d2b22] rounded-xl transition-colors">
                        <FiEdit2 className="text-sm" />
                      </button>
                      <button onClick={() => handleDelete(item._id)} className="p-2 text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-colors">
                        <FiTrash2 className="text-sm" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {modal && <MenuModal item={modal === 'add' ? null : modal} onClose={() => setModal(null)} onSave={() => { setModal(null); fetchItems(); }} />}
      </AnimatePresence>
    </div>
  );
};

export default AdminMenuPage;
