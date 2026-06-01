import { Link } from 'wouter';
import { Phone, Mail, MapPin, ArrowRight, Clock } from 'lucide-react';

const openingHours = [
  { day: 'Mandag – Fredag', hours: '06:00 – 16:00' },
  { day: 'Lørdag og søndag', hours: 'Ring for aftale' },
];

const navLinks = [
  { label: 'Firmaprofil', href: '/firmaprofil' },
  { label: 'Maskiner', href: '/maskiner' },
  { label: 'Værksted', href: '/vaerksted' },
  { label: 'Leverandører', href: '/leverandoerer' },
  { label: 'Administration', href: '/administration' },
  { label: 'Kontakt', href: '/kontakt' },
];

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-gray-400 border-t-2 border-black/10">
      <div className="max-w-[1260px] mx-auto px-5 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link
              href="/"
              className="inline-block mb-4 font-display font-bold text-white text-[15px] sm:text-[16px] tracking-[0.06em] uppercase hover:text-white/90 transition-colors"
            >
              Landbrugsmaskiner.dk
            </Link>
            <p className="text-[14px] leading-relaxed text-gray-500 mb-4">
              Vi lægger stor vægt på at have et stort og opdateret reservedelslager, så vi kan tilbyde hurtig reparation ved driftsstop.
            </p>
            <p className="text-[14px] leading-relaxed text-gray-500">
              Firmaet er velkonsolideret og vi holder omkostningerne nede til gavn for vores kunder.
            </p>
          </div>

          <div>
            <h4 className="text-[14px] font-semibold text-gray-300 uppercase tracking-wider mb-4">Navigation</h4>
            <div className="space-y-3">
              {navLinks.map((l) => (
                <Link key={l.label} href={l.href} className="block text-[15px] text-gray-500 hover:text-white transition-colors">{l.label}</Link>
              ))}
            </div>
            <div className="mt-6 space-y-2 text-[14px]">
              <a href="https://www.facebook.com/landbrugsmaskiner" target="_blank" rel="noopener noreferrer" className="block text-gray-500 hover:text-white transition-colors">Find os på Facebook</a>
              <a href="https://www.kramp.com/shop-dk/da" target="_blank" rel="noopener noreferrer" className="block text-gray-500 hover:text-white transition-colors">KRAMP Webshop</a>
              <a href="https://www.maykers.com/da-dk/shop/birkballe-og-nicholaisen-a-s/products" target="_blank" rel="noopener noreferrer" className="block text-gray-500 hover:text-white transition-colors">Maykers Webshop</a>
            </div>
          </div>

          <div>
            <h4 className="text-[14px] font-semibold text-gray-300 uppercase tracking-wider mb-4">Information</h4>
            <div className="space-y-3 text-[15px]">
              <a href="tel:+4586379268" className="flex items-center gap-2 text-[#51af37] font-medium hover:text-[#34D399] transition-colors">
                <Phone className="w-4 h-4" /> Tlf: 86 37 92 68
              </a>
              <p className="text-gray-500 text-[14px]">Fax: 86 37 93 33</p>
              <a href="mailto:lbb@landbrugsmaskiner.dk" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-4 h-4" /> lbb@landbrugsmaskiner.dk
              </a>
              <a href="mailto:mn@landbrugsmaskiner.dk" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-4 h-4" /> mn@landbrugsmaskiner.dk
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Mørkevej 8<br />8410 Thorsager</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-[14px] font-semibold text-gray-300 uppercase tracking-wider mb-4">Åbningstider</h4>
            <div className="space-y-3">
              {openingHours.map((row) => (
                <div key={row.day} className="flex items-start gap-2 text-[14px]">
                  <Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-500" />
                  <div>
                    <p className="text-gray-400">{row.day}</p>
                    <p className="text-gray-500">{row.hours}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/maskiner"
              className="inline-flex items-center gap-2 mt-8 bg-[#51af37] text-white text-[14px] font-semibold px-6 py-3 rounded-lg hover:bg-[#469e2f] transition-all"
            >
              Se maskiner <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-[1260px] mx-auto px-5 sm:px-6 py-4">
          <p className="text-[13px] text-gray-600">&copy; {new Date().getFullYear()} Birkballe & Nicholaisen ApS</p>
        </div>
      </div>
    </footer>
  );
}
