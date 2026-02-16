// generating a random num
let randomNumber = Math.floor(Math.random() * 100) + 1;
console.log(randomNumber);

// number of attempts
let attempts = 0;

const guessInput = document.getElementById("guessInput");
const submitBtn = document.getElementById("submitBtn");
const message = document.getElementById("message");
const attemptCount = document.getElementById("attemptCount");
const guessList = document.getElementById("guessList");
const restartBtn = document.getElementById("restartBtn");

// adding eventlistener for user input
submitBtn.addEventListener("click", function () {
  const userGuess = Number(guessInput.value);

  if (userGuess < 1 || userGuess > 100) {
    message.textContent = "Guess should be between 1 & 100 🚫";
    return;
  }
  attempts++;
  attemptCount.textContent = attempts;

  const li = document.createElement("li");
  li.textContent = userGuess;
  guessList.appendChild(li);

  //   checking the user guess
  if (userGuess === randomNumber) {
    message.textContent = `${randomNumber} is the right guess 🌟.`;
    submitBtn.disabled = true;
    guessInput.disabled = true;
  } else if (userGuess > randomNumber) {
    message.textContent = "Too high 🔺";
  } else {
    message.textContent = "Too low 🔻";
  }

  guessInput.value = "";
});

// button for restarting the game
restartBtn.addEventListener("click", function () {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;

  attemptCount.textContent = "0";
  message.textContent = "Start guessing...";
  guessList.innerHTML = "";
  guessInput.disabled = false;
  submitBtn.disabled = false;
  guessInput.value = "";
});
