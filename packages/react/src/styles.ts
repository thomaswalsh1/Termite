const css = `
.termite-root {
  --termite-bg:   #000000;
  --termite-text: #ffffff;
  --termite-font: ui-monospace, 'Cascadia Code', 'Fira Code', Consolas, monospace;
  --termite-font-size: 14px;

  font-family:    var(--termite-font);
  font-size:      var(--termite-font-size);
  line-height:    1.6;
  color:          var(--termite-text);
  background:     var(--termite-bg);
  display:        flex;
  flex-direction: column;
  overflow-y:     auto;
}

.termite-history {
  display:        flex;
  flex-direction: column;
}

.termite-entry,
.termite-command,
.termite-output {
  margin: 0;
}

.termite-command {
  display:     flex;
  align-items: baseline;
  gap:         1ch;
}

.termite-output {
  white-space: pre-wrap;
}

.termite-form {
  display:     flex;
  align-items: center;
  gap:         1ch;
}

.termite-input {
  flex:        1;
  background:  none;
  border:      none;
  outline:     none;
  color:       var(--termite-text);
  font-family: var(--termite-font);
  font-size:   var(--termite-font-size);
  line-height: 1.6;
}
`;

let injected = false;

export function injectStyles() {
  if (injected || typeof document === "undefined") return;
  const style = document.createElement("style");
  style.setAttribute("data-termite", "");
  style.textContent = css;
  document.head.appendChild(style);
  injected = true;
}
