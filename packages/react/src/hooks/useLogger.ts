import { useState, useCallback } from "react";
import { createTerminal, addLog, clearHistory } from "termite-core";
import type { TerminalState, TerminalEntry, CreateTerminalOptions } from "termite-core";

export function useLogger(options?: CreateTerminalOptions) {
  const [state, setState] = useState<TerminalState>(() =>
    createTerminal(options),
  );

  const log = useCallback(
    (message: string, status?: TerminalEntry["status"]) => {
      setState((s) => addLog(s, message, status));
    },
    [],
  );

  const clear = useCallback(() => {
    setState((s) => clearHistory(s));
  }, []);

  return { state, log, clear };
}
