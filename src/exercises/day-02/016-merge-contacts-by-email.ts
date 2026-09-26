import { sortUserPlugins } from "vite";

export type Contact = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  updatedAt: string;
  subscribed: boolean;
};

export function mergeContactsByEmail(contacts: readonly Contact[]): Contact[] {
  const mergeContacts = new Map<string, Contact>()

  for (const item of contacts) {
    if (!item.subscribed) continue;

    const currEmail = mergeContacts.get(item.email)

    if (!currEmail) {
      mergeContacts.set(item.email, item)
      continue;
    }

    const currDate = new Date(currEmail.updatedAt).getTime()
    const contactDate = new Date(item.updatedAt).getTime()

    if (currDate < contactDate) {
      mergeContacts.set(item.email, item)
    }
  }

  const result = [...mergeContacts.values()]

  const sortResult = result.sort((a, b) => {
    const sortingLastname = a.lastName.localeCompare(b.lastName)

    if (sortingLastname !== 0) return sortingLastname

    return a.firstName.localeCompare(b.firstName)
  })

  console.log({ sortResult })

  return sortResult

  throw new Error("Not implemented");
}
