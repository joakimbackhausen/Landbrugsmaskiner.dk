import { useState } from 'react';
import { Send, Loader2, CheckCircle2 } from 'lucide-react';

interface ContactFormProps {
  className?: string;
  intro?: string;
}

export default function ContactForm({ className = '', intro }: ContactFormProps) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Kunne ikke sende besked');
      setStatus('success');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Der opstod en fejl');
    }
  }

  if (status === 'success') {
    return (
      <div className={`bg-[#51af37]/10 border border-[#51af37]/20 rounded-xl p-8 text-center ${className}`}>
        <CheckCircle2 className="w-12 h-12 text-[#51af37] mx-auto mb-4" />
        <h3 className="font-bold text-lg mb-2">Tak for din besked!</h3>
        <p className="text-muted-foreground">Vi vender tilbage hurtigst muligt.</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-6 text-[#51af37] font-semibold hover:underline"
        >
          Send en ny besked
        </button>
      </div>
    );
  }

  return (
    <div className={className}>
      {intro && <p className="text-muted-foreground mb-6">{intro}</p>}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium mb-1.5">Dit navn</label>
          <input
            id="contact-name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#51af37]/30 focus:border-[#51af37]"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium mb-1.5">Din e-mail</label>
          <input
            id="contact-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#51af37]/30 focus:border-[#51af37]"
          />
        </div>
        <div>
          <label htmlFor="contact-phone" className="block text-sm font-medium mb-1.5">Telefonnummer</label>
          <input
            id="contact-phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#51af37]/30 focus:border-[#51af37]"
          />
        </div>
        <div>
          <label htmlFor="contact-message" className="block text-sm font-medium mb-1.5">Din besked</label>
          <textarea
            id="contact-message"
            required
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#51af37]/30 focus:border-[#51af37] resize-none"
          />
        </div>
        {status === 'error' && <p className="text-red-600 text-sm">{errorMsg}</p>}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex items-center gap-2 bg-[#51af37] text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-[#469e2f] transition-all disabled:opacity-60"
        >
          {status === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          Send beskeden
        </button>
      </form>
    </div>
  );
}
