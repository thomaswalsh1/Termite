import React from "react";
import { Terminal, useTerminal } from "termite-react";
import "./App.css";

function EchoTerminal() {
  const { state, onInput, onSubmit } = useTerminal(async (cmd) => {
    return cmd;
  });
  return (
    <div className="terminal-card">
      <div className="terminal-card-header">
        <span className="terminal-dot red" />
        <span className="terminal-dot yellow" />
        <span className="terminal-dot green" />
        <span className="terminal-card-title">echo</span>
      </div>
      <Terminal
        state={state}
        onInput={onInput}
        onSubmit={onSubmit}
        className="terminal"
      />
    </div>
  );
}

function MathTerminal() {
  const { state, onInput, onSubmit } = useTerminal(async (cmd) => {
    try {
      const result = Function(`"use strict"; return (${cmd})`)();
      return String(result);
    } catch {
      return `error: invalid expression`;
    }
  });
  return (
    <div className="terminal-card">
      <div className="terminal-card-header">
        <span className="terminal-dot red" />
        <span className="terminal-dot yellow" />
        <span className="terminal-dot green" />
        <span className="terminal-card-title">math</span>
      </div>
      <Terminal
        state={state}
        onInput={onInput}
        onSubmit={onSubmit}
        className="terminal"
      />
    </div>
  );
}

function HelpTerminal() {
  const commands: Record<string, string> = {
    help: "Available commands: help, about, version",
    about: "Termite — a web terminal UI library",
    version: "0.0.1",
  };
  const { state, onInput, onSubmit } = useTerminal(async (cmd) => {
    return commands[cmd.toLowerCase()] ?? `unknown command: ${cmd}`;
  });
  return (
    <div className="terminal-card">
      <div className="terminal-card-header">
        <span className="terminal-dot red" />
        <span className="terminal-dot yellow" />
        <span className="terminal-dot green" />
        <span className="terminal-card-title">help</span>
      </div>
      <Terminal
        state={state}
        onInput={onInput}
        onSubmit={onSubmit}
        className="terminal"
      />
    </div>
  );
}

export default function App() {
  return (
    <main>
      <header className="demo-header">
        <h1>Termite</h1>
        <p className="demo-subtitle">Web terminal UI library — three independent instances, one page</p>
      </header>
      <div className="terminal-grid">
        <EchoTerminal />
        <MathTerminal />
        <HelpTerminal />
      </div>
    </main>
  );
}
