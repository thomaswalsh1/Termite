import React, { useEffect, useRef, useState } from "react";
import { TerminalEntry, TerminalState } from "termite-core";
import { injectStyles } from "./styles";

export interface TerminalClassNames {
  entry?: string;
  command?: string;
  output?: string;
  cwd?: string;
  prompt?: string;
}

interface TerminalProps {
  state: TerminalState;
  onInput?: (value: string) => void;
  onSubmit?: () => void;
  className?: string;
  classNames?: TerminalClassNames;
}

const cx = (base: string, override?: string) =>
  override ? `${base} ${override}` : base;

export const Terminal: React.FC<TerminalProps> = ({
  state,
  onInput,
  onSubmit,
  className,
  classNames = {},
}: TerminalProps) => {
  injectStyles();

  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [cursorPos, setCursorPos] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setCursorPos(state.current.length);
  }, [state.current]);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [state.history]);

  const updateCursor = () => {
    if (inputRef.current) {
      setCursorPos(inputRef.current.selectionStart ?? state.current.length);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.();
  };

  return (
    <div
      className={cx("termite-root", className)}
      onClick={() => onInput && inputRef.current?.focus()}
    >
      <div ref={bodyRef} className="termite-body">
        <div className="termite-history">
          {state.history.map((item: TerminalEntry) => (
            <div key={item.id} className={cx("termite-entry", classNames.entry)}>
              {(item.command || item.cwd || state.prompt) && (
                <p className={cx("termite-command", classNames.command)}>
                  {item.cwd && (
                    <span className={cx("termite-cwd", classNames.cwd)}>{item.cwd}</span>
                  )}
                  {state.prompt && (
                    <span className={cx("termite-prompt", classNames.prompt)}>{state.prompt}</span>
                  )}
                  {item.command}
                </p>
              )}
              {item.output && <p className={cx("termite-output", classNames.output)}>{item.output}</p>}
            </div>
          ))}
        </div>
        {onInput && onSubmit && (
          <form className="termite-form" onSubmit={handleSubmit}>
            {state.cwd && (
              <span className={cx("termite-cwd", classNames.cwd)}>{state.cwd}</span>
            )}
            {state.prompt && (
              <span className={cx("termite-prompt", classNames.prompt)}>{state.prompt}</span>
            )}
            <div className="termite-input-wrapper">
              <div className="termite-input-display" aria-hidden>
                <span>{state.current.slice(0, cursorPos)}</span>
                <span className={isFocused ? "termite-cursor" : ""}>{state.current[cursorPos] ?? " "}</span>
                <span>{state.current.slice(cursorPos + 1)}</span>
              </div>
              <input
                ref={inputRef}
                className="termite-input"
                value={state.current}
                onChange={(e) => { onInput(e.target.value); updateCursor(); }}
                onSelect={updateCursor}
                onKeyUp={updateCursor}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
