/**
 * These are the exports needed to send core packages
 * to the react package. These types and functions go from their
 * files to here, and then to the react component
 */
export { clearHistory, createTerminal, execute, setInput, setCwd } from "./functions";

export type {
  TerminalEntry,
  TerminalState,
  TerminalHandler,
  CreateTerminalOptions,
} from "./types";
