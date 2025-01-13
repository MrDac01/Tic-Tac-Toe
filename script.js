let currentPlayer = 'X';
let gameState = Array(9).fill(null); 
let gameActive = true;
const board = document.querySelector('.board');
const statusText = document.querySelector('.status');
const resetBtn = document.querySelector('.reset-btn');

// Выигрышные комбинации
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function createBoard() {
  board.innerHTML = ''; 
  gameState = Array(9).fill(null); 
  gameActive = true; 
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-index', i);
    board.appendChild(cell);
  }
}

// Обработчик кликов
function handleCellClick(event) {
  const cell = event.target;
  const cellIndex = cell.getAttribute('data-index');

  if (!gameActive || cell.classList.contains('taken') || gameState[cellIndex] !== null) {
    return;
  }

  // Вносим ход
  gameState[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('taken');

  if (checkWin()) {
    statusText.textContent = `Игрок ${currentPlayer} победил!`;
    gameActive = false;
    return;
  }

  if (gameState.every(cell => cell !== null)) {
    statusText.textContent = 'Ничья!';
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Текущий игрок: ${currentPlayer}`;
}

function checkWin() {
  return winningCombinations.some(combination => {
    return combination.every(index => gameState[index] === currentPlayer);
  });
}

function resetGame() {
  currentPlayer = 'X';
  statusText.textContent = `Текущий игрок: ${currentPlayer}`;
  createBoard();
  board.addEventListener('click', handleCellClick);
}

createBoard();
board.addEventListener('click', handleCellClick);
resetBtn.addEventListener('click', resetGame);