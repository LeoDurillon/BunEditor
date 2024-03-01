import readline from "readline";
import Program from "./src/classes/Program";

const stdin = process.stdin;
const stdout = process.stdout;
readline.emitKeypressEvents(stdin);
// Don't wait for enter to be pressed to send key to stream
stdin.setRawMode(true);
//const specialKey = {
//   27: "ESC",
//   32: "space",
//   127: "return",
// };
const file = getFile();

const program = new Program(file);

await program.start();

function getFile() {
  const args = Bun.argv.at(-1) as string;
  return Bun.file(args);
}

function mergeText(value: Array<Array<string>>) {
  return value.map((line) => line.join("")).join("\n");
}
