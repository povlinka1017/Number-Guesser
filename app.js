/*

GAME FUNCTION:

- Player must guess a number between a min and max value
- Player guess a certain amount of guesses
- Notify player of guesses remaining
- Notify player of the correct answer if loose
- Let player choose to play again

*/

// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI El
const game = document.querySelector("#game"),
    minNum = document.querySelector(".min-num"),
    maxNum = document.querySelector(".max-num"),
    guessBtn = document.querySelector("#guess-btn"),
    guessInput = document.querySelector("#guess-input"),
    message = document.querySelector(".message");

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener("mousedown", function (e) {
    if (e.target.className === "play-again") {
        window.location.reload();
    }
});

// Listen for guess
guessBtn.addEventListener("click", function () {
    let guess = parseInt(guessInput.value);

    // Validate
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, "red");
    }

    // Check if won
    if (guess === winningNum) {
        // // Disable
        // guessInput.disabled = true
        // // Change border color
        // guessInput.style.borderColor = 'green';
        // // Set Message
        // setMessage(`Well done! ${winningNum} is correct!`, 'green');
        gameOver(true, `Well done! ${winningNum} is correct!`);
    } else {
        // Wrong number
        guessesLeft -= 1;

        if (guessesLeft === 0) {
            // Game over - lost
            gameOver(
                false,
                `Game over! You lost :(. The correct number was ${winningNum}`
            );
        } else {
            guessInput.style.borderColor = "red";
            guessInput.value = "";
            setMessage(
                `${guess} is not correct, ${guessesLeft} guesses left`,
                "red"
            );
        }
    }
});

// Game over
function gameOver(won, msg) {
    let color;
    won === true ? (color = "green") : (color = "red");
    guessInput.disabled = true;
    guessInput.style.borderColor = "green";
    message.style.color = color;
    setMessage(msg);

    // Play Again?
    guessBtn.value = "Play Again";
    guessBtn.className += "play-again";
}

// Get Winning Number
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Set Message
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}
