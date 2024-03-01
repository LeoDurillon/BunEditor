import ansiEscapes from "ansi-escapes";
import { BunFile } from "bun";
import { mkdir } from "node:fs/promises";
import * as Action from "../services/action";
import Terminal from "./terminal";

export default class Program {
  public mode: "visual" | "select" | "insert";
  public appFolder = "./test-editor";
  public logFile: BunFile;

  public file: BunFile;
  public text: Array<Array<string>>;
  public originalFile: string;

  public stream: ReadableStream<any>;

  public terminal: Terminal | undefined;

  constructor(file: BunFile) {
    this.mode = "visual";

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

    this.terminal = new Terminal(this.write, this.text);

    this.terminal.draw(true);

    while (true) {
      await this.getKey();
    }
  }

  async getKey() {
    const direction: Record<string, "right" | "down" | "left" | "up"> = {
      l: "right",
      k: "down",
      j: "left",
      i: "up",
    };

    for await (const chunk of this.stream) {
      if (!this.terminal) throw Error("Terminal should exists now");
      const code = chunk as Uint8Array;

      switch (code[0]) {
        case 27: {
          this.kill();
          break;
        }
        case 127: {
          this.terminal.remove();
          break;
        }
        default: {
          const chunkText =
            code[0] < 27
              ? "^" + Buffer.from([chunk[0] + 64]).toString()
              : Buffer.from(chunk).toString();

          if (chunkText.includes("^"))
            Action.control(chunkText.slice(1), this.terminal);
          else if (chunkText in direction)
            this.terminal.move(direction[chunkText], true);
          else this.terminal.sendKey(chunkText);
          break;
        }
      }
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
