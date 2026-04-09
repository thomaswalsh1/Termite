import { useState, useCallback } from "react";
import { createTerminal, setInput, execute, clearHistory } from "termite-core";
import type { TerminalHandler, TerminalState } from "termite-core";

export function useTerminal(handler: TerminalHandler) {
  const [state, setState] = useState<TerminalState>(() => createTerminal());

  const onInput = useCallback((value: string) => {
    setState((s) => setInput(s, value));
  }, []);

  const onSubmit = useCallback(async () => {
    setState((s) => {
      execute(s, handler).then(setState);
      return s;
    });
  }, [handler]);

  const onClear = useCallback(() => {
    setState((s) => clearHistory(s));
  }, []);

  return { state, onInput, onSubmit, onClear };
}
