import React from "react";
import { TerminalEntry, TerminalState } from "termite-core";

interface TerminalProps {
  state: TerminalState;
  onInput: (value: string) => void;
  onSubmit: () => void;
  className?: string;
}

/**
 * 
 * @param param0 the state, submit functions, and classes
 * @returns 
 */
export const Terminal: React.FC<TerminalProps> = ({
  state,
  onInput,
  onSubmit,
  className,
}: TerminalProps) => {
  /**
   * handles the submission
   * @param e 
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className={className}>
      {state.history.map((item: TerminalEntry) => (
        <div key={item.id}>
          <p>{item.command}</p>
          <p>{item.output}</p>
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input
          value={state.current}
          onChange={(e) => onInput(e.target.value)}
          autoFocus
        />
      </form>
    </div>
  );
};
