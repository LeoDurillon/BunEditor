import ansiEscapes from "ansi-escapes";
import { mkdir } from "node:fs/promises";
import readline from "readline";
import Terminal from "./src/terminal";

const stdin = process.stdin;
const stdout = process.stdout;
readline.emitKeypressEvents(stdin);
// Don't wait for enter to be pressed to send key to stream
stdin.setRawMode(true);
const specialKey = {
  27: "ESC",
  32: "space",
  127: "return",
};

const localFolder = `${process.env.HOME}/.local`;
const stateFolder = `./test-editor`;
const file = getFile();

const initial = (await file.text()).split("\n").map((line) => [...line]);
const originalFile = mergeText(initial);

mkdir(stateFolder, { recursive: true });
const logFile = Bun.file(`${stateFolder}/log.txt`);

const terminal = new Terminal(write, initial);

const stream = Bun.stdin.stream();

draw();

while (true) {
  await getKey(stream);
}

function getFile() {
  const args = Bun.argv.at(-1) as string;
  console.log(args);
  if (!args) throw error("Must contain a valid file name");
  return Bun.file(args);
}

function draw() {
  terminal.draw(true);
}

function write(value: string) {
  Bun.write(Bun.stdout, value);
}

function save(value: string) {
  Bun.write(file, value);
}

async function error(value: unknown) {
  console.error(value);
  if (await logFile.exists()) {
    const txt = (await logFile.text()) + `\n${value}`;
    Bun.write(logFile, txt);
  } else {
    const txt = `${value}`;
    Bun.write(logFile, txt);
  }
}

function mergeText(value: Array<Array<string>>) {
  return value.map((line) => line.join("")).join("\n");
}

async function getKey(stream: ReadableStream<any>) {
  const direction: Record<string, "right" | "down" | "left" | "up"> = {
    l: "right",
    k: "down",
    j: "left",
    i: "up",
  };

  for await (const chunk of stream) {
    const code = chunk as Uint8Array;

    switch (code[0]) {
      case 27: {
        exitProgram();
        break;
      }
      case 127: {
        terminal.remove();
        break;
      }
      default: {
        const chunkText =
          code[0] < 27
            ? "^" + Buffer.from([chunk[0] + 64]).toString()
            : Buffer.from(chunk).toString();

        if (chunkText.includes("^")) controlAction(chunkText.slice(1));
        else if (chunkText in direction)
          terminal.move(direction[chunkText], true);
        else terminal.sendKey(chunkText);
      }
    }
  }
}

function controlAction(key: string) {
  switch (key) {
    case "M": {
      terminal.sendKey("\n");
    }
  }
}

function exitProgram() {
  write(ansiEscapes.clearScreen);
  return process.exit(1);
}
