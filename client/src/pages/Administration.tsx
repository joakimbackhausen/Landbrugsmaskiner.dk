import { Link } from 'wouter';
import { Mail, User, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { usePageSeo } from '@/hooks/usePageMeta';
import { pageKeywords, webPageSchema } from '@shared/seo';

const leadership = [
  {
    name: 'Leif Birkballe',
    role: 'Daglig ledelse',
    phone: '28 74 92 68',
    tel: '+4528749268',
    email: 'lbb@landbrugsmaskiner.dk',
  },
  {
    name: 'Michael Nicholaisen',
    role: 'Daglig ledelse & administration',
    phone: '28 44 54 33',
    tel: '+4528445433',
    email: 'mn@landbrugsmaskiner.dk',
  },
];

export default function Administration() {
  const pageTitle = 'Administration';
  const pageDescription =
    'Administration og daglig ledelse hos Birkballe & Nicholaisen ApS i Thorsager. Kontakt Michael Nicholaisen på mn@landbrugsmaskiner.dk.';

  usePageSeo({
    title: pageTitle,
    description: pageDescription,
    path: '/administration',
    keywords: pageKeywords(['administration', 'ledelse']),
    breadcrumbs: [
      { label: 'Forside', path: '/' },
      { label: 'Administration', path: '/administration' },
    ],
    jsonLd: webPageSchema(pageTitle, pageDescription, '/administration'),
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        <PageHero
          image="/images/hero.jpg"
          eyebrow="Organisation"
          title="Administration"
          subtitle="Den daglige ledelse og administration hos Birkballe & Nicholaisen"
        />

        <section className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
              <div>
                <p className="text-sm uppercase tracking-widest text-gray-500 font-semibold mb-4">
                  Ledelse
                </p>
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-8">
                  Daglig ledelse
                </h2>
                <div className="space-y-5 text-muted-foreground text-[17px] leading-relaxed mb-10">
                  <p>Den daglige ledelse fortages af Leif Birkballe og Michael Nicholaisen.</p>
                  <p>Administrationen varetages af Michael Nicholaisen.</p>
                </div>

                <div className="space-y-4">
                  {leadership.map((person) => (
                    <div
                      key={person.email}
                      className="flex items-start gap-4 p-6 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-shadow"
                    >
                      <div className="w-12 h-12 bg-[#010174]/5 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-6 h-6 text-[#010174]" />
                      </div>
                      <div>
                        <p className="font-bold text-foreground text-lg">{person.name}</p>
                        <p className="text-sm text-[#51af37] font-medium mt-0.5">{person.role}</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Tlf:{' '}
                          <a href={`tel:${person.tel}`} className="text-foreground hover:underline">
                            {person.phone}
                          </a>
                        </p>
                        <a
                          href={`mailto:${person.email}`}
                          className="inline-flex items-center gap-1.5 text-sm text-[#51af37] hover:underline mt-1"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          {person.email}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm uppercase tracking-widest text-gray-500 font-semibold mb-4">
                  Om firmaet
                </p>
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-8">
                  Velkonsolideret og effektiv
                </h2>
                <div className="space-y-5 text-muted-foreground text-[17px] leading-relaxed">
                  <p>
                    Vi lægger stor vægt på at have et stort og opdateret reservedelslager, så vi kan tilbyde hurtig reparation ved driftsstop.
                  </p>
                  <p>
                    Firmaet er velkonsolideret og vi holder omkostningerne nede til gavn for vores kunder.
                  </p>
                </div>

                <div className="mt-10 p-8 bg-[#f5f7fa] rounded-xl">
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Administration
                  </p>
                  <p className="text-foreground font-medium mb-2">Michael Nicholaisen</p>
                  <a
                    href="mailto:mn@landbrugsmaskiner.dk"
                    className="text-[#51af37] hover:underline font-medium"
                  >
                    mn@landbrugsmaskiner.dk
                  </a>
                </div>

                <Link
                  href="/kontakt"
                  className="inline-flex items-center gap-2 mt-10 text-[#51af37] font-semibold hover:gap-3 transition-all"
                >
                  Kontakt os <ArrowRight className="w-4 h-4" />
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
