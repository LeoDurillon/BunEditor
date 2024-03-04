import Action from "./action";
import insert from "./insert";
import Key from "./key/key";
import select from "./select";
import visual from "./visual";

type Bindings = Record<
  "insert" | "visual" | "select",
  Record<Key, `${Action}${string}`[] | undefined>
>;

const bindings: Bindings = {
  visual,
  insert,
  select,
};

export default bindings;
