export type TicketStatus = "open" | "pending" | "resolved";

export type Ticket = {
  id: string;
  subject: string;
  status: TicketStatus;
};

export function groupTicketsByStatus(tickets: readonly Ticket[]): Record<TicketStatus, Ticket[]> {
  const recordTicket: Ticket[] = [...tickets]
  const open = []
  const pending = []
  const resolved = []

  for (let i of recordTicket) {
    if (i.status === 'open') open.push(i)
    if (i.status === 'pending') pending.push(i)
    if (i.status === 'resolved') resolved.push(i)
  }

  console.log({open, pending, resolved})

  return {open, pending, resolved}

  throw new Error("Not implemented");
}
