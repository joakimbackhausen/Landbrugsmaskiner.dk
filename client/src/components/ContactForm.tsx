import { useState } from 'react';
import { Send, Loader2, CheckCircle2 } from 'lucide-react';

export interface MachineInquiry {
  id: number;
  brand?: string;
  model?: string;
  title?: string;
  price?: string;
  currency?: string;
}

interface ContactFormProps {
  className?: string;
  intro?: string;
  machine?: MachineInquiry;
  onSuccess?: () => void;
  submitLabel?: string;
  idPrefix?: string;
}

function buildMachineMessage(machine: MachineInquiry): string {
  const title = [machine.brand, machine.model || machine.title].filter(Boolean).join(' ');
  const lines = ['Jeg er interesseret i følgende maskine:', ''];

  if (title) lines.push(title);

  if (machine.price && !isNaN(parseInt(machine.price, 10))) {
    const formatted = parseInt(machine.price, 10).toLocaleString('da-DK');
    lines.push(`Pris: ${formatted} ${machine.currency || 'DKK'}`);
  }

  lines.push(`Annonce nr.: ${machine.id}`, '', '');
  return lines.join('\n');
}

export default function ContactForm({
  className = '',
  intro,
  machine,
  onSuccess,
  submitLabel = 'Send beskeden',
  idPrefix = 'contact',
}: ContactFormProps) {
  const defaultMessage = machine ? buildMachineMessage(machine) : '';
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: defaultMessage });
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
        body: JSON.stringify({
          ...form,
          ...(machine ? { machine } : {}),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Kunne ikke sende besked');
      setStatus('success');
      setForm({ name: '', email: '', phone: '', message: defaultMessage });
      onSuccess?.();
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
          <label htmlFor={`${idPrefix}-name`} className="block text-sm font-medium mb-1.5">Dit navn</label>
          <input
            id={`${idPrefix}-name`}
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#51af37]/30 focus:border-[#51af37]"
          />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-email`} className="block text-sm font-medium mb-1.5">Din e-mail</label>
          <input
            id={`${idPrefix}-email`}
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#51af37]/30 focus:border-[#51af37]"
          />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-phone`} className="block text-sm font-medium mb-1.5">Telefonnummer</label>
          <input
            id={`${idPrefix}-phone`}
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#51af37]/30 focus:border-[#51af37]"
          />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-message`} className="block text-sm font-medium mb-1.5">Din besked</label>
          <textarea
            id={`${idPrefix}-message`}
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
          {submitLabel}
        </button>
      </form>
    </div>
  );
}
