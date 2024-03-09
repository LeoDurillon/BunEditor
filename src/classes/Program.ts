import ansiEscapes from "ansi-escapes";
import { BunFile } from "bun";
import { mkdir } from "node:fs/promises";
import bindings from "../bindings/bindings";
import ActionKey from "../bindings/key/ActionKey";
import ArrowKey from "../bindings/key/ArrowKey";
import Letter from "../bindings/key/Letter";
import SpecialKey from "../bindings/key/SpecialKey";
import Terminal from "./Terminal";

export default class Program {
  public appFolder = "./test-editor";
  public logFile: BunFile;

  public file: BunFile;
  public text: Buffer;
  public originalFile: string;

  public stream: ReadableStream<any>;

  public terminal: Terminal | undefined;

  constructor(file: BunFile) {
    mkdir(this.appFolder, { recursive: true });
    this.logFile = Bun.file(`${this.appFolder}/log.txt`);

    this.file = file;
    this.text = Buffer.from("");
    this.originalFile = "";

    this.stream = Bun.stdin.stream();

    this.terminal = undefined;
  }

  async start() {
    const text = await this.file.text();
    this.text = Buffer.from(text);
    this.originalFile = text;

    this.terminal = new Terminal(this.write, this.text, this);

    this.terminal.draw();

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
      if (value in Letter) value = Letter[value as keyof typeof Letter];

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

  kill(clear: boolean = true) {
    if (clear) this.write(ansiEscapes.clearScreen);
    return process.exit(1);
  }
}
