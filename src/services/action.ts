import clipboard from "clipboardy";
import Terminal from "../classes/Terminal";

export function copy(terminal: Terminal) {
  clipboard.writeSync(terminal.selection);
  terminal.selection = "";
}

export function paste(terminal: Terminal) {
  const value = clipboard.readSync();
  terminal.text = Buffer.from(
    terminal.text.toString().slice(0, terminal.state.pos - 1) +
      value +
      terminal.text.toString().slice(terminal.state.pos - 1)
  );

  terminal.state.pos += value.length;
}

export function remove(terminal: Terminal) {
  terminal.text = Buffer.from(
    terminal.text.toString().slice(0, terminal.state.pos - 2) +
      terminal.text.toString().slice(terminal.state.pos - 1)
  );

  terminal.move("left");
}
