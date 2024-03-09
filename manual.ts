//import { mkdir } from "node:fs/promises";

//import clipboard from "clipboardy";

// let file = Bun.file(`key/key.txt`);
// await mkdir("./key", { recursive: true });
// const stream = Bun.stdin.stream();
// process.stdin.setRawMode(true);

// await getKey(stream);

// async function getKey(stream: ReadableStream<any>) {
//   let value: Array<{ code: Uint8Array; buffer: string }> = [];
//   for await (const chunk of stream) {
//     console.log(
//       JSON.stringify({ code: chunk, buffer: Buffer.from(chunk).toString() })
//     );
//   }
// }

// const val = clipboard.readSync();
// console.log(val);

import readline from "readline";

const stdin = process.stdin;
const stdout = process.stdout;
readline.emitKeypressEvents(stdin);
// Don't wait for enter to be pressed to send key to stream
stdin.setRawMode(true);

const file = getFile();

const buffer = Buffer.from((await file.text()).slice(0, 50));

const buffer2 = Buffer.from(await file.arrayBuffer());

console.log(buffer.toString().length);

function getFile() {
  const args = Bun.argv.at(-1) as string;

  return Bun.file(args);
}
