import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { usePageMeta } from '@/hooks/usePageMeta';

const suppliers = [
  {
    name: 'Deutz Fahr',
    logo: '/images/brands/deutz-fahr.gif',
    description:
      'Hos Birkballe & Nicholaisen A/S er vi stolte af at arbejde sammen med Deutz Fahr som vores leverandør af landbrugsmaskiner. Med en historie, der går over 150 år tilbage, har Deutz Fahr etableret sig som førende i branchen, kendt for deres innovative design og håndværk af høj kvalitet. Fra høstmaskiner og traktorer til sprøjter og pressere – deres omfattende produktsortiment tilbyder noget til enhver form for landbrugsvirksomhed.',
  },
  {
    name: 'Pottinger',
    logo: '/images/brands/poettinger.gif',
    description:
      'Hos Birkballe & Nicholaisen prioriterer vi at bruge materialer af høj kvalitet i alle vores produkter. Derfor har vi valgt at samarbejde med Pottinger, en førende leverandør inden for græsbehandling og jordbehandling. Med et ry for exceptionel kundeservice og innovative tilbud er det tydeligt, at Pottinger opfylder både deres kunders og slutbrugeres behov.',
  },
];

const otherBrandLogos = [
  { name: 'Rabe', logo: '/images/brands/rabe.gif' },
  { name: 'Sentinel', logo: '/images/brands/sentinel.gif' },
  { name: 'Zetor', logo: '/images/brands/zetor.gif' },
  { name: 'Maschio', logo: '/images/brands/maschio.jpg' },
  { name: 'Volverini', logo: '/images/brands/volverini.png' },
];

export default function Leverandoerer() {
  usePageMeta({
    title: 'Leverandører',
    description:
      'Forhandler af Deutz-Fahr, Zetor, Maschio, Pöttinger, Rabe, Volverini m.fl. Birkballe & Nicholaisen ApS i Thorsager.',
    path: '/leverandoerer',
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        <PageHero
          image="/images/leverandoerer.jpg"
          eyebrow="Kvalitetsmærker"
          title="Leverandører"
          subtitle="Deutz-Fahr, Zetor, Maschio, Pöttinger, Rabe, Volverini m.fl."
        />

        <section className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            {suppliers.map((supplier, i) => (
              <div
                key={supplier.name}
                className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-20 lg:mb-28 ${
                  i % 2 === 1 ? 'lg:[direction:rtl]' : ''
                }`}
              >
                <div className={`${i % 2 === 1 ? 'lg:[direction:ltr]' : ''}`}>
                  <div className="bg-white border border-gray-100 rounded-xl p-10 flex items-center justify-center shadow-sm mb-6 lg:mb-0 aspect-[16/10]">
                    <img
                      src={supplier.logo}
                      alt={supplier.name}
                      className="max-h-20 w-auto object-contain"
                    />
                  </div>
                </div>
                <div className={`${i % 2 === 1 ? 'lg:[direction:ltr]' : ''}`}>
                  <p className="text-sm uppercase tracking-widest text-gray-500 font-semibold mb-3">
                    Hovedleverandør
                  </p>
                  <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-5">
                    {supplier.name}
                  </h2>
                  <p className="text-muted-foreground text-[17px] leading-relaxed">
                    {supplier.description}
                  </p>
                </div>
              </div>
            ))}

            <div className="border-t border-gray-100 pt-16">
              <div className="text-center mb-10">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Flere mærker
                </p>
                <h2 className="font-display font-bold text-3xl text-foreground">
                  Flere af vores leverandører
                </h2>
              </div>
              <div className="flex flex-wrap justify-center gap-8 lg:gap-12 items-center mb-16">
                {otherBrandLogos.map((b) => (
                  <div
                    key={b.name}
                    className="bg-white border border-gray-100 rounded-xl px-8 py-6 flex items-center justify-center min-w-[140px] hover:shadow-md transition-shadow"
                  >
                    <img src={b.logo} alt={b.name} className="h-10 w-auto object-contain" />
                  </div>
                ))}
              </div>

              <div className="max-w-3xl mx-auto text-center space-y-5 text-muted-foreground text-[17px] leading-relaxed">
                <p>
                  Vi lægger stor vægt på at have et stort og opdateret reservedelslager, så vi kan tilbyde hurtig reparation ved driftsstop.
                </p>
                <p>
                  Firmaet er velkonsolideret og vi holder omkostningerne nede til gavn for vores kunder.
                </p>
              </div>

              <div className="text-center mt-10">
                <Link
                  href="/maskiner"
                  className="inline-flex items-center gap-2 bg-[#51af37] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#469e2f] transition-all"
                >
                  Se maskiner på lager
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
