import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (email: string) => void;
}

const EmailModal: React.FC<EmailModalProps> = ({ isOpen, onClose, onSend }) => {
  const [email, setEmail] = useState('');

  const handleSend = () => {
    onSend(email);
    setEmail('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send Invoice by Email</DialogTitle>
        </DialogHeader>
        <Input
          type="email"
          placeholder="Recipient's email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <DialogFooter>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSend}>Send</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmailModal;