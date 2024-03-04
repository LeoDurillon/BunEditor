import Terminal from "../classes/Terminal";

export function copy(terminal: Terminal) {}

export function paste(terminal: Terminal) {}

export function remove(terminal: Terminal) {
  const text = terminal.text.slice(terminal.screenOffsetY)[terminal.row];
  if (!text.length) {
    terminal.text = [
      ...terminal.text.slice(0, terminal.screenOffsetY + terminal.row),
      ...terminal.text.slice(terminal.screenOffsetY + terminal.row + 1),
    ];
    terminal.move("up");
  } else if (terminal.col === 0) {
    terminal.text[terminal.row - 1 + terminal.screenOffsetY] = [
      ...terminal.text.slice(terminal.screenOffsetY)[terminal.row - 1],
      ...text,
    ];
    terminal.text = [
      ...terminal.text.slice(0, terminal.screenOffsetY + terminal.row),
      ...terminal.text.slice(terminal.screenOffsetY + terminal.row + 1),
    ];
    terminal.col = terminal.text.slice(terminal.screenOffsetY)[
      terminal.row - 1
    ].length;
    terminal.move("up");
  } else {
    terminal.text[terminal.row + terminal.screenOffsetY] = [
      ...text.slice(0, terminal.col - 1),
      ...text.slice(terminal.col),
    ];
    terminal.move("left");
  }
}
