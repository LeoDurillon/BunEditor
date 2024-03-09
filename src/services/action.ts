import clipboard from "clipboardy";
import Terminal from "../classes/Terminal";
import * as Text from "../services/text";
export function copy(terminal: Terminal) {
  clipboard.writeSync(terminal.selection);
  terminal.selection = "";
}

export function paste(terminal: Terminal) {
  const value = Text.Split(clipboard.readSync());
  terminal.text = [
    ...terminal.text.slice(0, terminal.screenOffsetY + terminal.row),
    ...value.map((e, i) => {
      if (
        terminal.col !==
        terminal.text.slice(terminal.screenOffsetY)[terminal.row].length
      ) {
        value[i + 1] = [
          ...(!!value[i + 1] ? value[i + 1] : []),
          ...terminal.text
            .slice(terminal.screenOffsetY)
            [terminal.row].slice(terminal.col),
        ];
        return [
          ...terminal.text
            .slice(terminal.screenOffsetY)
            [terminal.row].slice(0, terminal.col),
          ...e,
        ];
      } else {
        return [
          ...terminal.text.slice(terminal.screenOffsetY + i)[terminal.row],
          ...e,
        ];
      }
    }),
    ...terminal.text.slice(
      terminal.screenOffsetY + terminal.row + value.length
    ),
  ];

  for (let i = 1; i < value.length - 1; i++) {
    terminal.move("down");
  }
  terminal.col = terminal.text[terminal.screenOffsetY + terminal.row].length;
}

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
