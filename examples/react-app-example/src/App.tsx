import React from "react";
import { Terminal, useLogger, useTerminal } from "termite-react";
import { FaRegWindowMinimize } from "react-icons/fa";
import { FaRegWindowClose } from "react-icons/fa";
import { FaRegWindowMaximize } from "react-icons/fa";

import "./App.css";

/**
 * Helper function for an echoing terminal
 * @param options the terminal options
 * @returns a useTerminal function 
 */
function useEchoTerminal(options: { cwd?: string; prompt?: string }) {
  return useTerminal(async (cmd, { clear }) => {
    if (cmd === "clear") {
      clear();
      return "";
    }
    if (cmd === "help") return "commands: help, clear, echo <text>";
    if (cmd.startsWith("echo ")) return cmd.slice(5);
    return `${cmd}: command not found`;
  }, options);
}

export default function App() {
  const t1 = useEchoTerminal({ cwd: "~/projects", prompt: "❯" });
  const t2 = useEchoTerminal({ cwd: "~/documents", prompt: "$" });
  const t3 = useEchoTerminal({ prompt: "root@host:~#" });
  const t4 = useEchoTerminal({ prompt: ">" });
  const t5 = useEchoTerminal({ cwd: "~/projects", prompt: "❯" });

  const myAscii = `
   _____                    _ _       
/__   \\___ _ __ _ __ ___ (_) |_ ___ 
  / /\\/ _ \\ '__| '_ ' _ \\| | __/ _ \\
 / / |  __/ |  | | | | | | | ||  __/
 \\/   \\___|_|  |_| |_| |_|_|\\__\\___|
  `;

  const t6 = useLogger({ cwd: "Output@Termite.ui" });

  return (
    <div className="app">
      <header className="app-header">
        <h1>Termite</h1>
        <p>A UI Component for a Terminal.</p>
        <p>See examples below.</p>
      </header>

      <main className="app-main">
        <section className="demo-section">
          <h2>Customize your own terminals and windows</h2>
          <div className="custom-terminal-1-container">
            <div className="custom-terminal-1-header">
              <span>Customize your terminals</span>
              <div className="custom-terminal-1-controls">
                <FaRegWindowMinimize className="custom-terminal-1-icon" />
                <FaRegWindowMaximize className="custom-terminal-1-icon" />
                <FaRegWindowClose className="custom-terminal-1-icon" />
              </div>
            </div>
            <Terminal
              className="custom-terminal-1"
              state={t5.state}
              onInput={t5.onInput}
              onSubmit={t5.onSubmit}
            />
          </div>
        </section>
        <section className="demo-section">
          <h2>Output-only terminals</h2>
          <div className="custom-terminal-2-buttons">
            <button
              onClick={() => {
                t6.log("Hi!", "success");
              }}
            >
              Say Hi
            </button>
            <button
            onClick={() => {
              t6.log("This is an example of an error.", "error")
            }}>
              Log an Error
            </button>
            <button
            onClick={() => {
              t6.log("This is an example of a warning.", "warning")
            }}
            >
              Log a Warning
            </button>
            <button
            onClick={() => {
              t6.log("\n" + myAscii, "info")
            }}
            >
              Log some art
            </button>
            <button
            onClick={() => {
              t6.clear();
            }}
            >
              Clear
            </button>
          </div>
          <div className="custom-terminal-2-container">
            <div className="custom-terminal-2-header">
              <span>Perfect for displaying logs</span>
              <div className="custom-terminal-2-controls">
                <FaRegWindowClose className="custom-terminal-2-icon" />
              </div>
            </div>
            <Terminal
              className="custom-terminal-2"
              state={t6.state}
              onInput={() => {}}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
