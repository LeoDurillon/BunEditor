const ActionKey = {
  "\u001b": "ESC",
  _: "return",
  "\b": "ctrlReturn",
  "\u001b\b": "ctrlAltReturn",
  "\r": "enter",
  "\u001b\r": "altEnter",
  "\t": "tab",
  "\u001b[Z": "shiftTab",
  " ": "space",
  "\u0000": "ctrlSpace",
  "\u001b\u0000": "ctrlAltSpace",
};

export default ActionKey;
