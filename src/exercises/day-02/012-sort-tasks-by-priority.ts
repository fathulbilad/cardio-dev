export type Task = {
  id: string;
  title: string;
  priority: 1 | 2 | 3;
  dueAt: string;
};

export function sortTasksByPriority(tasks: readonly Task[]): Task[] {
  // const data = tasks.


  throw new Error("Not implemented");
}
