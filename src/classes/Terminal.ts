import ActionString from "../bindings/action";
import * as Action from "../services/action";
import * as Move from "../services/move";
import Cursor from "./Cursor";
import type Program from "./Program";
import State from "./State";

export default class Terminal {
  public mode: "visual" | "select" | "insert";
  public cursor: Cursor;

  public selection: string;
  public state: State;

  constructor(
    public write: (value: string) => void,
    public text: Buffer,
    public program: Program
  ) {
    this.mode = "visual";

    this.cursor = new Cursor(0, 0);
    this.cursor.clear();

    this.selection = "";
    this.state = new State(this);
  }

  draw() {
    this.cursor.clear();
    this.cursor.hide();
    const text = this.text
      .toString()
      .split("\n")
      .slice(this.state.screenOffsetY);

    for (let i = 0; i < this.state.height; i++) {
      this.write(`${text[i] ? text[i] : ""} \n`);
    }

    this.write("\n");
    this.write("MODE:" + this.mode.toUpperCase());
    this.cursor.posCalc(this.state.pos, this.state.length, this.state);
    this.state.update(this);
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
          else this.updateMode(split[1] as "visual" | "insert" | "select");
          break;
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
      this.update();
      this.draw();
    }
  }

  insert(key: string) {
    this.text = Buffer.from(
      this.text.toString().slice(0, this.state.pos - 1) +
        key +
        this.text.toString().slice(this.state.pos - 1)
    );

    this.move("right");
  }

  updateMode(mode: "visual" | "insert" | "select") {
    this.mode = mode;
  }

  move(dir: keyof typeof Move, redraw: boolean = false) {
    if (!(dir in Move)) return;

    Move[dir](this.state, this.cursor.posy, this.cursor.posx);
  }

  update() {
    this.state.update(this);
    this.cursor.posCalc(this.state.pos, this.state.length, this.state);
  }

  action(action: keyof typeof Action) {
    if (!(action in Action)) return;
    Action[action](this);
    this.draw();
  }
}
