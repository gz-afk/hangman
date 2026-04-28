let word = "";
let guessed = [];
let wrong = 0;
const maxWrong = 6;

async function startGame() {
    const res = await fetch("/word");
    const data = await res.json();

    // Reset all variables
    word = data.word;
    guessed = [];
    wrong = 0;

    // Reset the UI text and image
    document.getElementById("status").innerText = "";
    document.getElementById("hangman-img").src = "/static/images/0.png";

    createKeyboard();
    updateDisplay();
}

function createKeyboard() {
    const keyboard = document.getElementById("keyboard");
    keyboard.innerHTML = "";

    for (let i = 65; i <= 90; i++) {
        let btn = document.createElement("button");
        btn.innerText = String.fromCharCode(i);
        btn.onclick = () => guess(btn.innerText, btn);
        keyboard.appendChild(btn);
    }
}

function guess(letter, btn) {
    btn.disabled = true;

    if (word.includes(letter)) {
        guessed.push(letter);
    } else {
        wrong++;
    }

    updateDisplay();
}

function updateDisplay() {
    let display = "";

    for (let l of word) {
        display += guessed.includes(l) ? l + " " : "_ ";
    }

    document.getElementById("word-display").innerText = display;
    document.getElementById("hangman-img").src = `/static/images/${wrong}.png`;

    // Check for Win or Loss
    if (!display.includes("_")) {
        document.getElementById("status").innerText = "🎉 You Win!";
        disableKeyboard();
    } else if (wrong >= maxWrong) {
        document.getElementById("status").innerText = `💀 You Lost! Word: ${word}`;
        disableKeyboard();
    }
}

// Function to stop the player from clicking more letters after game over
function disableKeyboard() {
    const buttons = document.getElementById("keyboard").getElementsByTagName("button");
    for (let btn of buttons) {
        btn.disabled = true;
    }
}

// Ensure the game starts automatically when the page loads
window.onload = startGame;
