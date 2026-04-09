import React from "react";
import { TerminalEntry, TerminalState } from "termite-core";

export interface TerminalClassNames {
  root?: string;
  history?: string;
  entry?: string;
  command?: string;
  output?: string;
  form?: string;
  cwd?: string;
  prompt?: string;
  input?: string;
}

interface TerminalProps {
  state: TerminalState;
  onInput: (value: string) => void;
  onSubmit: () => void;
  className?: string;
  classNames?: TerminalClassNames;
}

/**
 *
 * @param base base class
 * @param override overriding class
 * @returns a classname
 */
const cx = (base: string, override?: string) =>
  override ? `${base} ${override}` : base;

export const Terminal: React.FC<TerminalProps> = ({
  state,
  onInput,
  onSubmit,
  className,
  classNames = {},
}: TerminalProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className={cx("termite-root", className ?? classNames.root)}>
      <div className={cx("termite-history", classNames.history)}>
        {state.history.map((item: TerminalEntry) => (
          <div key={item.id} className={cx("termite-entry", classNames.entry)}>
            <p className={cx("termite-command", classNames.command)}>
              {item.cwd && (
                <span className={cx("termite-cwd", classNames.cwd)}>{item.cwd} </span>
              )}
              {state.prompt && (
                <span className={cx("termite-prompt", classNames.prompt)}>{state.prompt} </span>
              )}
              {item.command}
            </p>
            <p className={cx("termite-output", classNames.output)}>{item.output}</p>
          </div>
        ))}
      </div>
      <form className={cx("termite-form", classNames.form)} onSubmit={handleSubmit}>
        {state.cwd && (
          <span className={cx("termite-cwd", classNames.cwd)}>{state.cwd} </span>
        )}
        {state.prompt && (
          <span className={cx("termite-prompt", classNames.prompt)}>{state.prompt} </span>
        )}
        <input
          className={cx("termite-input", classNames.input)}
          value={state.current}
          onChange={(e) => onInput(e.target.value)}
          autoFocus
        />
      </form>
    </div>
  );
};
