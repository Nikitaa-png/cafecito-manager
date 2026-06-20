import { Link } from 'react-router-dom';
import { TbCoffee } from 'react-icons/tb';
import { FiInstagram, FiFacebook, FiTwitter, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';

const Footer = () => (
  <footer className="bg-[#3d1f10] dark:bg-[#120a05] text-[#c4a89a] mt-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 bg-[#c4846a] rounded-2xl flex items-center justify-center">
              <TbCoffee className="text-white text-lg" />
            </div>
            <span className="text-xl font-bold text-[#f5ede6] font-['Playfair_Display']">Cafecito</span>
          </div>
          <p className="text-sm text-[#a07060] leading-relaxed mb-6">
            A cozy corner where every sip tells a story. Premium coffee, artisan pastries, warm vibes.
          </p>
          <div className="flex gap-3">
            {[FiInstagram, FiFacebook, FiTwitter].map((Icon, i) => (
              <a key={i} href="#"
                className="w-9 h-9 bg-[#5a2e1e] hover:bg-[#c4846a] rounded-xl flex items-center justify-center transition-colors">
                <Icon className="text-sm text-[#f5ede6]" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-[#f5ede6] font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {[['/', 'Home'], ['/menu', 'Menu'], ['/booking', 'Book a Table'], ['/contact', 'Contact']].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="text-sm text-[#a07060] hover:text-[#f5ede6] transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[#f5ede6] font-semibold mb-4">Opening Hours</h3>
          <ul className="space-y-2 text-sm text-[#a07060]">
            <li className="flex justify-between"><span>Mon – Fri</span><span>7am – 10pm</span></li>
            <li className="flex justify-between"><span>Saturday</span><span>8am – 11pm</span></li>
            <li className="flex justify-between"><span>Sunday</span><span>9am – 9pm</span></li>
          </ul>
        </div>

        <div>
          <h3 className="text-[#f5ede6] font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-3">
            {[
              [FiMapPin, '123 Coffee Lane, Brew City'],
              [FiPhone, '+1 (555) 123-4567'],
              [FiMail, 'hello@cafecito.com'],
            ].map(([Icon, text], i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-[#a07060]">
                <Icon className="mt-0.5 text-[#c4846a] flex-shrink-0" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-[#5a2e1e] mt-12 pt-8 text-center text-sm text-[#6b4030]">
        <p>© {new Date().getFullYear()} Cafecito Manager. Crafted with ☕ and warmth.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
