import { mkdir } from "node:fs/promises";

let file = Bun.file(`key/key.txt`);
await mkdir("./key", { recursive: true });
const stream = Bun.stdin.stream();
process.stdin.setRawMode(true);

await getKey(stream);

async function getKey(stream: ReadableStream<any>) {
  let value: Array<{ code: Uint8Array; buffer: string }> = [];
  for await (const chunk of stream) {
    console.log(
      JSON.stringify({ code: chunk, buffer: Buffer.from(chunk).toString() })
    );
  }
}
