
# Termite v0.1.0
```
 _____                    _ _       
/__   \___ _ __ _ __ ___ (_) |_ ___ 
  / /\/ _ \ '__| '_ ' _ \| | __/ _ \
 / / |  __/ |  | | | | | | | ||  __/
 \/   \___|_|  |_| |_| |_|_|\__\___|
```

Termite is a highly-customizable terminal UI Component that puts a terminal onto your React webpage.



## Installation

Install Termite with npm

```bash
  npm install termite-react
```
    
## Usage/Examples

### Basic terminal
```typescript
import { useTerminal, type TerminalContext, Terminal } from "termite-react";

function App() {
  /* Use your own mapper function for handling commands */
  const mapper = (cmd: string, ctx: TerminalContext): string => {
    if (cmd === "boston") {
      return "";
    } else if (cmd === "clear") {
      ctx?.clear();
      return "";
    } else {
      return "Command Not Found.";
    }
  };

  const terminal = useTerminal(
    async (cmd, ctx) => {
      return mapper(cmd, ctx);
    },
    {
      cwd: "user@termite.ui",
      prompt: "$",
    },
  );

  return (
    <>
      <div className="terminal-container">
        <Terminal
          className="terminal"
          classNames={{
            output: "terminal-output"
          }}
          state={terminal.state}
          onInput={terminal.onInput}
          onSubmit={terminal.onSubmit}
        />
      </div>
    </>
  );
}

export default App;
```

### Log only
```typescript
import { useLogger, Terminal } from "termite-react";

function App() {
  const terminal = useLogger({ cwd: "termite@termite.ui" });
  return (
    <>
      <button onClick={() => terminal.log("An error happened.", "error")}>
        Cause an error
      </button>
      <div className="terminal-container">
        <Terminal
          className="terminal"
          classNames={{
            output: "terminal-output",
          }}
          state={terminal.state}
        />
      </div>
    </>
  );
}

export default App;

```


## Contributing

As of the current version, contribution guidelines have not been set up yet. Stay tuned!

## Authors

- [@thomaswalsh1](https://www.github.com/thomaswalsh1)

