import { useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowRight, Wrench, Truck, CreditCard, Warehouse, Phone } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const stats = [
  { value: '50+', label: 'Års erfaring' },
  { value: '8', label: 'Medarbejdere' },
  { value: '1973', label: 'Grundlagt' },
  { value: '5000+', label: 'm² faciliteter' },
];

const ctaCards = [
  {
    title: 'Maskiner på lager',
    description: 'Se vores udvalg af brugte landbrugsmaskiner',
    href: '/maskiner',
    icon: Warehouse,
  },
  {
    title: 'Værksted & reparation',
    description: 'Reparation af landbrugs- og entreprenørmaskiner',
    href: '/',
    icon: Wrench,
  },
  {
    title: 'Eksport & import',
    description: 'Eksport af brugte maskiner og import af Pöttinger, Rabe, Volverini',
    href: '/',
    icon: Truck,
  },
  {
    title: 'Reservedele',
    description: 'Stort og opdateret reservedelslager til hurtig service',
    href: '/reservedele',
    icon: CreditCard,
  },
];

export default function About() {
  useEffect(() => {
    document.title = 'Om os - Landbrugsmaskiner.dk | 50+ års erfaring med landbrugsmaskiner';
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero with background image */}
        <section className="relative h-[70vh] min-h-[450px] overflow-hidden">
          <img
            src="/images/hero.jpg"
            alt="Landbrugsmaskiner.dk"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a2332]/90 via-[#1a2332]/70 to-[#1a2332]/40" />

          <div className="relative h-full flex flex-col justify-center max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <p className="text-sm uppercase tracking-widest text-white/50 font-semibold mb-3">
              Siden 1973
            </p>
            <h1
              className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.1] tracking-tight"
              data-testid="text-page-title"
            >
              Om Landbrugsmaskiner.dk
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-xl">
              Kvalitet - Kompetence - Service
            </p>
          </div>
        </section>

        {/* Stats bar */}
        <section className="bg-navy-light border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
              {stats.map((stat) => (
                <div key={stat.label} className="py-8 px-6 text-center">
                  <div className="font-display font-bold text-3xl lg:text-4xl text-white">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-white/60 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                <img
                  src="/images/hero.jpg"
                  alt="Landbrugsmaskiner.dk set fra luften"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm uppercase tracking-widest text-gray-500 font-semibold mb-4">
                  Hvem er vi
                </p>
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6">
                  Mere end 50 års erfaring med maskiner
                </h2>
                <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                  <p>
                    Birkballe &amp; Nicholaisen ApS er startet af Leif Birkballe, Michael Birkballe og Michael Nicholaisen i 2014, men firmaet bygger på mange års erfaring i landbrugsbranchen på Djursland.
                  </p>
                  <p>
                    Firmaet jemith/LBB landbrugsmaskiner blev grundlagt i 1973 af smedemester Leif Birkballe med reparation af landbrugs- og entreprenørmaskiner. Fra et lille værksted på 50 m2 er firmaet løbende udvidet til mere end 5000 m2.
                  </p>
                  <p>
                    Vi er forhandler af Deutz-Fahr, Zetor, Maschio, Perfect, Suire, Keltec og Murray, og vi importerer Pöttinger, Rabe og Volverini.
                  </p>
                  <p>
                    Vi lægger stor vægt på at vedligeholde et stort og opdateret reservedelslager, så vi hurtigt kan yde optimal service.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/kontakt"
                    className="inline-flex items-center gap-2 bg-[#51af37] text-white px-6 py-3 rounded font-semibold hover:bg-[#469e2f] transition-all"
                  >
                    <Phone className="w-4 h-4" />
                    Kontakt os
                  </Link>
                  <Link
                    href="/maskiner"
                    className="inline-flex items-center gap-2 border border-gray-300 text-foreground px-6 py-3 rounded font-semibold hover:bg-gray-50 transition-all"
                  >
                    Se maskiner
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA cards */}
        <section className="bg-[#f5f7fa] py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Vores ydelser
              </p>
              <h2 className="font-display font-bold text-3xl lg:text-4xl text-foreground">
                Udforsk hvad vi tilbyder
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {ctaCards.map((card) => (
                <Link
                  key={card.href + card.title}
                  href={card.href}
                  className="group bg-white rounded-lg border border-gray-100 p-6 hover:shadow-lg hover:border-accent/30 transition-all duration-200"
                >
                  <div className="w-12 h-12 bg-[#51af37]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#51af37] group-hover:text-white transition-colors">
                    <card.icon className="w-6 h-6 text-[#51af37] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-foreground mb-1">{card.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{card.description}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-gray-500 group-hover:gap-2 transition-all">
                    Læs mere <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
