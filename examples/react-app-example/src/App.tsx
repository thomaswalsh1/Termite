import React from "react";
import { Terminal, useTerminal } from "termite-react";
import "./App.css"

export default function App() {
  const { state, onInput, onSubmit } = useTerminal(async (cmd) => {
    return `you ran: ${cmd}`;
  }, {cwd: "/home/thomas", prompt: "$"});

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
          state={state}
          onInput={onInput}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}
