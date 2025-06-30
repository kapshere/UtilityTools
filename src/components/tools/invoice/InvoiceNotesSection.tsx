
import React from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface InvoiceNotesSectionProps {
  notes: string;
  setNotes: (notes: string) => void;
}

const InvoiceNotesSection: React.FC<InvoiceNotesSectionProps> = ({
  notes,
  setNotes
}) => {
  return (
    <Card className="p-6">
      <Label htmlFor="notes">Notes</Label>
      <Textarea
        id="notes"
        placeholder="Additional notes or terms"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="mt-2"
      />
    </Card>
  );
};

export default InvoiceNotesSection;
