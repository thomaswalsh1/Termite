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

export default function App() {
  const t1 = useEchoTerminal({ cwd: "~/projects", prompt: "❯" });
  const t2 = useEchoTerminal({ cwd: "~/documents", prompt: "$" });
  const t3 = useEchoTerminal({ prompt: "root@host:~#" });
  const t4 = useEchoTerminal({ prompt: ">" });

  return (
    <div className="app">
      <header className="app-header">
        <h1>Termite</h1>
        <p>A UI library for custom terminal components</p>
      </header>

      <main className="app-main">
        <section className="demo-section">
          <h2>Default</h2>
          <Terminal
            className="terminal-default"
            title="bash — ~/projects"
            state={t1.state}
            onInput={t1.onInput}
            onSubmit={t1.onSubmit}
          />
        </section>

        <section className="demo-section">
          <h2>Themes</h2>
          <div className="terminal-row">
            <div className="terminal-col">
              <h3>Light</h3>
              <Terminal
                className="terminal-light"
                title="bash — ~/documents"
                state={t2.state}
                onInput={t2.onInput}
                onSubmit={t2.onSubmit}
              />
            </div>
            <div className="terminal-col">
              <h3>Hacker</h3>
              <Terminal
                className="terminal-hacker"
                title="root@host"
                state={t3.state}
                onInput={t3.onInput}
                onSubmit={t3.onSubmit}
              />
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2>Compact</h2>
          <Terminal
            className="terminal-compact"
            title="terminal"
            state={t4.state}
            onInput={t4.onInput}
            onSubmit={t4.onSubmit}
          />
        </section>
      </main>
    </div>
  );
}
