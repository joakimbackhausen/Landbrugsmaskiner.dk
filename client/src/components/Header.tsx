import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Phone, Mail, Clock } from 'lucide-react';

const navLinks = [
  { label: 'Firmaprofil', href: '/firmaprofil' },
  { label: 'Maskiner', href: '/maskiner' },
  { label: 'Værksted', href: '/vaerksted' },
  { label: 'Leverandører', href: '/leverandoerer' },
  { label: 'Administration', href: '/administration' },
];

const contactLink = { label: 'Kontakt', href: '/kontakt' };

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
      <div className="bg-[#51af37] hidden lg:block">
        <div className="px-6 xl:px-10">
          <div className="flex items-center justify-between h-11 text-[14px]">
            <div className="flex items-center gap-7">
              <a href="tel:+4586379268" className="flex items-center gap-2 text-white hover:text-white/80 transition-colors">
                <Phone className="w-4 h-4" /> 86 37 92 68
              </a>
              <a href="mailto:lbb@landbrugsmaskiner.dk" className="flex items-center gap-2 text-white hover:text-white/80 transition-colors">
                <Mail className="w-4 h-4" /> lbb@landbrugsmaskiner.dk
              </a>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <Clock className="w-4 h-4" /> Man-Fre 06:00-16:00
            </div>
          </div>
        </div>
      </div>

      {/* ── Main header ── */}
      <header className="bg-white border-b border-gray-100">
        <div className="px-4 sm:px-6 xl:px-10">
          <div className="relative grid grid-cols-[1fr_auto_1fr] items-center h-[80px]">
            <Link href="/" className="flex items-center justify-self-start">
              <img src="/images/lm-logo.png" alt="Landbrugsmaskiner.dk" className="h-8 w-auto" />
            </Link>

            <nav className="hidden lg:flex items-center justify-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-4 xl:px-5 py-2.5 text-[15px] xl:text-[16px] font-medium rounded-lg transition-colors whitespace-nowrap ${
                    location === link.href || (link.href === '/maskiner' && location.startsWith('/maskiner'))
                      ? 'text-[#010174] bg-gray-100'
                      : 'text-[#1A1A1A] hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center justify-self-end gap-3">
              <Link
                href={contactLink.href}
                className={`hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-[15px] font-semibold transition-all ${
                  location === contactLink.href
                    ? 'bg-[#469e2f] text-white'
                    : 'bg-[#51af37] text-white hover:bg-[#469e2f]'
                }`}
              >
                {contactLink.label}
              </Link>

              <button
                className="lg:hidden p-2 text-gray-700"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? 'Luk menu' : 'Åbn menu'}
              >
                {mobileOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
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
              <Link
                href={contactLink.href}
                className="block mt-2 px-4 py-3 text-[17px] font-semibold text-center bg-[#51af37] text-white rounded-lg hover:bg-[#469e2f] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {contactLink.label}
              </Link>
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
