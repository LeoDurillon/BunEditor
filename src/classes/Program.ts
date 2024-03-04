import ansiEscapes from "ansi-escapes";
import { BunFile } from "bun";
import { mkdir } from "node:fs/promises";
import bindings from "../bindings/bindings";
import ActionKey from "../bindings/key/ActionKey";
import ArrowKey from "../bindings/key/ArrowKey";
import SpecialKey from "../bindings/key/SpecialKey";
import Terminal from "./Terminal";

export default class Program {
  public appFolder = "./test-editor";
  public logFile: BunFile;

  public file: BunFile;
  public text: Array<Array<string>>;
  public originalFile: string;

  public stream: ReadableStream<any>;

  public terminal: Terminal | undefined;

  constructor(file: BunFile) {
    mkdir(this.appFolder, { recursive: true });
    this.logFile = Bun.file(`${this.appFolder}/log.txt`);

    this.file = file;
    this.text = [];
    this.originalFile = "";

    this.stream = Bun.stdin.stream();

    this.terminal = undefined;
  }

  mergeText(value: Array<Array<string>>) {
    return value.map((line) => line.join("")).join("\n");
  }

  async getText(file: BunFile) {
    return (await file.text()).split("\n").map((line) => [...line]);
  }

  async start() {
    this.text = await this.getText(this.file);
    this.originalFile = this.mergeText(this.text);

    this.terminal = new Terminal(this.write, this.text, this);

    this.terminal.draw(true);

    while (true) {
      await this.getKey();
    }
  }

  async getKey() {
    for await (const chunk of this.stream) {
      if (!this.terminal) throw Error("Terminal should exists now");
      let value: string | number = Buffer.from(chunk).toString();
      if (chunk[0] === 127) value = "_";
      if (parseInt(value, 10)) value = parseInt(value, 10);
      if (value in ActionKey)
        value = ActionKey[value as keyof typeof ActionKey];
      if (value in SpecialKey)
        value = SpecialKey[value as keyof typeof SpecialKey];
      if (value in ArrowKey) value = ArrowKey[value as keyof typeof ArrowKey];
      if (value in SpecialKey)
        value = SpecialKey[value as keyof typeof SpecialKey];

      this.terminal.parseKey(bindings[this.terminal.mode][value]);
    }
  }

  write(value: string) {
    Bun.write(Bun.stdout, value);
  }

  async error(value: unknown) {
    this.write(ansiEscapes.clearScreen);
    console.error(value);
    if (await this.logFile.exists()) {
      const txt = (await this.logFile.text()) + `\n${value}`;
      Bun.write(this.logFile, txt);
    } else {
      const txt = `${value}`;
      Bun.write(this.logFile, txt);
    }

    this.kill(false);
  }

  action(
    value:
      | "exit"
      | "up"
      | "down"
      | "left"
      | "right"
      | "screenUp"
      | "screenDown"
      | "wordLeft"
      | "wordRight"
      | undefined
  ) {
    if (!this.terminal) throw Error("Terminal should be started now");

    switch (value) {
      case "exit": {
        this.kill(true);
        break;
      }
      case "up": {
        this.terminal.move("up");
        break;
      }
      case "down": {
        this.terminal.move("down");
        break;
      }
      case "right": {
        this.terminal.move("right");
        break;
      }
      case "left": {
        this.terminal.move("left");
        break;
      }
      default: {
        return;
      }
    }
    this.terminal.draw();
  }

  kill(clear: boolean = true) {
    if (clear) this.write(ansiEscapes.clearScreen);
    return process.exit(1);
  }
}
