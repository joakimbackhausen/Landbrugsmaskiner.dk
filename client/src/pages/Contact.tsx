import { Phone, Mail, MapPin, Clock, User } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import ContactForm from '@/components/ContactForm';
import { usePageSeo } from '@/hooks/usePageMeta';
import { localBusinessSchema, pageKeywords, webPageSchema } from '@shared/seo';

const contactDetails = [
  {
    icon: Phone,
    label: 'Telefon',
    content: (
      <a href="tel:+4586379268" className="text-foreground hover:underline text-lg font-semibold">
        86 37 92 68
      </a>
    ),
    sub: 'Man-Fre 06:00-16:00',
  },
  {
    icon: Mail,
    label: 'Email',
    content: (
      <div className="space-y-1">
        <a href="mailto:lbb@landbrugsmaskiner.dk" className="text-foreground hover:underline block">
          lbb@landbrugsmaskiner.dk
        </a>
        <a href="mailto:mn@landbrugsmaskiner.dk" className="text-foreground hover:underline block">
          mn@landbrugsmaskiner.dk
        </a>
      </div>
    ),
    sub: 'Fax: 86 37 93 33',
  },
  {
    icon: MapPin,
    label: 'Adresse',
    content: <span className="text-foreground font-medium">Mørkevej 8, 8410 Thorsager</span>,
    sub: 'Kom og besøg os',
  },
  {
    icon: Clock,
    label: 'Åbningstider',
    content: (
      <div className="text-foreground font-medium">
        <p>Man-Fre: 06:00-16:00</p>
        <p>Lør-Søn: Ring for aftale</p>
      </div>
    ),
    sub: 'Ring for fremvisning i weekenden',
  },
];

const contacts = [
  {
    name: 'Leif Birkballe',
    phone: '28 74 92 68',
    tel: '+4528749268',
    email: 'lbb@landbrugsmaskiner.dk',
  },
  {
    name: 'Michael Nicholaisen',
    phone: '28 44 54 33',
    tel: '+4528445433',
    email: 'mn@landbrugsmaskiner.dk',
  },
];

export default function Contact() {
  const pageTitle = 'Kontakt — Ring 86 37 92 68';
  const pageDescription =
    'Kontakt Birkballe & Nicholaisen ApS på Mørkevej 8, 8410 Thorsager. Telefon 86 37 92 68. Ring for fremvisning af landbrugsmaskiner eller værkstedservice.';

  usePageSeo({
    title: pageTitle,
    description: pageDescription,
    path: '/kontakt',
    image: '/images/hero2.jpg',
    keywords: pageKeywords(['kontakt landbrugsmaskiner', 'maskinforhandler Thorsager']),
    breadcrumbs: [
      { label: 'Forside', path: '/' },
      { label: 'Kontakt', path: '/kontakt' },
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        localBusinessSchema(),
        webPageSchema(pageTitle, pageDescription, '/kontakt'),
      ],
    },
    jsonLdId: 'jsonld-contact',
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        <PageHero
          image="/images/hero2.jpg"
          eyebrow="Vi er altid klar"
          title="Kontakt os"
          subtitle="Ring eller skriv — vi svarer hurtigt"
        />

        <section className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
              <div>
                <p className="text-sm uppercase tracking-widest text-gray-500 font-semibold mb-4">
                  Kontaktoplysninger
                </p>
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-10">
                  Få fat i os
                </h2>

                <div className="space-y-4 mb-12">
                  {contactDetails.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-start gap-4 p-4 rounded-xl hover:bg-[#f5f7fa] transition-colors"
                    >
                      <div className="w-12 h-12 bg-[#51af37]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-[#51af37]" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                          {item.label}
                        </div>
                        {item.content}
                        {item.sub && (
                          <div className="text-sm text-muted-foreground mt-0.5">{item.sub}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-sm uppercase tracking-widest text-gray-500 font-semibold mb-4">
                  Kontaktpersoner
                </p>
                <div className="grid sm:grid-cols-1 gap-4">
                  {contacts.map((person) => (
                    <div
                      key={person.email}
                      className="flex items-start gap-4 p-5 bg-white border border-gray-100 rounded-xl"
                    >
                      <div className="w-10 h-10 bg-[#010174]/5 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-[#010174]" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{person.name}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Tlf:{' '}
                          <a href={`tel:${person.tel}`} className="text-foreground hover:underline">
                            {person.phone}
                          </a>
                        </p>
                        <a href={`mailto:${person.email}`} className="text-sm text-[#51af37] hover:underline">
                          {person.email}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm uppercase tracking-widest text-gray-500 font-semibold mb-4">
                  Find vej
                </p>
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-8">
                  Besøg os i Thorsager
                </h2>
                <div className="aspect-[4/3] bg-slate-100 rounded-xl overflow-hidden shadow-sm mb-12">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2260!2d10.434819!3d56.341803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sM%C3%B8rkevej+8%2C+8410+Thorsager!5e0!3m2!1sda!2sdk"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Landbrugsmaskiner.dk lokation"
                  />
                </div>

                <p className="text-sm uppercase tracking-widest text-gray-500 font-semibold mb-4">
                  Skriv til os
                </p>
                <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-6">
                  Send os en besked
                </h2>
                <ContactForm intro="Du er velkommen til at sende os en mail via kontaktformularen nedenfor, eller ringe til os på 28 74 92 68." />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
