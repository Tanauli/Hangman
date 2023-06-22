// Hangman game
const words = ["hangman", "javascript", "programming", "openai", "vercel"];
let selectedWord = "";
let guessedLetters = [];
let wrongGuesses = 0;

// Select a random word from the array
function selectWord() {
  selectedWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
}

// Display the selected word with blanks for unguessed letters
function displayWord() {
  const wordContainer = document.getElementById("word");
  wordContainer.textContent = "";
  
  for (let i = 0; i < selectedWord.length; i++) {
    const letter = selectedWord[i];
    if (guessedLetters.includes(letter)) {
      wordContainer.textContent += letter + " ";
    } else {
      wordContainer.textContent += "_ ";
    }
  }
}

// Create buttons for each letter
function createLetterButtons() {
  const lettersContainer = document.getElementById("letters");
  
  for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i);
    const button = document.createElement("button");
    button.textContent = letter;
    button.addEventListener("click", function() {
      guessLetter(letter);
      this.disabled = true;
    });
    lettersContainer.appendChild(button);
  }
}

// Handle letter guesses
function guessLetter(letter) {
  guessedLetters.push(letter);
  
  if (!selectedWord.includes(letter)) {
    wrongGuesses++;
  }
  
  displayWord();
  checkGameStatus();
}

// Check if the game is won or lost
function checkGameStatus() {
  const wordContainer = document.getElementById("word");
  const messageContainer = document.getElementById("message");
  
  if (wordContainer.textContent.indexOf("_") === -1) {
    messageContainer.textContent = "Congratulations! You won!";
    disableLetterButtons();
  } else if (wrongGuesses === 6) {
    messageContainer.textContent = "Game over! You lost. The word was: " + selectedWord;
    disableLetterButtons();
  }
}

// Disable all letter buttons
function disableLetterButtons() {
  const buttons = document.querySelectorAll("#letters button");
  buttons.forEach(button => {
    button.disabled = true;
  });
}

// Reset the game
function resetGame() {
  selectedWord = "";
  guessedLetters = [];
  wrongGuesses = 0;
  const messageContainer = document.getElementById("message");
  messageContainer.textContent = "";
  const lettersContainer = document.getElementById("letters");
  lettersContainer.innerHTML = "";
  selectWord();
  displayWord();
  createLetterButtons();
}

// Initialize the game
function initializeGame() {
  selectWord();
  displayWord();
  createLetterButtons();
}

// Call the initializeGame function when the page loads
window.addEventListener("load", initializeGame);
