import React from "react";
import { Terminal, useTerminal } from "termite-react";
import "./App.css";
import type { TerminalState } from "termite-core";

class TerminalObject {
  state: TerminalState;
  onInput: (value: string) => void;
  onSubmit: () => Promise<void>;
  onClear: () => void;
}

export default function App() {
  const { state, onInput, onSubmit } = useTerminal(
    async (cmd, { clear }) => {
      if (cmd === "clear") { clear(); return ""; }
      return `you ran: ${cmd}`;
    },
    { cwd: "/home/thomas", prompt: "$" },
  );

  const terminal2: TerminalObject = useTerminal(
    async (cmd, { clear }) => {
      if (cmd === "clear") { clear(); return ""; }
      return `you ran: ${cmd}`;
    },
    { cwd: "/home/thomas", prompt: "$" },
  );

  const terminal3: TerminalObject = useTerminal(
    async (cmd, { clear }) => {
      if (cmd === "clear") { clear(); return ""; }
      return `you ran: ${cmd}`;
    },
    { cwd: "/home/thomas", prompt: "$" },
  );

  const terminal4: TerminalObject = useTerminal(
    async (cmd) => {
      return `you ran: ${cmd}`;
    },
    { cwd: "/home/thomas", prompt: "$" },
  );

  const terminal5: TerminalObject = useTerminal(
    async (cmd) => {
      return `you ran: ${cmd}`;
    },
    { cwd: "/home/thomas", prompt: "$" },
  );

  return (
    <div className="main-container" id="main-screen">
      <div className="header-container" id="main-header">
        <h1>Termite</h1>
        <h3>A UI Library for custom terminals</h3>
      </div>
      <div className="fun-container" id="fun-section">
        <Terminal
          classNames={{
            cwd: "terminal-cwd",
            root: "terminal-root",
            input: "terminal-input",
            command: "terminal-command",
          }}
          className="overall"
          state={state}
          onInput={onInput}
          onSubmit={onSubmit}
        />
      </div>
      <br style={{height: "400px"}}></br>
      <div id="expanding-system">
        <div id="row-1">
          <Terminal
            className="terminal-2"
            state={terminal2.state}
            onInput={terminal2.onInput}
            onSubmit={terminal2.onSubmit}
          />
          <Terminal
            className="terminal-3"
            state={terminal3.state}
            onInput={terminal3.onInput}
            onSubmit={terminal3.onSubmit}
          />
        </div>
        <div className="spacer" />
        <div id="row-2">
          <Terminal
            className="terminal-4"
            state={terminal4.state}
            onInput={terminal4.onInput}
            onSubmit={terminal4.onSubmit}
          />
          <Terminal
            className="terminal-5"
            state={terminal5.state}
            onInput={terminal5.onInput}
            onSubmit={terminal5.onSubmit}
          />
        </div>
      </div>
    </div>
  );
}
