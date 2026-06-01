import { Link } from 'wouter';
import { Phone, Wrench, GraduationCap, Truck, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { usePageMeta } from '@/hooks/usePageMeta';

const highlights = [
  {
    icon: Wrench,
    title: 'Alle maskintyper',
    text: 'Fra store mejetærskere og traktorer til mindre plæneklippere.',
  },
  {
    icon: GraduationCap,
    title: 'Løbende efteruddannelse',
    text: 'Vore mekanikere deltager i efteruddannelse hos vore leverandører.',
  },
  {
    icon: Truck,
    title: 'Service hos dig',
    text: 'To udstyrede servicevogne sikrer hurtig hjælp — også ude hos kunden.',
  },
];

export default function Vaerksted() {
  usePageMeta({
    title: 'Værksted',
    description:
      'Birkballe & Nicholaisen værksted i Thorsager: 4 mekanikere og 2 lærlinge. Reparation af landbrugs- og entreprenørmaskiner.',
    path: '/vaerksted',
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        <PageHero
          image="/images/vaerksted.jpg"
          eyebrow="Service & reparation"
          title="Værksted"
          subtitle="Hurtig og effektiv service er kodeordene for et dynamisk firma"
        />

        <section className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                <img
                  src="/images/vaerksted.jpg"
                  alt="Værksted hos Birkballe & Nicholaisen"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm uppercase tracking-widest text-gray-500 font-semibold mb-4">
                  Professionel service
                </p>
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-8">
                  Eksperter på landbrugs- og entreprenørmaskiner
                </h2>
                <div className="space-y-5 text-muted-foreground text-[17px] leading-relaxed">
                  <p>
                    Birkballe og Nicholaisens værksted har 4 mekanikere og 2 lærlinge, der er uddannet til at arbejde på alle slags maskiner, lige fra store maskiner som mejetærskere eller traktorer til mindre maskiner som plæneklippere.
                  </p>
                  <p>
                    For hele tiden at være ajour med den tekniske udvikling inden for maskinbranchen deltager vore mekanikere løbende i efteruddannelse hos vore leverandører.
                  </p>
                  <p>
                    Vi har to udstyrede servicevogne, der sikrer dig hurtig hjælp, når du har brug for det, ligesom vi også udfører service hos dig, hvis du foretrækker det.
                  </p>
                  <p>
                    Hurtig og effektiv service er kodeordene for et dynamisk firma som Birkballe & Nicholaisen.
                  </p>
                </div>
                <a
                  href="tel:+4586379268"
                  className="inline-flex items-center gap-2 mt-10 bg-[#51af37] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#469e2f] transition-all"
                >
                  <Phone className="w-4 h-4" />
                  Ring 86 37 92 68
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f5f7fa] py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Det vi tilbyder
              </p>
              <h2 className="font-display font-bold text-3xl lg:text-4xl text-foreground">
                Værksted med fuld kapacitet
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {highlights.map((item) => (
                <div key={item.title} className="bg-white rounded-xl border border-gray-100 p-8">
                  <div className="w-12 h-12 bg-[#51af37]/10 rounded-lg flex items-center justify-center mb-5">
                    <item.icon className="w-6 h-6 text-[#51af37]" />
                  </div>
                  <h3 className="font-bold text-foreground text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 text-[#51af37] font-semibold hover:gap-3 transition-all"
              >
                Book service eller ring til os <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
