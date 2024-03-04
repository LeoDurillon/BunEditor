import Terminal from "../classes/Terminal";

export function down(terminal: Terminal) {
  if (terminal.row === terminal.height - 1) return;
  if (
    terminal.col >=
    terminal.text.slice(terminal.screenOffsetY)[terminal.row].length
  ) {
    terminal.col = terminal.text.slice(terminal.screenOffsetY)[
      terminal.row + 1
    ].length;
  }
  if (
    terminal.screenOffsetY + terminal.height + 1 <= terminal.text.length &&
    terminal.row + 1 > Math.floor((process.stdout.rows - 3) / 2)
  ) {
    ++terminal.screenOffsetY;
  } else if (terminal.row < terminal.height - 1) {
    ++terminal.row;
  }
}

export function up(terminal: Terminal) {
  if (terminal.screenOffsetY === 0 && terminal.row === 0) return;
  if (
    terminal.col >=
    terminal.text.slice(terminal.screenOffsetY)[terminal.row].length
  ) {
    terminal.col = terminal.text.slice(terminal.screenOffsetY)[
      terminal.row - 1
    ].length;
  }
  if (terminal.screenOffsetY > 0) {
    --terminal.screenOffsetY;
  } else if (terminal.row > 0) {
    --terminal.row;
  }
}

export function left(terminal: Terminal) {
  if (terminal.col === 0) {
    return up(terminal);
  }

  --terminal.col;
}

export function right(terminal: Terminal) {
  if (
    terminal.col ===
    terminal.text.slice(terminal.screenOffsetY)[terminal.row].length
  ) {
    return down(terminal);
  }

  ++terminal.col;
}
