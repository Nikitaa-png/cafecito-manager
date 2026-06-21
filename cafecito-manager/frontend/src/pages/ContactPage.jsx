import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiClock, FiInstagram, FiFacebook, FiTwitter, FiSend } from 'react-icons/fi';
import toast from 'react-hot-toast';

import { messageAPI } from '../services/api';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await messageAPI.send(form);
      toast.success("Message sent! We'll get back to you soon ☕");
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-16 pb-20">
      <div className="relative py-20 px-4 text-center overflow-hidden bg-[#3d1f10]">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920" alt="" className="w-full h-full object-cover" />
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative">
          <span className="text-[#c4846a] font-semibold text-sm uppercase tracking-widest">Get in Touch</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#f5ede6] mt-2 font-['Playfair_Display']">Contact Us</h1>
          <p className="text-[#c4a89a] mt-3">We'd love to hear from you — drop us a message anytime!</p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <h2 className="text-2xl font-bold text-[#3d1f10] dark:text-[#f5ede6] font-['Playfair_Display'] mb-8">Visit Us</h2>
            <div className="space-y-6">
              {[
                [FiMapPin, 'Address', '123 Coffee Lane, Brew City, BC 10001'],
                [FiPhone, 'Phone', '+1 (555) 123-4567'],
                [FiMail, 'Email', 'hello@cafecito.com'],
                [FiClock, 'Hours', 'Mon–Fri: 7am–10pm\nSat: 8am–11pm\nSun: 9am–9pm'],
              ].map(([Icon, label, value]) => (
                <div key={label} className="flex gap-4">
                  <div className="w-12 h-12 bg-[#6b3a2a] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <Icon className="text-[#f5ede6]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#c4a89a] uppercase tracking-wider">{label}</p>
                    <p className="text-[#3d1f10] dark:text-[#f5ede6] mt-0.5 whitespace-pre-line text-sm leading-relaxed">{value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <p className="text-xs font-semibold text-[#c4a89a] uppercase tracking-wider mb-4">Follow Us</p>
              <div className="flex gap-3">
                {[FiInstagram, FiFacebook, FiTwitter].map((Icon, i) => (
                  <a key={i} href="#"
                    className="w-11 h-11 bg-[#f0d9d0] dark:bg-[#3d2b22] hover:bg-[#6b3a2a] rounded-2xl flex items-center justify-center text-[#6b3a2a] dark:text-[#c4846a] hover:text-[#f5ede6] transition-all border border-[#e8d8ce] dark:border-[#3d2b22]">
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <form onSubmit={handleSubmit}
              className="bg-white dark:bg-[#2a1f1a] rounded-3xl shadow-xl p-8 border border-[#e8d8ce] dark:border-[#3d2b22]">
              <h2 className="text-2xl font-bold text-[#3d1f10] dark:text-[#f5ede6] font-['Playfair_Display'] mb-6">Send a Message</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#6b3a2a] dark:text-[#c4a89a] mb-2">Name *</label>
                    <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required className="input" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#6b3a2a] dark:text-[#c4a89a] mb-2">Email *</label>
                    <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required className="input" placeholder="your@email.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#6b3a2a] dark:text-[#c4a89a] mb-2">Subject</label>
                  <input value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))} className="input" placeholder="How can we help?" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#6b3a2a] dark:text-[#c4a89a] mb-2">Message *</label>
                  <textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} required rows={5}
                    className="input resize-none" placeholder="Tell us how we can help…" />
                </div>
              </div>
              <motion.button whileTap={{ scale: 0.98 }} type="submit" disabled={loading}
                className="mt-6 w-full py-4 bg-[#6b3a2a] hover:bg-[#5a3020] disabled:opacity-60 text-[#f5ede6] rounded-full font-semibold shadow-lg flex items-center justify-center gap-2 transition-all">
                {loading
                  ? <><span className="w-4 h-4 border-2 border-[#f5ede6] border-t-transparent rounded-full animate-spin" />Sending…</>
                  : <><FiSend />Send Message</>}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
