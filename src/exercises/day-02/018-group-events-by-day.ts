export type AuditEvent = {
  id: string;
  kind: string;
  timestamp: string;
};

export function groupEventsByDay(events: readonly AuditEvent[]): Record<string, AuditEvent[]> {
  const grouped: Record<string, AuditEvent[]> = {}

  for (const event of events) {
    const date = new Date(event.timestamp).toISOString().slice(0, 10)

    if (!grouped[date]) {
      grouped[date] = []
    }

    grouped[date].push(event)
  }

  const sortGroup = Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b))
  console.log(sortGroup)

  const changeData = Object.fromEntries(sortGroup)

  return changeData

  throw new Error("Not implemented");
}
