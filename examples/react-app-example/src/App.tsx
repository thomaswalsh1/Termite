import React from "react";
import { Terminal, useTerminal } from "termite-react";
import "./App.css";

function useEchoTerminal(options: { cwd?: string; prompt?: string }) {
  return useTerminal(
    async (cmd, { clear }) => {
      if (cmd === "clear") { clear(); return ""; }
      if (cmd === "help") return "commands: help, clear, echo <text>";
      if (cmd.startsWith("echo ")) return cmd.slice(5);
      return `${cmd}: command not found`;
    },
    options,
  );
}

function TermWindow({ title, children, className }: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`term-window${className ? ` ${className}` : ""}`}>
      <div className="term-titlebar">
        <div className="term-dots">
          <span className="term-dot term-dot-red" />
          <span className="term-dot term-dot-yellow" />
          <span className="term-dot term-dot-green" />
        </div>
        <span className="term-title">{title}</span>
      </div>
      {children}
    </div>
  );
}

export default function App() {
  const t1 = useEchoTerminal({ cwd: "~/projects", prompt: "❯" });
  const t2 = useEchoTerminal({ cwd: "~/documents", prompt: "$" });
  const t3 = useEchoTerminal({ prompt: "root@host:~#" });
  const t4 = useEchoTerminal({ prompt: ">" });
  const t5 = useEchoTerminal({ cwd: "~/projects", prompt: "❯" });

  return (
    <div className="app">
      <header className="app-header">
        <h1>Termite</h1>
        <p>A UI library for custom terminal components</p>
      </header>

      <main className="app-main">
        <section className="demo-section">
          <h2>Default</h2>
          <TermWindow title="bash — ~/projects">
            <Terminal
              className="terminal-default"
              state={t1.state}
              onInput={t1.onInput}
              onSubmit={t1.onSubmit}
            />
          </TermWindow>
        </section>

        <section className="demo-section">
          <h2>Themes</h2>
          <div className="terminal-row">
            <div className="terminal-col">
              <h3>Light</h3>
              <TermWindow title="bash — ~/documents" className="light">
                <Terminal
                  className="terminal-light"
                  state={t2.state}
                  onInput={t2.onInput}
                  onSubmit={t2.onSubmit}
                />
              </TermWindow>
            </div>
            <div className="terminal-col">
              <h3>Hacker</h3>
              <TermWindow title="root@host" className="hacker">
                <Terminal
                  className="terminal-hacker"
                  state={t3.state}
                  onInput={t3.onInput}
                  onSubmit={t3.onSubmit}
                />
              </TermWindow>
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2>Compact</h2>
          <TermWindow title="terminal" className="compact">
            <Terminal
              className="terminal-compact"
              state={t4.state}
              onInput={t4.onInput}
              onSubmit={t4.onSubmit}
            />
          </TermWindow>
        </section>

        <section className="demo-section">
          <h2>Customize your own windows</h2>
            <Terminal
              className="custom-terminal-1"
              state={t5.state}
              onInput={t5.onInput}
              onSubmit={t5.onSubmit}
            />
        </section>
      </main>
    </div>
  );
}
