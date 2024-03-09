import Terminal from "./Terminal";

export default class State {
  public halfH: number;
  public halfW: number;

  public rowLength: number;
  public length: Array<number>;

  public maxPos: number;

  public pos: number;
  public screenOffsetX: number;
  public screenOffsetY: number;

  public width: number;
  public height: number;

  constructor(terminal: Terminal) {
    this.pos = 1;

    this.screenOffsetX = 0;
    this.screenOffsetY = 0;

    this.width = process.stdout.columns - 3;
    this.height = process.stdout.rows - 3;

    this.halfH = Math.floor(this.height / 2) - 3;
    this.halfW = Math.floor(this.width / 2) - 3;

    this.rowLength = terminal.program.originalFile.split("\n")[0].length + 1;
    this.length = terminal.program.originalFile
      .split("\n")
      .map((e) => e.length + 1);

    this.maxPos = this.length.reduce((p, n) => p + n, 0);
  }

  update(terminal: Terminal) {
    this.rowLength =
      terminal.text.toString().split("\n")[
        terminal.cursor.posy + this.screenOffsetY
      ].length + 1;

    this.length = terminal.text
      .toString()
      .split("\n")
      .map((e) => e.length + 1);

    this.maxPos = this.length.reduce((p, n) => p + n, 0);
  }
}
