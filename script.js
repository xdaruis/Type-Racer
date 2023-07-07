// document.onload = generateText;

// function generateText()
    const string = "Computer science is the study of computation information and automation Computer science spans theoretical disciplines such as algorithms theory of computation and information theory to applied disciplines including the design and implementation of hardware and software Though more often considered an academic discipline computer science is closely related to computer programming Algorithms and data structures are central to computer science The theory of computation concerns abstract models of computation and general classes of problems that can be solved using them The fields of cryptography and computer security involve studying the means for secure communication and for preventing security vulnerabilities Computer graphics and computational geometry address the generation of images Programming language theory considers different ways to describe computational processes and database theory concerns the management of repositories of data Human–computer interaction investigates the interfaces through";
    const letters = string.replace(/\s/g, '').split("").length;
    console.log(letters);
    const textToWrite = string.split(" ");
    console.log("HI");
    const box = document.createElement("div");
    box.className = "row";
    box.id = "textToWrite";
    document.body.appendChild(box);
    for (let i = 0; i < textToWrite.length; ++i) {
        const actWord = document.createElement("div");
        actWord.id = "" + i;
        actWord.className = "d-flex justify-content-center";
        actWord.innerHTML = textToWrite[i];
        box.appendChild(actWord);
    }
// }

let gameState = true;
// document.getElementById("text").style.color = "red";
let completedWords = 0;
document.onkeydown = type;

let writtenWord = "";
let actId = 0;

function type(e) {
    if (!gameState) {
        return;
    }
    // window.scrollTo(0, 0);
    const key = e.key;
    if (key.length === 1 && key != " ") {
        document.getElementById("text").innerHTML += key;
        writtenWord += key;
        if (startInterval === null && gameState) {
            startInterval = setInterval(startTimer, 1000);
        }
    } else if (key == "Backspace") {
        writtenWord = writtenWord.replace(/.$/g, '');
        // document.getElementById("text").style.color = "green";
        const actText = document.getElementById("text").innerHTML;
        document.getElementById("text").innerHTML = actText.replace(/.$/g, '');
    }
    checkWord(key);
}

window.addEventListener('keydown', function(e) {
    if(e.keyCode == 32 && e.target == document.body) {
      e.preventDefault();
    }
  });

let mistakes = 0;

function checkWord(key) {
    // console.log(" ");
    if (key === " " && document.getElementById(actId).innerHTML === writtenWord) {
        document.getElementById(actId).innerHTML = "";
        ++actId;
        writtenWord = "";
        ++completedWords;
        document.getElementById("text").innerHTML = "&nbsp;";
        // alert("SUCCESS");
        // window.scrollTo(-2000, 0);
        return;
    }
    // window.scrollTo(0, 0);
    // console.log(writtenWord);
    if (writtenWord != document.getElementById(actId).innerHTML.substring(0, writtenWord.length)) {
        // console.log(document.getElementById(actId).innerHTML.substring(0, writtenWord.length));
        document.getElementById(actId).style.color = "red";
        ++mistakes;
    } else {
        document.getElementById(actId).style.color = "green";
    }
}

let start = Date.now();
let startInterval = null;


function startTimer() {
    let actTime = Date.now() - start; // milliseconds elapsed since start
    // console.log(Math.floor(delta / 1000)); // in seconds
    let seconds =  60 - Math.floor(actTime / 1000);
    document.getElementById("timer").innerHTML = seconds;
    console.log(30 - Math.floor(actTime / 1000))
    if (seconds === 0) {
        gameState = false;
        startInterval = null
        gameOver();
    }
}
// setInterval(function() {
//     let delta = Date.now() - start; // milliseconds elapsed since start
//     // console.log(Math.floor(delta / 1000)); // in seconds
//     let seconds =  60 - Math.floor(delta / 1000);
//     document.getElementById("timer").innerHTML = seconds;
//     console.log(60 - Math.floor(delta / 1000))
//     // alternatively just show wall clock time:
//     // console.log(new Date().toUTCString());
// }, 1000); // update about every second

function gameOver() {
    document.getElementById("timer").id = "gameOver";
    startInterval = null;
    gameState = false;
    // document.body.innerHTML = "";
    document.getElementById("gameOver").innerHTML = "";
    const box = document.createElement("div");
    // box.className = "row";
    // box.id = "textToWrite";
    document.getElementById("gameOver").appendChild(box);
    const aux = letters - mistakes;
    const result = Math.floor(100 * aux / letters);
    const wpm = completedWords;
    // console.log(wpm);
    // console.log("" + result + "%");
    const wpmDisplay = document.createElement("h1");
    // actWord.id = "" + i;
    wpmDisplay.className = "d-flex justify-content-center";
    wpmDisplay.innerHTML = "WPM: " + wpm;
    box.appendChild(wpmDisplay);
    const accuracyDisplay = document.createElement("h1");
    accuracyDisplay.className = "d-flex justify-content-center";
    accuracyDisplay.innerHTML = "Accuracy: " + result + "%";
    box.appendChild(accuracyDisplay);
    // startInterval = null;
}