import React from 'react';
import { Terminal, useTerminal } from 'termite-react';

export default function App() {
  const { state, onInput, onSubmit } = useTerminal(async (cmd) => {
    return `you ran: ${cmd}`;
  });

  return (
    <div className="main-container" id="main-screen">
      <div className="header-container" id="main-header">
        <h1>Termite</h1>
        <h3>A UI Library for custom terminals</h3>
      </div>
      <div className="fun-container" id="fun-section">
        <Terminal state={state} onInput={onInput} onSubmit={onSubmit} />
      </div>
    </div>
  )
}