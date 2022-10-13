const playBtn = document.getElementById('playButton');
const introScreen = document.getElementById('introDiv');
const match = document.getElementById('matchDiv');

const rock = "./assets/rock.png"
const paper = "./assets/paper.png"
const scissors = "./assets/scissors.png"

const playerHand = document.querySelector(".player_hand");
const playerScore = document.querySelector(".player_score");
const compHand = document.querySelector(".comp_hand");
const computerScore = document.querySelector(".computer_score");

const computerOptions = [rock, paper, scissors];
const scoreboard = {
    "playerScore": 0,
    "computerScore": 0
}


playBtn.addEventListener('click', () => {
    introScreen.style.display = 'none';
    match.style.display = 'block';
});

const playMatch = (event) => {
    /*
        * When rock paper scissors btn is clicked
        * change img to selected choice.
        * 
        * Upon selection run math.random for CPU
        */
    const playerChoice = event.target.className;
    const computerChoice = Math.trunc(Math.random() * (3));
    updateScore(playerChoice, computerChoice);
};

function updateScore(playerChoice, computerChoice) {
    if (playerChoice == 'rock') {
        playerHand.src = rock;
        compHand.src = computerOptions[computerChoice];
        switch (computerChoice) {
            case 0:
                break;
            case 1:
                scoreboard.computerScore += 1;
                computerScore.innerHTML = scoreboard.computerScore;
                break;
            case 2:
                scoreboard.playerScore += 1;
                playerScore.innerHTML = scoreboard.playerScore;
                break;
        }
    } else if (playerChoice == 'paper') {
        playerHand.src = paper;
        compHand.src = computerOptions[computerChoice];
        switch (computerChoice) {
            case 0:
                scoreboard.playerScore += 1;
                playerScore.innerHTML = scoreboard.playerScore;
                break;
            case 1:
                break;
            case 2:
                scoreboard.computerScore += 1;
                computerScore.innerHTML = scoreboard.computerScore;
                break;
        }
    } else if (playerChoice == 'scissors') {
        playerHand.src = scissors;
        compHand.src = computerOptions[computerChoice];
        switch (computerChoice) {
            case 0:
                scoreboard.computerScore += 1;
                computerScore.innerHTML = scoreboard.computerScore;
                break;
            case 1:
                scoreboard.playerScore += 1;
                playerScore.innerHTML = scoreboard.playerScore;
                break;
            case 2:
                break;
        }
    }
}

function reset() {
    scoreboard.playerScore = 0;
    scoreboard.computerScore = 0;
    playerScore.innerHTML = scoreboard.playerScore;
    computerScore.innerHTML = scoreboard.computerScore;
}