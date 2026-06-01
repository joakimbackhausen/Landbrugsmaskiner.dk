import { Link } from 'wouter';
import { ArrowRight, Wrench, Truck, Warehouse, Phone, Users } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { usePageMeta } from '@/hooks/usePageMeta';

const ctaCards = [
  {
    title: 'Maskiner på lager',
    description: 'Se vores udvalg af nye og brugte landbrugsmaskiner',
    href: '/maskiner',
    icon: Warehouse,
  },
  {
    title: 'Værksted & reparation',
    description: 'Reparation af landbrugs- og entreprenørmaskiner',
    href: '/vaerksted',
    icon: Wrench,
  },
  {
    title: 'Eksport & import',
    description: 'Eksport af brugte maskiner og import af Pöttinger, Rabe, Volverini',
    href: '/leverandoerer',
    icon: Truck,
  },
  {
    title: 'Kontakt os',
    description: 'Ring eller skriv — vi svarer hurtigt',
    href: '/kontakt',
    icon: Users,
  },
];

export default function About() {
  usePageMeta({
    title: 'Firmaprofil',
    description:
      'Birkballe & Nicholaisen ApS i Thorsager siden 1973. Forhandler af Deutz-Fahr, Zetor, Maschio m.fl. Salg, værksted, reservedele og eksport.',
    path: '/firmaprofil',
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        <PageHero
          image="/images/hero.jpg"
          eyebrow="Siden 1973"
          title="Firmaprofil"
          subtitle="Kvalitet — Kompetence — Service"
        />

        <section className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-lg sticky top-[calc(var(--header-h,124px)+2rem)]">
                <img
                  src="/images/hero2.jpg"
                  alt="Landbrugsmaskiner.dk i Thorsager"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm uppercase tracking-widest text-gray-500 font-semibold mb-4">
                  Hvem er vi
                </p>
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-8">
                  Birkballe & Nicholaisen ApS
                </h2>
                <div className="space-y-5 text-muted-foreground text-[17px] leading-relaxed">
                  <p>
                    Birkballe & Nicholaisen ApS er et startet firma af Leif Birkballe, Michael Birkballe og Michael Nicholaisen i 2014. Birkballe & Nicholaisen ApS bygger på personer der har været i landbrugsbranchen på og omkring Djursland i mange år. Firmaet har til huse i bygningerne hos Leif Birkballe, hvor Jemith/LBB landbrugsmaskiner i mange år har holdt til.
                  </p>
                  <p>
                    Firmaet jemith/LBB landbrugsmaskiner blev grundlagt i 1973 af smedemester Leif Birkballe med reparation af landbrugs- og entreprenørmaskiner. Siden blev der også fabrikeret skovle til gravemaskiner og monteret stålhaller. Fra et lille værksted på 50 m² blev firmaet løbende udvidet så der i dag er mere end 5000 m² lagerhal, kontor, butik, værksted og reservedelslager.
                  </p>
                  <p>
                    Den første medarbejder blev ansat i 1975 og siden er flere ansat og udlært så firma i dag har 8 medarbejdere hvoraf mange har snart 30 og 45 års jubilæum i firmaet. Vi lægger stor vægt på efteruddannelse så vi kan yde optimal SERVICE. På værkstedet er der i dag 4 svende og 2 lærlinge.
                  </p>
                  <p>
                    I løbet af årene er firmaet blevet FORHANDLER af mange kendte mærker bl.a. Deutz-Fahr, Zetor, Maschio, Perfect, Suire, Keltec og Murray.
                  </p>
                  <p>
                    Samtidig er aktiviteten også udvidet med omfattende EKSPORT af brugte maskiner og IMPORT af Pöttinger, Rabe og Volverini.
                  </p>
                  <p>
                    Leif Birkballes søn Michael blev udlært i firmaet i 1991 og er nu en drivende kraft i værksted og driftsplanlægning. Michael har også gennem flere år været ansvarlig for salg og produktion af staldinventar, gelændere og terrasser i LBB Produktion.
                  </p>
                  <p>
                    Michael Nicholaisen startede som sælger af Landbrugsmaskiner i 2000 og har siden haft med salg og administration og gøre i flere forskellige virksomheder, med tilknytning til landbruget.
                  </p>
                  <p>
                    I de seneste år har firmaet haft landbrugsprojekter i flere afrikanske lande og dermed stor erfaring med landbrug og maskineksport til Afrika.
                  </p>
                  <p>
                    Vi lægger stor vægt på at have et stort og opdateret RESERVEDELSLAGER, så vi kan tilbyde hurtig reparation ved driftsstop.
                  </p>
                  <p>
                    Firmaet er velkonsolideret og vi holder omkostningerne nede til gavn for vores kunder.
                  </p>
                </div>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Link
                    href="/kontakt"
                    className="inline-flex items-center gap-2 bg-[#51af37] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#469e2f] transition-all"
                  >
                    <Phone className="w-4 h-4" />
                    Kontakt os
                  </Link>
                  <Link
                    href="/maskiner"
                    className="inline-flex items-center gap-2 border border-gray-300 text-foreground px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                  >
                    Se maskiner
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

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
                  className="group bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg hover:border-[#51af37]/30 transition-all duration-200"
                >
                  <div className="w-12 h-12 bg-[#51af37]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#51af37] transition-colors">
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
