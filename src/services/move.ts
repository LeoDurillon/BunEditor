import State from "../classes/State";

export function down(state: State, row: number, col: number) {
  const rowWithOffset = row + state.screenOffsetY;

  if (row === state.height) return;

  if (state.length[rowWithOffset + 1] < col || col >= state.rowLength) {
    state.pos += state.rowLength - col + state.length[rowWithOffset + 1] - 1;
  } else {
    state.pos += state.rowLength;
  }
}

export function up(state: State, row: number, col: number) {
  const rowWithOffset = row + state.screenOffsetY;

  if (row === 0) return;
  if (col >= state.rowLength || state.length[rowWithOffset - 1] < col) {
    state.pos -= col + 1;
  } else {
    state.pos -= state.length[rowWithOffset - 1];
  }
}

export function left(state: State, row: number, col: number) {
  if (state.pos === 1) return;

  --state.pos;
}

export function right(state: State, row: number, col: number) {
  if (state.pos === state.maxPos) return;

  ++state.pos;
}
