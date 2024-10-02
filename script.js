document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const startBtn = document.getElementById('startBtn');
    const resetBtn = document.getElementById('resetBtn');
    const gameBoard = document.getElementById('gameBoard');
    const nameInput = document.getElementById('nameInput');
    const turnIndicator = document.getElementById('turnIndicator');
    const turnText = document.getElementById('turnText');
    const winnerMessage = document.getElementById('winnerMessage');
    const winnerText = document.getElementById('winnerText');
    const errorMessage = document.getElementById('errorMessage');
    let player1Name = '';
    let player2Name = '';
    let currentPlayer = '';
    let board = ['', '', '', '', '', '', '', '', ''];
    let isGameActive = true;
  
    // Winning combinations
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
  
    // Start game function
    startBtn.addEventListener('click', () => {
      player1Name = document.getElementById('player1').value;
      player2Name = document.getElementById('player2').value;
  
      if (player1Name.trim() === '' || player2Name.trim() === '') {
        errorMessage.classList.remove('hidden');
      } else {
        errorMessage.classList.add('hidden');
        nameInput.classList.add('hidden');
        gameBoard.classList.remove('hidden');
        turnIndicator.classList.remove('hidden');
        currentPlayer = player1Name;
        turnText.textContent = `It's ${currentPlayer}'s turn (X)`;
      }
    });
  
    // Handle cell clicks
    cells.forEach(cell => {
      cell.addEventListener('click', () => {
        const index = cell.getAttribute('data-index');
        if (board[index] === '' && isGameActive) {
          board[index] = currentPlayer === player1Name ? 'X' : 'O';
          cell.textContent = board[index];
          checkWinner();
          currentPlayer = currentPlayer === player1Name ? player2Name : player1Name;
          if (isGameActive) {
            turnText.textContent = `It's ${currentPlayer}'s turn (${currentPlayer === player1Name ? 'X' : 'O'})`;
          }
        }
      });
    });
  
    // Check if a player has won
    function checkWinner() {
      for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          isGameActive = false;
          winnerText.textContent = `Congratulations ${currentPlayer} Wins!`;
          gameBoard.classList.add('hidden');
          turnIndicator.classList.add('hidden');
          winnerMessage.classList.remove('hidden');
          return;
        }
      }
  
      // Check if there is a tie
      if (!board.includes('')) {
        isGameActive = false;
        winnerText.textContent = `It's a Tie!`;
        gameBoard.classList.add('hidden');
        turnIndicator.classList.add('hidden');
        winnerMessage.classList.remove('hidden');
      }
    }
  
    // Reset game and ask for new player names
    resetBtn.addEventListener('click', () => {
      board = ['', '', '', '', '', '', '', '', ''];
      cells.forEach(cell => (cell.textContent = ''));
      gameBoard.classList.add('hidden');
      winnerMessage.classList.add('hidden');
      nameInput.classList.remove('hidden');
      turnIndicator.classList.add('hidden');
      isGameActive = true;
    });
  });
  