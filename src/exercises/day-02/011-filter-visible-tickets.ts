export type Ticket = {
  id: string;
  subject: string;
  archived: boolean;
};

export function getVisibleTickets(tickets: readonly Ticket[]): Ticket[] {
  const data = tickets.filter((item) => !item.archived)
  console.log({ data })

  return data

  throw new Error("Not implemented");
}
