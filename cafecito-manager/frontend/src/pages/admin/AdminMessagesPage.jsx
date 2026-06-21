import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiTrash2, FiRefreshCw, FiMail, FiCheck } from 'react-icons/fi';
import { messageAPI } from '../../services/api';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/LoadingSpinner';

const AdminMessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  const fetchMessages = () => {
    setLoading(true);
    messageAPI.getAll()
      .then(({ data }) => setMessages(data.messages))
      .catch(() => toast.error('Failed to load messages'))
      .finally(() => setLoading(false));
  };
  useEffect(fetchMessages, []);

  const handleExpand = async (msg) => {
    setExpanded(expanded === msg._id ? null : msg._id);
    // Mark as read when opened
    if (!msg.read) {
      try {
        await messageAPI.markRead(msg._id);
        setMessages(prev => prev.map(m => m._id === msg._id ? { ...m, read: true } : m));
      } catch { /* silent */ }
    }
  };

  const handleDelete = async id => {
    if (!confirm('Delete this message?')) return;
    try {
      await messageAPI.delete(id);
      setMessages(prev => prev.filter(m => m._id !== id));
      if (expanded === id) setExpanded(null);
      toast.success('Message deleted');
    } catch { toast.error('Failed to delete'); }
  };

  const unread = messages.filter(m => !m.read).length;

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#3d1f10] dark:text-[#f5ede6] font-['Playfair_Display']">
            Messages
          </h1>
          <p className="text-[#8b5a44] dark:text-[#c4a89a] text-sm mt-1">
            {messages.length} total
            {unread > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-[#6b3a2a] text-[#f5ede6] rounded-full text-xs font-bold">
                {unread} unread
              </span>
            )}
          </p>
        </div>
        <button onClick={fetchMessages}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#f0d9d0] dark:bg-[#3d2b22] text-[#6b3a2a] dark:text-[#c4846a] rounded-full font-medium hover:bg-[#e8c8bc] transition-colors border border-[#e8d8ce] dark:border-[#4d3830]">
          <FiRefreshCw className="text-sm" /> Refresh
        </button>
      </div>

      {messages.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-[#2a1f1a] rounded-3xl border border-[#e8d8ce] dark:border-[#3d2b22]">
          <div className="text-6xl mb-3">✉️</div>
          <p className="text-[#8b5a44] dark:text-[#c4a89a]">No messages yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg, i) => (
            <motion.div key={msg._id}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              className={`bg-white dark:bg-[#2a1f1a] rounded-2xl shadow-sm border transition-all ${
                msg.read
                  ? 'border-[#e8d8ce] dark:border-[#3d2b22]'
                  : 'border-[#c4846a] dark:border-[#c4846a] shadow-md shadow-[#c4846a]/10'
              }`}
            >
              {/* Header row */}
              <div
                className="flex items-center gap-4 px-5 py-4 cursor-pointer"
                onClick={() => handleExpand(msg)}
              >
                {/* Icon */}
                <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${
                  msg.read ? 'bg-[#f0e4dc] dark:bg-[#3d2b22]' : 'bg-[#6b3a2a]'
                }`}>
                  {msg.read
                    ? <FiCheck className="text-[#8b5a44] dark:text-[#c4a89a] text-sm" />
                    : <FiMail className="text-[#f5ede6] text-sm" />
                  }
                </div>

                {/* Sender info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={`font-semibold truncate ${msg.read ? 'text-[#8b5a44] dark:text-[#c4a89a]' : 'text-[#3d1f10] dark:text-[#f5ede6]'}`}>
                      {msg.name}
                    </p>
                    {!msg.read && (
                      <span className="flex-shrink-0 w-2 h-2 bg-[#c4846a] rounded-full" />
                    )}
                  </div>
                  <p className="text-xs text-[#c4a89a] truncate">{msg.email}</p>
                </div>

                {/* Subject + date */}
                <div className="hidden sm:block flex-1 min-w-0 text-right">
                  <p className="text-sm text-[#6b3a2a] dark:text-[#c4a89a] truncate">
                    {msg.subject || '(no subject)'}
                  </p>
                  <p className="text-xs text-[#c4a89a] mt-0.5">
                    {new Date(msg.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'short', year: 'numeric',
                      hour: '2-digit', minute: '2-digit'
                    })}
                  </p>
                </div>

                {/* Delete */}
                <button
                  onClick={e => { e.stopPropagation(); handleDelete(msg._id); }}
                  className="flex-shrink-0 p-2 text-[#c4a89a] hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-colors"
                >
                  <FiTrash2 className="text-sm" />
                </button>
              </div>

              {/* Expanded message body */}
              {expanded === msg._id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-5 pb-5"
                >
                  <div className="bg-[#fdf6f0] dark:bg-[#3d2b22] rounded-2xl p-4">
                    <p className="text-xs text-[#c4a89a] uppercase tracking-wider mb-2 font-semibold">Message</p>
                    <p className="text-[#3d1f10] dark:text-[#f5ede6] text-sm leading-relaxed whitespace-pre-wrap">
                      {msg.message}
                    </p>
                    <div className="mt-4 pt-3 border-t border-[#e8d8ce] dark:border-[#4d3830] flex items-center justify-between">
                      <a href={`mailto:${msg.email}?subject=Re: ${msg.subject || 'Your message'}`}
                        className="flex items-center gap-2 text-sm text-[#6b3a2a] dark:text-[#c4846a] hover:underline font-medium">
                        <FiMail className="text-xs" /> Reply to {msg.name}
                      </a>
                      <p className="text-xs text-[#c4a89a]">{msg.email}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMessagesPage;
