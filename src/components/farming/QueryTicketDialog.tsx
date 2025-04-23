
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface QueryTicketDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const QueryTicketDialog: React.FC<QueryTicketDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const [desc, setDesc] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // For demo: store the ticket in localStorage so admin can retrieve
    const ticketsJSON = window.localStorage.getItem("queryTickets");
    const tickets = ticketsJSON ? JSON.parse(ticketsJSON) : [];
    const newTicket = {
      id: "Q" + Math.floor(1000 + Math.random() * 9000),
      desc,
      farmer: window.localStorage.getItem("currentFarmerName") || "Anonymous",
      date: new Date().toISOString(),
      status: "open",
    };
    tickets.push(newTicket);
    window.localStorage.setItem("queryTickets", JSON.stringify(tickets));
    setDesc("");
    setSubmitting(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Raise a Support Query</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            required
            placeholder="Describe your issue or question"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <DialogFooter>
            <Button type="submit" disabled={submitting}>
              Submit Ticket
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QueryTicketDialog;
