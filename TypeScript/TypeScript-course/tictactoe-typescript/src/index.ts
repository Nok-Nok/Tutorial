import './style.css';
const appElement = document.getElementById('app');
const boardElement = document.getElementById('board');
const ROW_COUNT = 3;
const COL_COUNT = 3;

type Cell = 'X' | 'O' | '';
type TicTacToeBoard = [
  [Cell, Cell, Cell],
  [Cell, Cell, Cell],
  [Cell, Cell, Cell]
];

let boardState: TicTacToeBoard = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];
let currentMove: 'X' | 'O' = 'X';
let winner: Cell | 'Draw' = '';

function createCell(
  row: number,
  col: number,
  content: Cell = ''
): HTMLButtonElement {
  const cell = document.createElement('button');
  cell.setAttribute('data-row', row.toString());
  cell.setAttribute('data-col', col.toString());
  cell.setAttribute('data-content', content);
  cell.classList.add('cell');
  cell.onclick = () => {
    if (winner) return;
    if (!boardState[row][col]) {
      boardState[row][col] = currentMove;
      //Update Move
      currentMove = currentMove == 'X' ? 'O' : 'X';
      //Check for winner
      winner = checkBoard();
      //Rerender Board
      renderBoard();
    }
  };
  return cell;
}
type Coordinate = [number, number];
type VictoryType = [Coordinate, Coordinate, Coordinate][];
const vitories: VictoryType = [
  [
    [0, 0],
    [0, 1],
    [0, 2],
  ],
  [
    [1, 0],
    [1, 1],
    [1, 2],
  ],
  [
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  [
    [0, 0],
    [1, 0],
    [2, 0],
  ],
  [
    [0, 1],
    [1, 1],
    [2, 1],
  ],
  [
    [0, 2],
    [1, 2],
    [2, 2],
  ],
  [
    [0, 0],
    [1, 1],
    [2, 2],
  ],
  [
    [0, 2],
    [1, 1],
    [2, 0],
  ],
];
function checkBoard() {
  for (const victory of vitories) {
    const [cell1, cell2, cell3] = victory;
    if (
      boardState[cell1[0]][cell1[1]] &&
      boardState[cell1[0]][cell1[1]] === boardState[cell2[0]][cell2[1]] &&
      boardState[cell1[0]][cell1[1]] === boardState[cell3[0]][cell3[1]]
    ) {
      return boardState[cell1[0]][cell1[1]];
    }
  }
  let isDraw = true;
  for (let i = 0; i < ROW_COUNT; i++) {
    for (let j = 0; j < COL_COUNT; j++) {
      if (!boardState[i][j]) {
        isDraw = false;
        break;
      }
    }
  }
  return isDraw ? 'Draw' : '';
}

function renderBoard() {
  if (!appElement) throw new Error('Cannot find app');
  if (!boardElement) throw new Error('Cannot find board');
  boardElement.innerHTML = '';
  for (let i = 0; i < ROW_COUNT; i++) {
    for (let j = 0; j < COL_COUNT; j++) {
      boardElement.appendChild(createCell(i, j, boardState[i][j]));
    }
  }
  const oldMoveElement = document.getElementById('move-element');
  if (oldMoveElement) {
    oldMoveElement.remove();
  }
  const moveElement = document.createElement('p');
  moveElement.id = 'move-element';
  moveElement.innerText = winner
    ? `Winner: ${winner}`
    : `Next Move: ${currentMove}`;
  moveElement.classList.add('current-move');
  appElement.insertBefore(moveElement, document.getElementById('reset'));
}

function init() {
  const resetButton = document.getElementById('reset');
  if (!resetButton) throw new Error('No Reset button');
  resetButton.addEventListener('click', () => {
    boardState = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
    currentMove = 'X';
    winner = '';
    renderBoard();
  });
  renderBoard();
}

init();
