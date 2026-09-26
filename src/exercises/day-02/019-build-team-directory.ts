export type TeamMember = {
  id: string;
  displayName: string;
  team: string;
  updatedAt: string;
  active: boolean;
};

export type TeamDirectoryRow = {
  team: string;
  members: string[];
};

export function buildTeamDirectory(members: readonly TeamMember[]): TeamDirectoryRow[] {
  const newMember = new Map<string, string[]>()






  throw new Error("Not implemented");
}
