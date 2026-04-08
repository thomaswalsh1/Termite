/**
 *  cwd -> current working directory. AKA Where you are.
 *  buffer ->
 *  history -> where you last were
 */
export interface TerminalState {
  cwd: string;
  buffer: string[];
  history: string[];
}

export class TerminalEngine {
  state: TerminalState;

  // "/" is essentially root.
  constructor(initialCwd = "/") {
    this.state = { cwd: initialCwd, buffer: [], history: [] };
  }

  print(line: string) {
    this.state.buffer.push(line);
  }

  setCwd(path: string) {
    this.state.cwd = path;
  }

  submitCommand(cmd: string) {
    this.state.history.push(cmd);
    this.print(`$ ${cmd}`);
  }
}