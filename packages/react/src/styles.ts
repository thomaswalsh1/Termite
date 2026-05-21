const css = `
.termite-root {
  --termite-bg:         #000000;
  --termite-text:       #ffffff;
  --termite-font:       ui-monospace, 'Cascadia Code', 'Fira Code', Consolas, monospace;
  --termite-font-size:  14px;
  --termite-title-bg:   #2a2a2a;
  --termite-title-text: #9a9a9a;

  font-family:    var(--termite-font);
  font-size:      var(--termite-font-size);
  line-height:    1.6;
  color:          var(--termite-text);
  background:     var(--termite-bg);
  caret-color:    transparent;
  display:        flex;
  flex-direction: column;
  overflow:       hidden;
}

.termite-titlebar {
  display:       flex;
  align-items:   center;
  padding:       10px 12px;
  background:    var(--termite-title-bg);
  border-bottom: 1px solid rgba(128, 128, 128, 0.2);
  flex-shrink:   0;
  user-select:   none;
  position:      relative;
}

.termite-titlebar-dots {
  display: flex;
  gap:     6px;
  z-index: 1;
}

.termite-dot {
  width:         12px;
  height:        12px;
  border-radius: 50%;
}

.termite-dot-red    { background: #ff5f57; }
.termite-dot-yellow { background: #febc2e; }
.termite-dot-green  { background: #28c840; }

.termite-titlebar-title {
  position:       absolute;
  left:           0;
  right:          0;
  text-align:     center;
  font-size:      12px;
  color:          var(--termite-title-text);
  font-family:    var(--termite-font);
  pointer-events: none;
}

.termite-body {
  flex:       1;
  overflow-y: auto;
  min-height: 0;
  padding:    8px 12px;
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

.termite-input-wrapper {
  flex:        1;
  position:    relative;
  display:     flex;
  align-items: center;
}

.termite-input-display {
  position:       absolute;
  inset:          0;
  display:        flex;
  align-items:    center;
  pointer-events: none;
  font-family:    var(--termite-font);
  font-size:      var(--termite-font-size);
  line-height:    1.6;
  white-space:    pre;
}

.termite-cursor {
  background: var(--termite-text);
  color:      var(--termite-bg);
  animation:  termite-blink 1s step-end infinite;
}

@keyframes termite-blink {
  50% { opacity: 0; }
}

.termite-input {
  flex:        1;
  width:       100%;
  background:  none;
  border:      none;
  outline:     none;
  color:       transparent;
  caret-color: transparent;
  font-family: var(--termite-font);
  font-size:   var(--termite-font-size);
  line-height: 1.6;
  padding:     0;
}

.termite-input::selection {
  background: transparent;
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
