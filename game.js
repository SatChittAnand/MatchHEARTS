const startButton = document.getElementById('start-button');
const retryButton = document.getElementById('retry-button');
const gameScreen = document.getElementById('game-screen');
const startScreen = document.getElementById('start-screen');
const gameBoard = document.getElementById('game-board');
const timeLeftDisplay = document.getElementById('time-left');
const finalTimeDisplay = document.getElementById('final-time');
const shareButton = document.getElementById('share-button');
let timer;
let flippedCards = [];
let matchedCards = [];
let timeLeft = 30;

const cardImages = ['heart', 'heart', 'heart', 'heart']; // Add more pairs to increase difficulty

// Shuffle function to randomize the cards
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Create cards on the board
function createGameBoard() {
  const shuffledCards = shuffleArray([...cardImages, ...cardImages]);
  gameBoard.innerHTML = '';
  shuffledCards.forEach((cardImage, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.index = index;
    
    const img = document.createElement('img');
    img.src = `assets/${cardImage}.png`;
    card.appendChild(img);
    
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

// Flip card logic
function flipCard(event) {
  const clickedCard = event.target.closest('.card');
  
  if (flippedCards.length < 2 && !clickedCard.classList.contains('flipped')) {
    clickedCard.classList.add('flipped');
    flippedCards.push(clickedCard);

    if (flippedCards.length === 2) {
      checkForMatch();
    }
  }
}

// Check if cards match
function checkForMatch() {
  const [firstCard, secondCard] = flippedCards;

  if (firstCard.querySelector('img').src === secondCard.querySelector('img').src) {
    matchedCards.push(firstCard, secondCard);
    flippedCards = [];
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      flippedCards = [];
    }, 1000);
  }

  // Check if all cards are matched
  if (matchedCards.length === cardImages.length * 2) {
    clearInterval(timer);
    endGame();
  }
}

// Timer function
function startTimer() {
  timer = setInterval(() => {
    timeLeft -= 1;
    timeLeftDisplay.textContent = timeLeft;

    if (timeLeft === 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}

// End the game
function endGame() {
  finalTimeDisplay.textContent = 30 - timeLeft;
  document.getElementById('game-end').classList.remove('hidden');
}

// Restart the game
retryButton.addEventListener('click', () => {
  timeLeft = 30;
  matchedCards = [];
  flippedCards = [];
  createGameBoard();
  startTimer();
  gameScreen.classList.remove('hidden');
  startScreen.classList.add('hidden');
  document.getElementById('game-end').classList.add('hidden');
});

// Start the game
startButton.addEventListener('click', () => {
  createGameBoard();
  startTimer();
  gameScreen.classList.remove('hidden');
  startScreen.classList.add('hidden');
});
