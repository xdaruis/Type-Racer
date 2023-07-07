const NUM_SECONDS = 60;
const HUNDRED = 100;
const ONE_THOUSAND = 1000;

let lettersNum;
let textToWrite;
let displayWordId = 12;

document.onload = generateText();

function generateText() {
    const paragraph = "Computer science is the study of computation information and automation Computer science spans theoretical disciplines such as algorithms theory of computation and information theory to applied disciplines including the design and implementation of hardware and software Though more often considered an academic discipline computer science is closely related to computer programming Algorithms and data structures are central to computer science The theory of computation concerns abstract models of computation and general classes of problems that can be solved using them The fields of cryptography and computer security involve studying the means for secure communication and for preventing security vulnerabilities Computer graphics and computational geometry address the generation of images Programming language theory considers different ways to describe computational processes and database theory concerns the management of repositories of data Human–computer interaction investigates the interfaces through";
    lettersNum = paragraph.replace(/\s/g, '').split("").length;
    textToWrite = paragraph.split(" ");
    const box = document.createElement("h5");
    box.id = "showText"
    box.className = "row";
    document.body.appendChild(box);
    for (let i = 0; i <= displayWordId; ++i) {
        const actWord = document.createElement("div");
        actWord.id = "" + i;
        actWord.className = "d-flex justify-content-center";
        for (let j = 0; j < textToWrite[i].length; ++j) {
            const letter = document.createElement("span");
            letter.id = "" + i + " " + j;
            letter.innerHTML = textToWrite[i][j];
            actWord.appendChild(letter);
        }
        box.appendChild(actWord);
    }
}

function addNextWord() {
    ++displayWordId;
    const actWord = document.createElement("div");
    actWord.id = "" + displayWordId;
    actWord.className = "d-flex justify-content-center";
    for (let j = 0; j < textToWrite[displayWordId].length; ++j) {
        const letter = document.createElement("span");
        letter.id = "" + displayWordId + " " + j;
        letter.innerHTML = textToWrite[displayWordId][j];
        actWord.appendChild(letter);
    }
    document.getElementById("showText").appendChild(actWord);
}

document.onkeydown = type;

let gameState = true;

let writtenWord = "";
let mistakes = 0;
let completedWords = 0;
let actWordId = 0;

function type(e) {
    if(e.key === " " && e.target == document.body) {
        e.preventDefault();
    }
    if (!gameState) {
        return;
    }
    const key = e.key;
    if (key.length === 1 && key != " ") {
        document.getElementById("text").innerHTML += key;
        writtenWord += key;
        if (startGame === null) {
            startTime = Date.now();
            startGame = setInterval(countDown, ONE_THOUSAND);
        }
    } else if (key === "Backspace") {
        writtenWord = writtenWord.replace(/.$/g, '');
        const actText = document.getElementById("text").innerHTML;
        document.getElementById("text").innerHTML = actText.replace(/.$/g, '');
    }
    if (writtenWord.length != 0) {
        checkWord(key);
    } else {
        document.getElementById(actWordId + " " + 0).style.color = "black";
    }
}

function checkWord(key) {
    if ((key === " " || key === "Enter") && textToWrite[actWordId] === writtenWord) {
        document.getElementById(actWordId).innerHTML = "";
        ++actWordId;
        ++completedWords;
        writtenWord = "";
        document.getElementById("text").innerHTML = "&nbsp;";
        addNextWord();
        return;
    }
    if (writtenWord[writtenWord.length - 1] != document.getElementById(actWordId + " " + (writtenWord.length - 1)).innerHTML) {
        document.getElementById(actWordId + " " + (writtenWord.length - 1)).style.color = "red";
        ++mistakes;
    } else {
        document.getElementById(actWordId + " " + (writtenWord.length - 1)).style.color = "green";
    }
    document.getElementById(actWordId + " " + (writtenWord.length)).style.color = "black";
}

let startTime = null;
let startGame = null;

function countDown() {
    let timePassed = Date.now() - startTime;
    let seconds =  NUM_SECONDS - Math.floor(timePassed / ONE_THOUSAND);
    document.getElementById("timer").innerHTML = seconds;
    if (seconds === 0) {
        gameOver();
    }
}

function gameOver() {
    clearInterval(startGame);
    gameState = false;
    document.getElementById("timer").innerHTML = "";
    const box = document.createElement("div");
    document.getElementById("timer").appendChild(box);
    const wpmDisplay = document.createElement("h1");
    wpmDisplay.className = "d-flex justify-content-center";
    wpmDisplay.innerHTML = "WPM: " + completedWords;
    box.appendChild(wpmDisplay);
    const accuracy = Math.floor(HUNDRED * (lettersNum - mistakes) / lettersNum);
    const accuracyDisplay = document.createElement("h1");
    accuracyDisplay.className = "d-flex justify-content-center";
    accuracyDisplay.innerHTML = "Accuracy: " + accuracy + "%";
    box.appendChild(accuracyDisplay);
}