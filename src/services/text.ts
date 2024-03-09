export function Split(text: string) {
  return text.split("\n").map((line) => [...line]);
}

export function Merge(split: Array<Array<string>>) {
  return split.map((line) => line.join("")).join("\n");
}
