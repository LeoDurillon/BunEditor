import ActionString from "../bindings/action";
import * as Action from "../services/action";
import * as Move from "../services/move";
import Cursor from "./Cursor";
import Program from "./Program";
export default class Terminal {
  public mode: "visual" | "select" | "insert";
  public col: number;
  public row: number;
  public screenOffsetX: number;
  public screenOffsetY: number;
  public width: number;
  public height: number;
  public cursor: Cursor;

  constructor(
    public write: (value: string) => void,
    public text: string[][],
    public program: Program
  ) {
    this.col = 0;
    this.row = Math.floor((process.stdout.rows - 3) / 2);
    this.mode = "visual";
    this.screenOffsetX = 0;
    this.screenOffsetY = 0;
    this.width = process.stdout.columns - 3;
    this.height = process.stdout.rows - 3;
    this.cursor = new Cursor(this.col, this.row);
    this.cursor.clear();
  }

  draw(init: boolean = false) {
    this.cursor.clear();
    this.cursor.hide();
    for (let row = 0; row < this.height; row++) {
      this.write("\n");
      for (let col = 0; col < this.width; col++) {
        if (!this.text.slice(this.screenOffsetY)[row]) return;
        this.write(
          this.text.slice(this.screenOffsetY)[row].slice(this.screenOffsetX)[
            col
          ] ?? ""
        );
      }
    }
    this.write("\n");
    this.write("Mode:" + this.mode);
    this.cursor.move(this.col, this.row + 1);
    this.cursor.show();
  }

  parseKey(actions?: `${ActionString}${string}`[]) {
    if (!actions) return;
    for (const action of actions) {
      const split = action.split(":");
      switch (split[0]) {
        case "mode": {
          if (!["visual", "select", "insert"].includes(split[1]))
            throw Error("command not recognize");
          else
            return this.updateMode(split[1] as "visual" | "insert" | "select");
        }
        case "insert": {
          this.insert(split[1]);
          break;
        }
        case "action": {
          this.action(split[1] as keyof typeof Action);
          break;
        }
        case "move": {
          this.move(split[1] as keyof typeof Move);
          break;
        }
      }
    }
  }

  insert(key: string) {
    switch (key) {
      case "\r": {
        this.text = [
          ...this.text.slice(0, this.row + this.screenOffsetY),
          [],
          ...this.text.slice(this.row + this.screenOffsetY),
        ];
        this.move("down");
      }
      default: {
        const text = this.text.slice(this.screenOffsetY)[this.row];
        if (this.col === text.length) {
          this.text.slice(this.screenOffsetY)[this.row].push(key);
        } else {
          this.text[this.row + this.screenOffsetY] = [
            ...text.slice(0, this.col),
            key,
            ...text.slice(this.col),
          ];
        }
        this.move("right");
      }
    }
    this.draw();
  }

  updateMode(mode: "visual" | "insert" | "select") {
    this.mode = mode;
    this.draw();
  }

  move(dir: keyof typeof Move, redraw: boolean = false) {
    if (!(dir in Move)) return;
    Move[dir](this);

    this.cursor.move(this.col, this.row + 1);

    this.draw();
  }

  action(action: keyof typeof Action) {
    if (!(action in Action)) return;
    Action[action](this);

    this.draw();
  }
}
