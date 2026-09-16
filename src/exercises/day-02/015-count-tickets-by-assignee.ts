export type Ticket = {
  id: string;
  assignee: string | null | undefined;
};

export function countTicketsByAssignee(tickets: readonly Ticket[]): Map<string, number> {
  const data = new Map<string, number>()

  for (const ticket of tickets) {
    const key = !ticket.assignee || ticket.assignee.trim().length === 0 ? 'Unassigned' : ticket.assignee

    data.set(key, (data.get(key) || 0) + 1)
  }

  console.log({data})

  return data

  throw new Error("Not implemented");
}
