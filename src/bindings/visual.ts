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
  ESC: undefined,
  return: undefined,
  ctrlReturn: undefined,
  ctrlAltReturn: undefined,
  enter: undefined,
  altEnter: undefined,
  tab: undefined,
  shiftTab: undefined,
  space: undefined,
  ctrlSpace: undefined,
  ctrlAltSpace: undefined,

  //LETTER
  a: undefined,
  b: undefined,
  c: undefined,
  d: undefined,
  e: undefined,
  f: undefined,
  g: undefined,
  h: undefined,
  i: ["mode:insert"],
  j: undefined,
  k: undefined,
  l: undefined,
  m: undefined,
  n: undefined,
  o: undefined,
  p: undefined,
  q: undefined,
  r: undefined,
  s: undefined,
  t: undefined,
  u: undefined,
  v: undefined,
  w: undefined,
  x: undefined,
  y: undefined,
  z: undefined,

  shiftA: undefined,
  shiftB: undefined,
  shiftC: undefined,
  shiftD: undefined,
  shiftE: undefined,
  shiftF: undefined,
  shiftG: undefined,
  shiftH: undefined,
  shiftI: undefined,
  shiftJ: undefined,
  shiftK: undefined,
  shiftL: undefined,
  shiftM: undefined,
  shiftN: undefined,
  shiftO: undefined,
  shiftP: undefined,
  shiftQ: undefined,
  shiftR: undefined,
  shiftS: undefined,
  shiftT: undefined,
  shiftU: undefined,
  shiftV: undefined,
  shiftW: undefined,
  shiftX: undefined,
  shiftY: undefined,
  shiftZ: undefined,

  ctrlA: undefined,
  ctrlB: undefined,
  ctrlC: undefined,
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
  ctrlV: undefined,
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
  1: undefined,
  2: undefined,
  3: undefined,
  4: undefined,
  5: undefined,
  6: undefined,
  7: undefined,
  8: undefined,
  9: undefined,

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

  ",": undefined,
  ";": undefined,
  ":": undefined,
  "!": undefined,
  "?": undefined,
  ".": undefined,
  "/": undefined,
  "§": undefined,
  "~": undefined,
  "#": undefined,
  "{": undefined,
  "[": undefined,
  "|": undefined,
  "`": undefined,
  "^": undefined,
  "@": undefined,
  "]": undefined,
  "}": undefined,
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