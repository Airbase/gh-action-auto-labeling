export type Label = {
  name: string;
  checked: boolean;
};

// Subset of the issue event fields used by this action
export type IssueEvent = {
  event: string;
  actor: { type: string } | null;
  label?: {
    name: string;
  };
};
