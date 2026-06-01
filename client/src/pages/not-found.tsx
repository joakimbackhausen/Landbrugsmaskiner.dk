import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { usePageMeta } from '@/hooks/usePageMeta';

export default function NotFound() {
  usePageMeta({
    title: 'Side ikke fundet',
    description: 'Den ønskede side findes ikke på Landbrugsmaskiner.dk.',
    path: '/404',
    noIndex: true,
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="text-center max-w-md">
          <p className="text-[#51af37] text-6xl font-bold mb-4">404</p>
          <h1 className="text-2xl font-bold text-foreground mb-3">Side ikke fundet</h1>
          <p className="text-muted-foreground mb-8">
            Den side du leder efter findes desværre ikke.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#51af37] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#469e2f] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Til forsiden
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
