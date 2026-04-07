import { useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, User } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const contactDetails = [
  {
    icon: Phone,
    label: 'Telefon',
    content: (
      <a href="tel:+4586379268" className="text-foreground hover:underline text-lg font-semibold">
        +45 86 37 92 68
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
    sub: 'Vi svarer hurtigst muligt',
  },
  {
    icon: MapPin,
    label: 'Adresse',
    content: (
      <span className="text-foreground font-medium">
        Mørkevej 8, 8410 Thorsager
      </span>
    ),
    sub: 'Kom og besøg os',
  },
  {
    icon: Clock,
    label: 'Åbningstider',
    content: (
      <div className="text-foreground font-medium">
        <p>Man-Fre: 06:00-16:00</p>
        <p>Lør-Søn: Ring</p>
      </div>
    ),
    sub: 'Ring for fremvisning i weekenden',
  },
  {
    icon: User,
    label: 'Kontaktpersoner',
    content: (
      <div className="text-foreground font-medium space-y-1">
        <p>Leif Birkballe — 28 74 92 68</p>
        <p>Michael Nicholaisen — 28 44 54 33</p>
        <p>Michael Birkballe — 28 44 54 34</p>
      </div>
    ),
    sub: '',
  },
];

export default function Contact() {
  useEffect(() => {
    document.title = 'Kontakt os - Landbrugsmaskiner.dk | Thorsager - Tlf: 86 37 92 68';
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
              Vi er altid klar
            </p>
            <h1
              className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.1] tracking-tight"
              data-testid="text-page-title"
            >
              Kontakt os
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-xl">
              Ring eller skriv — vi svarer hurtigt
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
              {/* Contact details */}
              <div>
                <p className="text-sm uppercase tracking-widest text-gray-500 font-semibold mb-4">
                  Kontaktoplysninger
                </p>
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-10">
                  Få fat i os
                </h2>

                <div className="space-y-6">
                  {contactDetails.map((item) => (
                    <div key={item.label} className="flex items-start gap-4 p-4 rounded-lg hover:bg-[#f5f7fa] transition-colors">
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
              </div>

              {/* Map */}
              <div>
                <p className="text-sm uppercase tracking-widest text-gray-500 font-semibold mb-4">
                  Find vej
                </p>
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-10">
                  Besøg os i Thorsager
                </h2>
                <div className="aspect-[4/3] bg-slate-100 rounded-lg overflow-hidden shadow-sm">
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
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
