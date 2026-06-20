import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiTrash2, FiRefreshCw, FiShield, FiUser, FiUserCheck } from 'react-icons/fi';
import { authAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/LoadingSpinner';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user: currentUser } = useAuth();

  const fetchUsers = () => {
    setLoading(true);
    authAPI.getUsers()
      .then(({ data }) => setUsers(data.users))
      .catch(() => toast.error('Failed to load users'))
      .finally(() => setLoading(false));
  };
  useEffect(fetchUsers, []);

  const handleDelete = async id => {
    if (id === currentUser._id) { toast.error("You can't delete your own account"); return; }
    if (!confirm('Delete this user?')) return;
    try {
      await authAPI.deleteUser(id);
      setUsers(prev => prev.filter(u => u._id !== id));
      toast.success('User deleted');
    } catch { toast.error('Failed to delete user'); }
  };

  const handleRoleToggle = async (user) => {
    if (user._id === currentUser._id) { toast.error("You can't change your own role"); return; }
    const newRole = user.role === 'admin' ? 'customer' : 'admin';
    const label = newRole === 'admin' ? 'promote to admin' : 'demote to customer';
    if (!confirm(`${label.charAt(0).toUpperCase() + label.slice(1)} "${user.name}"?`)) return;
    try {
      await authAPI.updateUserRole(user._id, newRole);
      setUsers(prev => prev.map(u => u._id === user._id ? { ...u, role: newRole } : u));
      toast.success(`User ${label}d`);
    } catch { toast.error('Failed to update role'); }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#3d1f10] dark:text-[#f5ede6] font-['Playfair_Display']">Users</h1>
          <p className="text-[#8b5a44] dark:text-[#c4a89a] text-sm mt-1">{users.length} registered users</p>
        </div>
        <button onClick={fetchUsers}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#f0d9d0] dark:bg-[#3d2b22] text-[#6b3a2a] dark:text-[#c4846a] rounded-full font-medium hover:bg-[#e8c8bc] transition-colors border border-[#e8d8ce] dark:border-[#4d3830]">
          <FiRefreshCw className="text-sm" /> Refresh
        </button>
      </div>

      <div className="bg-white dark:bg-[#2a1f1a] rounded-3xl shadow-sm overflow-hidden border border-[#e8d8ce] dark:border-[#3d2b22]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#fdf6f0] dark:bg-[#3d2b22]/30">
              <tr>
                {['User', 'Email', 'Role', 'Joined', 'Actions'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-[#c4a89a] uppercase tracking-wider px-6 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0e4dc] dark:divide-[#3d2b22]">
              {users.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-12 text-[#c4a89a]">No users yet</td></tr>
              ) : users.map((u, i) => (
                <motion.tr key={u._id}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                  className="hover:bg-[#fdf6f0] dark:hover:bg-[#3d2b22]/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-[#6b3a2a] rounded-full flex items-center justify-center text-[#f5ede6] font-bold text-sm flex-shrink-0">
                        {u.name?.[0]?.toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-[#3d1f10] dark:text-[#f5ede6]">{u.name}</p>
                        {u._id === currentUser._id && (
                          <p className="text-xs text-[#c4846a]">You</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#8b5a44] dark:text-[#c4a89a]">{u.email}</td>
                  <td className="px-6 py-4">
                    <span className={`badge inline-flex items-center gap-1.5 ${
                      u.role === 'admin'
                        ? 'bg-[#f0d9d0] text-[#6b3a2a] dark:bg-[#4d2810] dark:text-[#c4846a]'
                        : 'bg-[#e8e0d8] text-[#5a4a3a] dark:bg-[#3d2b22] dark:text-[#c4a89a]'
                    }`}>
                      {u.role === 'admin' ? <FiShield className="text-xs" /> : <FiUser className="text-xs" />}
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#8b5a44] dark:text-[#c4a89a]">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      {/* Promote / Demote */}
                      <button
                        onClick={() => handleRoleToggle(u)}
                        disabled={u._id === currentUser._id}
                        title={u.role === 'admin' ? 'Demote to customer' : 'Promote to admin'}
                        className="p-2 text-[#c4846a] hover:bg-[#f0d9d0] dark:hover:bg-[#3d2b22] rounded-xl transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <FiUserCheck className="text-sm" />
                      </button>
                      {/* Delete */}
                      <button onClick={() => handleDelete(u._id)} disabled={u._id === currentUser._id}
                        className="p-2 text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
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

export default AdminUsersPage;
