import Action from "./action";
import Key from "./key/key";

export default {
  //ARROW
  arrUp: ["move:up"],
  arrDown: ["move:down"],
  arrRight: ["move:right"],
  arrLeft: ["move:left"],
  ctrlArrUp: undefined,
  ctrlArrDown: undefined,
  ctrlArrRight: undefined,
  ctrlArrLeft: undefined,
  altArrUp: undefined,
  altArrDown: undefined,
  altArrRight: undefined,
  altArrLeft: undefined,
  ctrlAltArrRight: undefined,
  ctrlAltArrLeft: undefined,

  //ACTION KEY
  ESC: ["mode:visual"],
  return: ["action:remove"],
  ctrlReturn: undefined,
  ctrlAltReturn: undefined,
  enter: ["insert:\r"],
  altEnter: undefined,
  tab: ["insert:\t"],
  shiftTab: undefined,
  space: ["insert: "],
  ctrlSpace: undefined,
  ctrlAltSpace: undefined,

  //LETTER
  a: ["insert:a"],
  b: ["insert:b"],
  c: ["insert:c"],
  d: ["insert:d"],
  e: ["insert:e"],
  f: ["insert:f"],
  g: ["insert:g"],
  h: ["insert:h"],
  i: ["insert:i"],
  j: ["insert:j"],
  k: ["insert:k"],
  l: ["insert:l"],
  m: ["insert:m"],
  n: ["insert:n"],
  o: ["insert:o"],
  p: ["insert:p"],
  q: ["insert:q"],
  r: ["insert:r"],
  s: ["insert:s"],
  t: ["insert:t"],
  u: ["insert:u"],
  v: ["insert:v"],
  w: ["insert:w"],
  x: ["insert:x"],
  y: ["insert:y"],
  z: ["insert:z"],

  shiftA: ["insert:A"],
  shiftB: ["insert:B"],
  shiftC: ["insert:C"],
  shiftD: ["insert:D"],
  shiftE: ["insert:E"],
  shiftF: ["insert:F"],
  shiftG: ["insert:G"],
  shiftH: ["insert:H"],
  shiftI: ["insert:I"],
  shiftJ: ["insert:J"],
  shiftK: ["insert:K"],
  shiftL: ["insert:L"],
  shiftM: ["insert:M"],
  shiftN: ["insert:N"],
  shiftO: ["insert:O"],
  shiftP: ["insert:P"],
  shiftQ: ["insert:Q"],
  shiftR: ["insert:R"],
  shiftS: ["insert:S"],
  shiftT: ["insert:T"],
  shiftU: ["insert:U"],
  shiftV: ["insert:V"],
  shiftW: ["insert:W"],
  shiftX: ["insert:X"],
  shiftY: ["insert:Y"],
  shiftZ: ["insert:Z"],

  ctrlA: undefined,
  ctrlB: undefined,
  ctrlC: ["action:copy"],
  ctrlD: undefined,
  ctrlE: undefined,
  ctrlF: undefined,
  ctrlG: undefined,
  ctrlH: undefined,
  ctrlI: undefined,
  ctrlJ: undefined,
  ctrlK: undefined,
  ctrlL: undefined,
  ctrlM: undefined,
  ctrlN: undefined,
  ctrlO: undefined,
  ctrlP: undefined,
  ctrlQ: undefined,
  ctrlR: undefined,
  ctrlS: undefined,
  ctrlT: undefined,
  ctrlU: undefined,
  ctrlV: ["action:paste"],
  ctrlW: undefined,
  ctrlX: undefined,
  ctrlY: undefined,
  ctrlZ: undefined,

  altA: undefined,
  altB: undefined,
  altC: undefined,
  altD: undefined,
  altE: undefined,
  altF: undefined,
  altG: undefined,
  altH: undefined,
  altI: undefined,
  altJ: undefined,
  altK: undefined,
  altL: undefined,
  altM: undefined,
  altN: undefined,
  altO: undefined,
  altP: undefined,
  altQ: undefined,
  altR: undefined,
  altS: undefined,
  altT: undefined,
  altU: undefined,
  altV: undefined,
  altW: undefined,
  altX: undefined,
  altY: undefined,
  altZ: undefined,

  ctrlAltA: undefined,
  ctrlAltB: undefined,
  ctrlAltC: undefined,
  ctrlAltE: undefined,
  ctrlAltF: undefined,
  ctrlAltG: undefined,
  ctrlAltH: undefined,
  ctrlAltI: undefined,
  ctrlAltJ: undefined,
  ctrlAltK: undefined,
  ctrlAltL: undefined,
  ctrlAltM: undefined,
  ctrlAltN: undefined,
  ctrlAltO: undefined,
  ctrlAltP: undefined,
  ctrlAltQ: undefined,
  ctrlAltR: undefined,
  ctrlAltS: undefined,
  ctrlAltT: undefined,
  ctrlAltU: undefined,
  ctrlAltV: undefined,
  ctrlAltW: undefined,
  ctrlAltX: undefined,
  ctrlAltY: undefined,
  ctrlAltZ: undefined,

  //NUMBER
  1: ["insert:1"],
  2: ["insert:2"],
  3: ["insert:3"],
  4: ["insert:4"],
  5: ["insert:5"],
  6: ["insert:6"],
  7: ["insert:7"],
  8: ["insert:8"],
  9: ["insert:9"],

  ctrlShift1: undefined,
  ctrlShift2: undefined,
  ctrlShift3: undefined,
  ctrlShift4: undefined,
  ctrlShift5: undefined,
  ctrlShift6: undefined,
  ctrlShift7: undefined,
  ctrlShift8: undefined,

  altShift1: undefined,
  altShift2: undefined,
  altShift3: undefined,
  altShift4: undefined,
  altShift5: undefined,
  altShift6: undefined,
  altShift7: undefined,
  altShift8: undefined,
  altShift9: undefined,

  // SPECIAL KEY

  ",": ["insert:,"],
  ";": ["insert:;"],
  ":": ["insert::"],
  "!": ["insert:!"],
  "?": ["insert:?"],
  ".": ["insert:."],
  "/": ["insert:/"],
  "§": ["insert:§"],
  "~": ["insert:~"],
  "#": ["insert:#"],
  "{": ["insert:{"],
  "[": ["insert:["],
  "|": ["insert:|"],
  "`": ["insert:`"],
  "^": ["insert:^"],
  "@": ["insert:@"],
  "]": ["insert:]"],
  "}": ["insert:}"],
  "alt,": undefined,
  "alt;": undefined,
  "alt:": undefined,
  "alt!": undefined,
  alt1: undefined,
  alt2: undefined,
  alt3: undefined,
  alt4: undefined,
  alt5: undefined,
  alt6: undefined,
  alt7: undefined,
  alt8: undefined,
  alt9: undefined,
  alt0: undefined,
  "alt)": undefined,
  "alt=": undefined,
} satisfies Record<Key, `${Action}${string}`[] | undefined>;