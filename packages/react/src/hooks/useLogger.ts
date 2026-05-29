import { useState, useCallback } from "react";
import { createTerminal, addLog, clearHistory } from "../core";
import type { TerminalState, TerminalEntry, CreateTerminalOptions } from "../core";

export function useLogger(options?: CreateTerminalOptions) {
  const [state, setState] = useState<TerminalState>(() =>
    createTerminal(options),
  );

  const log = useCallback(
    (message: string, status?: TerminalEntry["status"]) => {
      if (options?.cwd) {
        message = options.cwd + ": " + message;
      }
      setState((s) => addLog(s, message, status));
    },
    [],
  );

  const clear = useCallback(() => {
    setState((s) => clearHistory(s));
  }, []);

  return { state, log, clear };
}
