import Terminal from "../classes/terminal";

export function control(key: string, terminal: Terminal) {
  switch (key) {
    case "M": {
      terminal.sendKey("\n");
    }
  }
}
