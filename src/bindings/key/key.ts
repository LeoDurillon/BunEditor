import ActionKey from "./ActionKey";
import ArrowKey from "./ArrowKey";
import Letter from "./Letter";
import Number from "./Number";
import SpecialKey from "./SpecialKey";

type LetterKey = keyof typeof Letter;
type NumberKey = keyof typeof Number;
type SpecialKeyKey = keyof typeof SpecialKey;
type ArrowKeyKey = keyof typeof ArrowKey;
type ActionKeyKey = keyof typeof ActionKey;

type Key =
  | (typeof Letter)[LetterKey]
  | (typeof Number)[NumberKey]
  | (typeof ActionKey)[ActionKeyKey]
  | (typeof ArrowKey)[ArrowKeyKey]
  | (typeof SpecialKey)[SpecialKeyKey]
  | number;

export default Key;
