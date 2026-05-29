import { useState, useCallback } from "react";
import {
  createTerminal,
  setInput,
  execute,
  clearHistory,
  setCwd,
} from "../core";
import type { TerminalState, CreateTerminalOptions } from "../core";

/* clear is necessary for all terminals. It is the only thing that can delete outputs */
/*
Terminal Context contains stuff that needs to be there
*/
export type TerminalContext = {
  clear: () => void;
};

export type UseTerminalHandler = (
  cmd: string,
  ctx: TerminalContext,
) => Promise<string>;

export function useTerminal(
  handler: UseTerminalHandler,
  options?: CreateTerminalOptions,
) {
  const [state, setState] = useState<TerminalState>(() =>
    createTerminal(options),
  );

  const onInput = useCallback((value: string) => {
    setState((s) => setInput(s, value));
  }, []);

  const onSubmit = useCallback(async () => {
    setState((s) => {
      let clearRequested = false;
      const ctx: TerminalContext = {
        clear: () => {
          clearRequested = true;
        },
      };

      execute(s, (cmd) => handler(cmd, ctx)).then((newState) => {
        if (clearRequested) {
          setState((current) => ({ ...clearHistory(current), current: "" }));
        } else {
          setState(newState);
        }
      });

      return s;
    });
  }, [handler]);

  const onClear = useCallback(() => {
    setState((s) => clearHistory(s));
  }, []);

  return { state, onInput, onSubmit, onClear };
}
