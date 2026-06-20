import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiStar, FiClock, FiHeart, FiAward } from 'react-icons/fi';
import { MENU_ITEMS } from '../data/menuItems';
import MenuCard from '../components/MenuCard';
import MenuModal from '../components/MenuModal';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const testimonials = [
  { name: 'Sarah M.', rating: 5, text: 'The best espresso in town! The cozy atmosphere makes it the perfect work spot.' },
  { name: 'James K.', rating: 5, text: 'Amazing matcha latte and the croissants are incredibly fresh every morning.' },
  { name: 'Emily R.', rating: 5, text: 'Cafecito is my go-to for weekend brunch. The tiramisu is absolutely divine!' },
];

const features = [
  { icon: FiAward, title: 'Premium Quality', desc: 'Single-origin beans sourced from sustainable farms worldwide.' },
  { icon: FiHeart, title: 'Made with Love', desc: 'Every item crafted with care by our skilled baristas and chefs.' },
  { icon: FiClock, title: 'Always Fresh', desc: 'Freshly brewed and baked daily — never sitting on a shelf.' },
];

const featured = MENU_ITEMS.slice(0, 6);

const HomePage = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="overflow-x-hidden">

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#fdf6f0] dark:bg-[#1a1008]">
        {/* Soft background blob */}
        <div className="absolute right-0 top-0 w-1/2 h-full bg-[#f0d9d0] dark:bg-[#2a1512] rounded-l-[80px] hidden lg:block" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20 pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Text */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.7 }}>
              <span className="inline-block px-4 py-1.5 bg-[#f0d9d0] dark:bg-[#3d2b22] text-[#6b3a2a] dark:text-[#c4846a] rounded-full text-sm font-medium mb-6">
                ☕ Premium Café Experience
              </span>
              <h1 className="text-5xl sm:text-6xl font-bold text-[#3d1f10] dark:text-[#f5ede6] mb-6 leading-tight font-['Playfair_Display']">
                Sweet Moments<br />
                <span className="text-[#c4846a]">Start Here</span>
              </h1>
              <p className="text-lg text-[#8b5a44] dark:text-[#c4a89a] mb-10 max-w-lg leading-relaxed">
                Discover artisan coffee, freshly baked pastries, and a warm atmosphere that feels like home.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/menu"
                  className="flex items-center gap-2 px-8 py-4 bg-[#6b3a2a] hover:bg-[#5a3020] text-[#f5ede6] rounded-full font-semibold text-lg transition-all shadow-lg shadow-[#6b3a2a]/20 hover:-translate-y-0.5">
                  Explore Menu <FiArrowRight />
                </Link>
                <Link to="/booking"
                  className="flex items-center gap-2 px-8 py-4 border-2 border-[#6b3a2a] text-[#6b3a2a] dark:text-[#c4846a] dark:border-[#c4846a] rounded-full font-semibold text-lg transition-all hover:bg-[#6b3a2a] hover:text-[#f5ede6] dark:hover:bg-[#c4846a] dark:hover:text-white">
                  Book a Table
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mt-12">
                {[['500+', 'Happy Guests'], ['18+', 'Menu Items'], ['10+', 'Years Open']].map(([num, label]) => (
                  <div key={label}>
                    <p className="text-2xl font-bold text-[#6b3a2a] dark:text-[#c4846a] font-['Playfair_Display']">{num}</p>
                    <p className="text-sm text-[#8b5a44] dark:text-[#c4a89a]">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Image */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex justify-center lg:justify-end">
              <div className="relative w-80 h-80 sm:w-96 sm:h-96">
                <img
                  src="https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80"
                  alt="Cafe delights"
                  className="w-full h-full object-cover rounded-[40px] shadow-2xl shadow-[#6b3a2a]/20"
                />
                {/* Floating badge */}
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -bottom-6 -left-6 bg-white dark:bg-[#2a1f1a] rounded-2xl p-4 shadow-xl border border-[#e8d8ce] dark:border-[#3d2b22]">
                  <p className="text-xs text-[#8b5a44]">Today's Special</p>
                  <p className="font-bold text-[#3d1f10] dark:text-[#f5ede6] font-['Playfair_Display']">Tiramisu</p>
                  <p className="text-[#c4846a] font-semibold">$7.00</p>
                </motion.div>
                <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
                  className="absolute -top-6 -right-6 bg-[#6b3a2a] rounded-2xl p-4 shadow-xl text-center">
                  <p className="text-2xl font-bold text-[#f5ede6] font-['Playfair_Display']">4.9</p>
                  <div className="flex gap-0.5 justify-center">
                    {[...Array(5)].map((_, i) => <FiStar key={i} className="text-[#f5c842] fill-[#f5c842] text-xs" />)}
                  </div>
                  <p className="text-[#c4a89a] text-xs mt-0.5">Rating</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20 bg-white dark:bg-[#1a1008]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="text-center p-8 rounded-3xl bg-[#fdf6f0] dark:bg-[#2a1f1a] border border-[#e8d8ce] dark:border-[#3d2b22] hover:shadow-lg hover:shadow-[#c4846a]/10 transition-shadow"
              >
                <div className="w-14 h-14 bg-[#6b3a2a] rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-md">
                  <Icon className="text-[#f5ede6] text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-[#3d1f10] dark:text-[#f5ede6] mb-2 font-['Playfair_Display']">{title}</h3>
                <p className="text-[#8b5a44] dark:text-[#c4a89a] leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Menu ── */}
      <section className="py-20 bg-[#fdf6f0] dark:bg-[#120a05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-[#c4846a] font-semibold text-sm uppercase tracking-widest">Our Menu</span>
            <h2 className="text-4xl font-bold text-[#3d1f10] dark:text-[#f5ede6] mt-2 font-['Playfair_Display']">Hold a Cake</h2>
            <p className="text-[#8b5a44] dark:text-[#c4a89a] mt-3 max-w-xl mx-auto">Space out to each dessert profing.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((item, i) => (
              <motion.div key={item._id}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <MenuCard item={item} onView={setSelectedItem} />
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/menu"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#6b3a2a] hover:bg-[#5a3020] text-[#f5ede6] rounded-full font-semibold transition-all shadow-lg shadow-[#6b3a2a]/20 hover:-translate-y-0.5">
              View Full Menu <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ── About / Service Coffee section ── */}
      <section className="py-20 bg-[#f0d9d0] dark:bg-[#2a1512]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80"
                alt="Servicor Coffee" className="rounded-[40px] shadow-2xl w-full object-cover h-96" />
              <div className="absolute -bottom-6 -right-6 w-36 h-36 bg-[#6b3a2a] rounded-3xl flex flex-col items-center justify-center text-[#f5ede6] shadow-xl">
                <span className="text-4xl font-bold font-['Playfair_Display']">10+</span>
                <span className="text-xs opacity-80">Years of Craft</span>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-[#c4846a] font-semibold text-sm uppercase tracking-widest">About Us</span>
              <h2 className="text-4xl font-bold text-[#3d1f10] dark:text-[#f5ede6] mt-2 mb-6 font-['Playfair_Display']">
                Servicor Coffee
              </h2>
              <p className="text-[#8b5a44] dark:text-[#c4a89a] leading-relaxed mb-4">
                Malled mistress in average appointments Hardinem a neccalled, julie mar herrings to timercoul.
              </p>
              <p className="text-[#8b5a44] dark:text-[#c4a89a] leading-relaxed mb-8">
                Founded in 2014, Cafecito was born from a deep love for artisan coffee and community. We serve hundreds of coffee lovers daily in our cozy space.
              </p>
              <Link to="/contact"
                className="inline-flex items-center gap-2 w-12 h-12 bg-[#6b3a2a] hover:bg-[#5a3020] text-[#f5ede6] rounded-full font-semibold transition-all shadow-lg justify-center">
                <FiArrowRight />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 bg-white dark:bg-[#1a1008]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-[#c4846a] font-semibold text-sm uppercase tracking-widest">Testimonials</span>
            <h2 className="text-4xl font-bold text-[#3d1f10] dark:text-[#f5ede6] mt-2 font-['Playfair_Display']">What Our Guests Say</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map(({ name, rating, text }, i) => (
              <motion.div key={name}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="bg-[#fdf6f0] dark:bg-[#2a1f1a] p-8 rounded-3xl border border-[#e8d8ce] dark:border-[#3d2b22] hover:shadow-lg hover:shadow-[#c4846a]/10 transition-shadow"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(rating)].map((_, j) => <FiStar key={j} className="text-[#f5c842] fill-[#f5c842]" />)}
                </div>
                <p className="text-[#8b5a44] dark:text-[#c4a89a] italic leading-relaxed mb-6">"{text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#6b3a2a] rounded-full flex items-center justify-center text-[#f5ede6] font-bold text-sm">
                    {name[0]}
                  </div>
                  <span className="font-semibold text-[#3d1f10] dark:text-[#f5ede6]">{name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-[#6b3a2a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="absolute w-2 h-2 bg-[#f5ede6] rounded-full"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }} />
          ))}
        </div>
        <div className="relative max-w-4xl mx-auto text-center px-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#f5ede6] mb-6 font-['Playfair_Display']">
              Ready for Your<br />Coffee Experience?
            </h2>
            <p className="text-[#c4a89a] text-lg mb-10">Book a table or order online — we can't wait to serve you.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/booking"
                className="px-8 py-4 bg-[#f5ede6] text-[#6b3a2a] hover:bg-white rounded-full font-semibold text-lg transition-all shadow-xl hover:-translate-y-0.5">
                Book a Table
              </Link>
              <Link to="/menu"
                className="px-8 py-4 border-2 border-[#f5ede6]/50 text-[#f5ede6] hover:bg-[#f5ede6]/10 rounded-full font-semibold text-lg transition-all hover:-translate-y-0.5">
                Order Now
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {selectedItem && <MenuModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
    </div>
  );
};

export default HomePage;
