import type {
  TerminalState,
  TerminalHandler,
  CreateTerminalOptions,
} from "./types";

/**
 *
 * @param options terminal options wanted by the user
 * @returns a Terminal State
 */
export function createTerminal(
  options: CreateTerminalOptions = {},
): TerminalState {
  return {
    id: options.id,
    name: options.name,
    cwd: options.cwd,
    prompt: options.prompt,
    history: [],
    current: "",
  };
}

/**
 *
 * @param state the current terminal state
 * @param cwd the new working directory
 * @returns updated terminal state with new cwd
 */
export function setCwd(state: TerminalState, cwd: string): TerminalState {
  return {
    ...state,
    cwd,
  };
}

/**
 *
 * @param state The current terminal state
 * @param value a string value that is the input
 * @returns a current Terminal state with updated input
 */
export function setInput(state: TerminalState, value: string): TerminalState {
  return {
    ...state,
    current: value,
  };
}

/**
 *
 * @param state the terminal state
 * @returns updated terminal state with zero history
 */
export function clearHistory(state: TerminalState): TerminalState {
  return {
    ...state,
    history: [],
  };
}

/**
 *
 * @param state the current handler state
 * @param handler the callback function for mapping input to output
 * @returns a promise for a new terminal state depending on output
 */
export async function execute(
  state: TerminalState,
  handler: TerminalHandler,
): Promise<TerminalState> {
  const command = state.current.trim(); // trim the input for a raw command

  if (!command) return state; // if theres nothing, repeat the input again

  const output = await handler(command); // wait for the handler to finish

  return {
    ...state,
    current: "",
    history: [
      ...state.history,
      {
        command,
        output,
        cwd: state.cwd,
        id: crypto.randomUUID(),
        timestamp: Date.now(),
      },
    ],
  };
}
