import { useState, useEffect, useRef } from 'react';
import { Link } from 'wouter';
import {
  Loader2, ArrowRight, Phone, ChevronRight, ArrowUpRight,
  ExternalLink, Facebook, ShoppingBag,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SmartImage from '@/components/SmartImage';
import ContactForm from '@/components/ContactForm';
import { usePageSeo } from '@/hooks/usePageMeta';
import { homeGraphSchema, pageKeywords } from '@shared/seo';
import { machineSlug } from '@/lib/machineSlug';

interface Machine {
  id: number;
  title: string;
  brand: string;
  price: string;
  url: string;
  pictures: { url: string; date: string }[];
}

function formatPrice(price: string): string {
  const num = parseInt(price, 10);
  if (isNaN(num) || num === 0) return 'Ring for pris';
  return num.toLocaleString('da-DK') + ' kr';
}

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${v ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const siteSections = [
  { title: 'Se vores firmaprofil', desc: 'Mere end 50 års erfaring', href: '/firmaprofil', image: '/images/hero.jpg' },
  { title: 'Maskiner', desc: 'Nye og brugte landbrugsmaskiner', href: '/maskiner', image: '/images/minigraver.jpg' },
  { title: 'Værksted', desc: 'Reparation og service', href: '/vaerksted', image: '/images/vaerksted.jpg' },
  { title: 'Kontakt', desc: 'Ring eller skriv til os', href: '/kontakt', image: '/images/hero2.jpg' },
  { title: 'Leverandører', desc: 'Deutz-Fahr, Maschio, Pottinger m.fl.', href: '/leverandoerer', image: '/images/leverandoerer.jpg' },
];

const webshopLinks = [
  {
    title: 'Se vores Maykers Webshop',
    href: 'https://www.maykers.com/da-dk/shop/birkballe-og-nicholaisen-a-s/products',
    icon: ShoppingBag,
  },
  {
    title: 'KRAMP - Webshop',
    href: 'https://www.kramp.com/shop-dk/da',
    icon: ShoppingBag,
  },
  {
    title: 'Find os på Facebook',
    href: 'https://www.facebook.com/landbrugsmaskiner',
    icon: Facebook,
  },
];

export default function Home() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);

  usePageSeo({
    title: 'Nye & brugte landbrugsmaskiner i Thorsager',
    description:
      'Landbrugsmaskiner.dk — Birkballe & Nicholaisen ApS i Thorsager siden 1973. Salg af nye og brugte landbrugsmaskiner, værksted, reservedele og service. Forhandler af Deutz-Fahr, Maschio og Pottinger.',
    path: '/',
    keywords: pageKeywords(['nye landbrugsmaskiner', 'brugte traktorer til salg', 'maskinforhandler Djursland']),
    jsonLd: homeGraphSchema(),
    jsonLdId: 'jsonld-home',
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/machines');
        const data = await res.json();
        if (Array.isArray(data)) setMachines([...data].sort((a, b) => b.id - a.id));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* ═══ HERO ═══ */}
      <section className="relative">
        <div className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
          <img src="/images/hero.jpg" alt="" className="absolute inset-0 w-full h-full object-cover scale-[1.01]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/15" />

          <div className="relative z-10 text-center max-w-4xl mx-auto px-6 pt-[100px] pb-32">
            <p className="text-[#51af37] text-[14px] font-medium tracking-[0.25em] uppercase mb-6 animate-fade-in">
              Kvalitet - Kompetence - Service
            </p>
            <h1 className="text-white text-[48px] sm:text-[64px] lg:text-[80px] font-bold leading-[1.05] mb-8 animate-fade-in-up">
              Nye & brugte
              <br />
              kvalitetsmaskiner
            </h1>
            <div className="flex flex-wrap justify-center gap-3 animate-fade-in-up-delay">
              <Link
                href="/maskiner"
                className="group inline-flex items-center gap-2.5 bg-[#51af37] text-white text-[16px] font-semibold px-10 py-4.5 rounded-lg hover:bg-[#469e2f] transition-all duration-300 shadow-[0_4px_20px_rgba(81,175,55,0.3)]"
              >
                Se maskiner på lager
                <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <a
                href="tel:+4586379268"
                className="inline-flex items-center gap-2.5 bg-white/[0.08] backdrop-blur-md text-white text-[16px] font-semibold px-10 py-4.5 rounded-lg border border-white/[0.15] hover:bg-white/[0.15] transition-all duration-300"
              >
                <Phone className="w-4.5 h-4.5" /> Ring til os
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-white via-white/90 to-transparent z-10" />
      </section>

      {/* ═══ BRAND LOGOS ═══ */}
      <Reveal>
        <section className="py-10 bg-white relative z-20">
          <div className="max-w-[1100px] mx-auto px-5 sm:px-6">
            <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-16">
              {[
                { src: '/images/brands/deutz-fahr.png', alt: 'Deutz-Fahr', className: 'h-14 lg:h-[4.5rem] w-auto max-w-[min(100%,280px)] object-contain' },
                { src: '/images/brands/poettinger.gif', alt: 'Pöttinger', className: 'h-12 lg:h-16 w-auto object-contain' },
                { src: '/images/brands/rabe.gif', alt: 'Rabe', className: 'h-12 lg:h-16 w-auto object-contain' },
                { src: '/images/brands/maschio.jpg', alt: 'Maschio', className: 'h-12 lg:h-16 w-auto object-contain' },
              ].map((b) => (
                <img key={b.alt} src={b.src} alt={b.alt} className={b.className} />
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ═══ SITE SEKTIONER ═══ */}
      <section className="pt-6 pb-20 lg:pb-28">
        <div className="max-w-[1260px] mx-auto px-5 sm:px-6">
          <Reveal>
            <div className="mb-10">
              <p className="text-[#51af37] text-[13px] font-semibold tracking-[0.2em] uppercase mb-2">Udforsk</p>
              <h2 className="text-[32px] lg:text-[40px] font-bold text-[#1a1a1a]">Vores virksomhed</h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {siteSections.map((section, i) => (
              <Reveal key={section.title} delay={i * 80}>
                <Link href={section.href} className="group relative aspect-[4/5] rounded-xl overflow-hidden block">
                  <img
                    src={section.image}
                    alt={section.title}
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[800ms] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent group-hover:from-black/90 transition-all duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-white font-bold text-[17px] leading-snug mb-1">{section.title}</p>
                    <p className="text-white/50 text-[13px]">{section.desc}</p>
                  </div>
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SENESTE MASKINER ═══ */}
      <section className="py-20 lg:py-28 bg-[#F5F5F3]">
        <div className="max-w-[1260px] mx-auto px-5 sm:px-6">
          <Reveal>
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-[#51af37] text-[13px] font-semibold tracking-[0.2em] uppercase mb-2">På lager nu</p>
                <h2 className="text-[32px] lg:text-[40px] font-bold text-[#1a1a1a]">Seneste maskiner</h2>
              </div>
              <Link
                href="/maskiner"
                className="text-[15px] font-medium text-[#51af37] hover:text-[#469e2f] flex items-center gap-1.5 transition-colors group"
              >
                Se alle <ChevronRight className="w-4.5 h-4.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </Reveal>
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-5 h-5 animate-spin text-gray-300" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {machines.slice(0, 8).map((m, i) => (
                <Reveal key={m.id} delay={i * 50}>
                  <Link href={`/maskine/${machineSlug(m.id, m.title)}`} className="group block">
                    <div className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300">
                      <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
                        {m.pictures?.[0]?.url ? (
                          <SmartImage
                            src={m.pictures[0].url}
                            alt={m.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            scaleOnWhitespace="scale-125 group-hover:scale-130"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100" />
                        )}
                      </div>
                      <div className="p-4">
                        <p className="text-[11px] text-[#51af37] font-semibold tracking-[0.1em] uppercase mb-1.5">{m.brand}</p>
                        <h3 className="text-[15px] font-semibold text-[#1a1a1a] leading-snug mb-3 line-clamp-2">{m.title}</h3>
                        <div className="flex items-end justify-between pt-3 border-t border-gray-100">
                          <div>
                            <p className="text-[18px] font-bold text-[#1a1a1a] tracking-tight">{formatPrice(m.price)}</p>
                            <p className="text-[11px] text-gray-400 mt-0.5">ekskl. moms</p>
                          </div>
                          <span className="text-[13px] font-semibold text-[#51af37] group-hover:text-[#469e2f] flex items-center gap-1 transition-colors">
                            Se mere →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-[1260px] mx-auto px-5 sm:px-6">
          <div className="flex flex-wrap justify-center gap-16 lg:gap-32">
            {[
              { value: `${machines.length || 57}+`, label: 'Maskiner på lager' },
              { value: '50+', label: 'Års erfaring' },
              { value: '5000+', label: 'm² faciliteter' },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 120}>
                <div className="text-center">
                  <p className="text-[#51af37] text-[56px] lg:text-[72px] font-bold leading-none">{s.value}</p>
                  <p className="text-gray-400 text-[14px] font-medium mt-3 tracking-wide">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FIRMAPROFIL ═══ */}
      <section className="py-20 lg:py-28 bg-[#F5F5F3]">
        <div className="max-w-[1260px] mx-auto px-5 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Reveal>
              <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                <img src="/images/hero.jpg" alt="Landbrugsmaskiner.dk Thorsager" className="w-full h-full object-cover" />
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div>
                <p className="text-[#51af37] text-[13px] font-semibold tracking-[0.2em] uppercase mb-3">Firmaprofil</p>
                <h2 className="text-[32px] lg:text-[40px] font-bold text-[#1a1a1a] mb-6 leading-tight">
                  Mere end 50 års erfaring
                  <br />
                  med maskiner
                </h2>
                <p className="text-[17px] text-gray-500 leading-[1.8] mb-4">
                  Vi har altid et stort udvalg af brugte landbrugsmaskiner klar til omgående levering. Vi er forhandler af Deutz-Fahr, Maschio, Perfect, Suire, Keltec og Murray.
                </p>
                <p className="text-[17px] text-gray-500 leading-[1.8] mb-10">
                  Vi tilbyder også reparation, reservedele og eksport af brugte maskiner samt import af Pöttinger og Rabe. Ring for fremvisning.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="tel:+4586379268"
                    className="inline-flex items-center gap-2.5 bg-[#51af37] text-white text-[16px] font-semibold px-8 py-4 rounded-lg hover:bg-[#469e2f] transition-all duration-300"
                  >
                    <Phone className="w-4.5 h-4.5" /> Ring til os
                  </a>
                  <Link
                    href="/firmaprofil"
                    className="inline-flex items-center gap-2.5 border border-gray-200 text-[#1a1a1a] text-[16px] font-semibold px-8 py-4 rounded-lg hover:bg-white hover:border-gray-300 transition-all duration-300"
                  >
                    Læs firmaprofil <ArrowRight className="w-4.5 h-4.5" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ KELTEC NYHED ═══ */}
      <section className="py-16 lg:py-24 bg-white border-y border-gray-100">
        <div className="max-w-[1260px] mx-auto px-5 sm:px-6">
          <Reveal>
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div>
                <p className="text-[#51af37] text-[13px] font-semibold tracking-[0.2em] uppercase mb-2">Nyhed</p>
                <h2 className="text-[28px] lg:text-[36px] font-bold text-[#1a1a1a] mb-5 leading-tight">
                  Keltec, nem håndtering af rundballer!
                </h2>
                <p className="text-[16px] text-gray-500 leading-relaxed mb-4">
                  Vi har nu mulighed for at sælge Keltec baleslicer, og vi har på lager til omgående levering.
                </p>
                <p className="text-[16px] text-gray-500 leading-relaxed mb-4">
                  Er du træt af at skulle håndtere plastic, net og skære baller op? Keltec Baleslicer gør arbejdet nemmere, hurtigere og sparer dig for at skulle ind og ud af traktoren flere gange.
                </p>
                <p className="text-[15px] text-gray-400 mb-8">
                  Se introduktionsvideo, kom og se den eller ring for et uforpligtende tilbud!
                </p>
                <a
                  href="tel:+4528749268"
                  className="inline-flex items-center gap-2.5 bg-[#51af37] text-white text-[16px] font-semibold px-8 py-4 rounded-lg hover:bg-[#469e2f] transition-all shadow-[0_4px_20px_rgba(81,175,55,0.25)]"
                >
                  <Phone className="w-4 h-4" /> Ring for tilbud
                </a>
              </div>
              <div className="aspect-video rounded-2xl overflow-hidden bg-black shadow-xl ring-1 ring-black/5">
                <iframe
                  src="https://www.youtube.com/embed/IlbWD_aY7hk"
                  title="Keltec Baleslicer introduktionsvideo"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ WEBSHOPS ═══ */}
      <section className="py-16 lg:py-20 bg-[#F5F5F3]">
        <div className="max-w-[1260px] mx-auto px-5 sm:px-6">
          <div className="grid sm:grid-cols-3 gap-5">
            {webshopLinks.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col bg-white rounded-xl border border-gray-100 p-8 hover:shadow-lg hover:border-[#51af37]/20 transition-all duration-300 h-full"
                >
                  <item.icon className="w-9 h-9 text-[#51af37] mb-5" />
                  <h2 className="font-bold text-[18px] text-[#1a1a1a] mb-3 flex-1">{item.title}</h2>
                  <span className="inline-flex items-center gap-1.5 text-[#51af37] font-semibold text-[14px] group-hover:gap-2 transition-all">
                    Besøg <ExternalLink className="w-4 h-4" />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ KONTAKTFORMULAR ═══ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1260px] mx-auto px-5 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <Reveal>
              <p className="text-[#51af37] text-[13px] font-semibold tracking-[0.2em] uppercase mb-3">Kontakt</p>
              <h2 className="text-[32px] lg:text-[40px] font-bold text-[#1a1a1a] mb-6">Send os en besked</h2>
              <div className="space-y-2 text-[15px] text-gray-500 mb-8">
                <p>
                  <strong className="text-[#1a1a1a]">Telefon:</strong>{' '}
                  <a href="tel:+4586379268" className="hover:underline">86 37 92 68</a>
                </p>
                <p>
                  <strong className="text-[#1a1a1a]">E-mail:</strong>{' '}
                  <a href="mailto:lbb@landbrugsmaskiner.dk" className="hover:underline">lbb@landbrugsmaskiner.dk</a>
                </p>
                <p>
                  <strong className="text-[#1a1a1a]">Adresse:</strong> Mørkevej 8, 8410 Thorsager
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <ContactForm intro="Du er velkommen til at sende os en mail via kontaktformularen, eller ringe til os på 28 74 92 68." />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-20 lg:py-28 bg-[#141414] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="max-w-[1260px] mx-auto px-5 sm:px-6 text-center relative">
          <Reveal>
            <h2 className="text-[34px] lg:text-[48px] font-bold text-white mb-5 leading-tight">
              Klar til at finde din næste maskine?
            </h2>
            <p className="text-white/35 text-[16px] max-w-md mx-auto mb-10 leading-relaxed">
              Kig forbi eller ring — vi hjælper gerne med at finde den rette maskine til dig
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/maskiner"
                className="group inline-flex items-center gap-2.5 bg-[#51af37] text-white text-[16px] font-semibold px-10 py-4.5 rounded-lg hover:bg-[#469e2f] transition-all duration-300 shadow-[0_4px_20px_rgba(81,175,55,0.3)]"
              >
                Se maskiner <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <a
                href="tel:+4586379268"
                className="inline-flex items-center gap-2.5 border border-white/10 text-white text-[16px] font-semibold px-10 py-4.5 rounded-lg hover:bg-white/[0.06] transition-all duration-300"
              >
                <Phone className="w-4.5 h-4.5" /> +45 86 37 92 68
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
