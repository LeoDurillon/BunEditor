import ansiEscapes from "ansi-escapes";

export default class Cursor {
  constructor(public posx: number, public posy: number) {
    this.set();
  }

  write(value: string) {
    process.stdout.write(value);
  }

  set() {
    return this.write(ansiEscapes.cursorTo(this.posx, this.posy));
  }

  clear() {
    return this.write(ansiEscapes.clearScreen);
  }

  show() {
    return this.write(ansiEscapes.cursorShow);
  }

  hide() {
    return this.write(ansiEscapes.cursorHide);
  }

  move(x: number, y: number) {
    this.posx = x;
    this.posy = y;
    return this.set();
  }
}
