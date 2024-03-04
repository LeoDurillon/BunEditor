import readline from "readline";
import Program from "./src/classes/Program";

const stdin = process.stdin;
const stdout = process.stdout;
readline.emitKeypressEvents(stdin);
// Don't wait for enter to be pressed to send key to stream
stdin.setRawMode(true);

const file = getFile();

const program = new Program(file);

await program.start();

function getFile() {
  const args = Bun.argv.at(-1) as string;

  return Bun.file(args);
}
