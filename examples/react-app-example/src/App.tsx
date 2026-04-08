import React from "react";
import { Terminal, useTerminal } from "termite-react";

export default function App() {
  const term = useTerminal("/home/user");
  return <Terminal terminal={term} theme="dark" />;
}