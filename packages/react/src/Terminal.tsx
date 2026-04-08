import React, { useState } from "react";
import { TerminalEngine } from "termite-core";

interface TerminalProps {
  terminal: TerminalEngine;
  theme?: string;
}

export const Terminal: React.FC<TerminalProps> = ({ terminal, theme }: TerminalProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    terminal.submitCommand(input);
    setInput("");
  };

  return (
    <div className={`terminal ${theme}`}>
      {terminal.state.buffer.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
      <form onSubmit={handleSubmit}>
        <span>$</span>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
      </form>
    </div>
  );
};