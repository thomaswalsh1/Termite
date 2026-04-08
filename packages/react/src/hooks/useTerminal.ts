import { useState, useEffect } from "react";
import { TerminalEngine } from "termite-core";

export function useTerminal(initialCwd = "/") {
  const [engine] = useState(() => new TerminalEngine(initialCwd));
  const [buffer, setBuffer] = useState(engine.state.buffer);

  useEffect(() => {
    // TODO: hook into events later
    setBuffer([...engine.state.buffer]);
  }, [engine.state.buffer]);

  return engine;
}