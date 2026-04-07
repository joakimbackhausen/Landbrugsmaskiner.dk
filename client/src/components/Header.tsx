import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Phone, Mail, MapPin, Clock } from 'lucide-react';

const navLinks = [
  { label: 'Maskiner', href: '/maskiner' },
  { label: 'Værksted', href: '/' },
  { label: 'Leverandører', href: '/' },
  { label: 'Om os', href: '/om-os' },
  { label: 'Kontakt', href: '/kontakt' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const updateCSSVar = useCallback(() => {
    const h = wrapperRef.current?.getBoundingClientRect().height || 0;
    document.documentElement.style.setProperty('--header-h', `${Math.round(h)}px`);
  }, []);

  useEffect(() => {
    updateCSSVar();
    window.addEventListener('resize', updateCSSVar);
    if (document.fonts?.ready) {
      document.fonts.ready.then(updateCSSVar);
    }
    return () => window.removeEventListener('resize', updateCSSVar);
  }, [updateCSSVar]);

  return (
    <div ref={wrapperRef} className="fixed top-0 left-0 right-0 z-50">
      {/* ── Top bar ── */}
      <div className="bg-white hidden lg:block" style={{ borderBottom: '0.7px solid #e5e7eb' }}>
        <div className="px-6 xl:px-10">
          <div className="flex items-center justify-between h-11 text-[14px]">
            <div className="flex items-center gap-7">
              <a href="tel:+4586379268" className="flex items-center gap-2 text-[#1A1A1A] hover:text-[#51af37] transition-colors">
                <Phone className="w-4 h-4" /> +45 86 37 92 68
              </a>
              <a href="mailto:lbb@landbrugsmaskiner.dk" className="flex items-center gap-2 text-[#1A1A1A] hover:text-[#51af37] transition-colors">
                <Mail className="w-4 h-4" /> lbb@landbrugsmaskiner.dk
              </a>
              <span className="flex items-center gap-2 text-[#1A1A1A]/50">
                <MapPin className="w-4 h-4" /> Mørkevej 8, 8410 Thorsager
              </span>
            </div>
            <div className="flex items-center gap-2 text-[#1A1A1A]/50">
              <Clock className="w-4 h-4" /> Man-Fre 06:00-16:00
            </div>
          </div>
        </div>
      </div>

      {/* ── Main header ── */}
      <header className="bg-white">
        <div className="px-4 sm:px-6 xl:px-10">
          <div className="flex items-center justify-between h-[80px]">
            <Link href="/" className="flex items-center">
              <img src="/images/lm-logo.png" alt="Landbrugsmaskiner.dk" className="h-8 w-auto" />
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-5 py-2.5 text-[16px] font-medium rounded-lg transition-colors ${
                    location === link.href && link.href !== '/'
                      ? 'text-[#1A1A1A] bg-gray-100'
                      : 'text-[#1A1A1A] hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center">
              <Link href="/kontakt"
                className="text-[16px] font-semibold px-7 py-3.5 rounded-lg bg-[#51af37] text-white hover:bg-[#469e2f] transition-all">
                Kontakt os
              </Link>
            </div>

            <button
              className="lg:hidden p-2 text-gray-700"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
            <nav className="px-5 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link key={link.label} href={link.href}
                  className="block px-4 py-3 text-[17px] text-[#1A1A1A] hover:bg-gray-50 rounded-lg"
                  onClick={() => setMobileOpen(false)}>
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 mt-3 border-t border-gray-100 space-y-1">
                <a href="tel:+4586379268" className="block px-4 py-3 text-[16px] text-gray-500">
                  <Phone className="w-4 h-4 inline mr-2" />+45 86 37 92 68
                </a>
                <a href="mailto:lbb@landbrugsmaskiner.dk" className="block px-4 py-3 text-[16px] text-gray-500">
                  <Mail className="w-4 h-4 inline mr-2" />lbb@landbrugsmaskiner.dk
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
}
