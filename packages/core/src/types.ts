/**
 * Every terminal has an entry, the use of a status is optional
 * There will always be a command, and always be output
 * The user can choose to assign ids and timestamps
 */
export type TerminalEntry<
  TStatus extends string = "success" | "error" | "info" | "warning",
> = {
  command: string;
  output: string;
  id?: string;
  timestamp?: number;
  status?: TStatus;
};

/**
 * The state of a terminal has its current prompt, current history
 * and optional id and name for organization
 */
export type TerminalState<
  TStatus extends string = "success" | "error" | "info" | "warning",
> = {
  id?: string;
  name?: string;
  history: TerminalEntry<TStatus>[];
  current: string;
};

/**
 * Every terminal has a user defined handler
 */
export type TerminalHandler = (
  command: string,
) => Promise<string>;

/**
 * Every terminal has options that the user can give it.
 */
export type CreateTerminalOptions = {
  id?: string;
  name?: string;
};
