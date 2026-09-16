export type Task = {
  id: string;
  title: string;
  priority: 1 | 2 | 3;
  dueAt: string;
};

export function sortTasksByPriority(tasks: readonly Task[]): Task[] {
  // const data = tasks.
  const data = [...tasks].sort((a, b) => {


    return (b.priority - a.priority) || (new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime())
  })
  console.log({ data })

  return data


  throw new Error("Not implemented");
}
