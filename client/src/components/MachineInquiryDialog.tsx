import { useState } from 'react';
import { Mail } from 'lucide-react';
import ContactForm, { type MachineInquiry } from '@/components/ContactForm';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface MachineInquiryDialogProps {
  machine: MachineInquiry;
}

export default function MachineInquiryDialog({ machine }: MachineInquiryDialogProps) {
  const [open, setOpen] = useState(false);
  const machineLabel = [machine.brand, machine.model || machine.title].filter(Boolean).join(' ');

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="w-full inline-flex items-center justify-center gap-2 border-2 border-gray-200 text-[#1a1a1a] text-[14px] font-semibold px-6 py-3 rounded-full hover:bg-gray-50 transition-colors"
        >
          <Mail className="w-4 h-4" />
          Send e-mail
        </button>
      </DialogTrigger>
      <DialogContent className="z-[100] max-w-lg max-h-[90vh] overflow-y-auto sm:rounded-2xl">
        <DialogHeader>
          <DialogTitle>Send forespørgsel</DialogTitle>
          <DialogDescription>
            {machineLabel
              ? `Skriv til os om ${machineLabel}. Vi svarer hurtigst muligt på lbb@landbrugsmaskiner.dk.`
              : 'Skriv til os om denne maskine. Vi svarer hurtigst muligt.'}
          </DialogDescription>
        </DialogHeader>
        {open && (
          <ContactForm
            machine={machine}
            idPrefix="machine-inquiry"
            submitLabel="Send forespørgsel"
            onSuccess={() => setTimeout(() => setOpen(false), 2500)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
