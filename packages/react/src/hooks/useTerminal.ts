import { useState, useCallback } from "react";
import { createTerminal, setInput, execute, clearHistory } from "termite-core";
import type { TerminalHandler, TerminalState } from "termite-core";

/**
 * useTerminal is the root of this thing. It gives you
 * the context you need.
 * @param handler the command that maps commands to outputs
 * @returns an object with state
 */
export function useTerminal(handler: TerminalHandler) {
  /**
   * createTerminal is passed as an initializer function
   * runs once on mount
   */
  const [state, setState] = useState<TerminalState>(() => createTerminal());

  /**
   * will be called on every keystroke.
   * setInput returns a new state
   */
  const onInput = useCallback((value: string) => {
    setState((s) => setInput(s, value));
  }, []);

  /**
   * Sets the state to the output of executing the command
   */
  const onSubmit = useCallback(async () => {
    setState((s) => {
      execute(s, handler).then(setState);
      return s;
    });
  }, [handler]);

  /**
   * sets the state to clearing history
   */
  const onClear = useCallback(() => {
    setState((s) => clearHistory(s));
  }, []);

  return { state, onInput, onSubmit, onClear };
}
