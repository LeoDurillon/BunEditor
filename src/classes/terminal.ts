import ansiEscapes from "ansi-escapes";
import Cursor from "./cursor";

export default class Terminal {
  private col: number;
  private row: number;
  private screenOffsetX: number;
  private screenOffsetY: number;
  private width: number;
  private height: number;
  private cursor: Cursor;

  constructor(public write: (value: string) => void, private text: string[][]) {
    this.col = process.stdout.columns;
    this.row = process.stdout.rows;
    this.screenOffsetX = 0;
    this.screenOffsetY = 0;
    this.width = this.col - 3;
    this.height = this.row - 3;
    this.write(ansiEscapes.clearTerminal);
    this.cursor = new Cursor(this.col, this.row);
    //this.resize();
  }

  // resize() {
  //   this.current = this.alocate();
  //   this.next = this.alocate(true);
  // }

  // alocate(after: boolean = false) {
  //   if (after)
  //     return this.text.slice(
  //       process.stdout.rows - this.row + process.stdout.columns - this.col,
  //       -1
  //     );
  //   return this.text.slice(
  //     0,
  //     process.stdout.rows - this.row + process.stdout.columns - this.col
  //   );
  // }

  draw(init: boolean = false) {
    this.cursor.clear();
    this.cursor.hide();
    for (let row = 0; row < this.height; row++) {
      this.write("\n");
      for (let col = 0; col < this.width; col++) {
        this.write(
          this.text.slice(this.screenOffsetY)[row].slice(this.screenOffsetX)[
            col
          ] ?? ""
        );
        if (init && col + 1 === this.width && row + 1 === this.height) {
          this.col = this.text
            .slice(this.screenOffsetY)
            [row].slice(this.screenOffsetX).length;
          this.row = row - 1;
        }
      }
    }
    this.cursor.move(this.col, this.row + 1);
    this.cursor.show();
  }

  move(dir: "left" | "right" | "up" | "down", redraw: boolean = false) {
    switch (dir) {
      case "left": {
        --this.col;

        if (this.col < 0) {
          this.col = this.text[this.row - 1].length;
          this.move("up");
          break;
        }

        break;
      }
      case "right": {
        ++this.col;
        if (!this.text[this.row][this.col - 1]) {
          this.col = this.text[this.row + 1].length;
          this.move("down");
          break;
        }
        break;
      }
      case "up": {
        --this.row;
        if (!this.screenOffsetY && this.row <= 0) {
          this.row = 0;
          break;
        }
        if (this.row <= 0) {
          --this.screenOffsetY;
          this.row = 0;
          break;
        }
        if (!this.text[this.row][this.col]) {
          this.col = this.text[this.row].length;
          break;
        }

        break;
      }
      case "down": {
        ++this.row;

        if (!this.text.slice(this.screenOffsetY)[this.row]) {
          --this.row;
          break;
        }
        if (this.row >= this.height) {
          ++this.screenOffsetY;
          --this.row;
        }
        if (!this.text[this.row][this.col]) {
          this.col = this.text[this.row].length;
        }
        break;
      }
    }
    this.cursor.move(this.col, this.row);
    if (redraw) this.draw();
  }

  sendKey(key: string) {
    switch (key) {
      case "\n": {
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

  remove() {
    const text = this.text.slice(this.screenOffsetY)[this.row];
    if (!text.length) {
      this.text = [
        ...this.text.slice(0, this.screenOffsetY + this.row),
        ...this.text.slice(this.screenOffsetY + this.row + 1),
      ];
      this.move("up");
    } else if (this.col === 0) {
      this.text[this.row - 1 + this.screenOffsetY] = [
        ...this.text.slice(this.screenOffsetY)[this.row - 1],
        ...text,
      ];
      this.text = [
        ...this.text.slice(0, this.screenOffsetY + this.row),
        ...this.text.slice(this.screenOffsetY + this.row + 1),
      ];
      this.col = this.text.slice(this.screenOffsetY)[this.row - 1].length;
      this.move("up");
    } else {
      this.text[this.row + this.screenOffsetY] = [
        ...text.slice(0, this.col - 1),
        ...text.slice(this.col),
      ];
      this.move("left");
    }
    this.draw();
  }
}
