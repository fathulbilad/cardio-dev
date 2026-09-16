export type Contact = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  updatedAt: string;
  subscribed: boolean;
};

export function mergeContactsByEmail(contacts: readonly Contact[]): Contact[] {
  const data = <Contact[]>[]
  for (const contact of contacts) {
    if (contact.subscribed) data.push(contact)
  }


  throw new Error("Not implemented");
}
