const loginDiv = document.getElementById("loginDiv");
const introScreen = document.getElementById("introDiv");
const match = document.getElementById("matchDiv");

const loginButton = document.getElementById("loginButton");
const playBtn = document.getElementById("playButton");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginMessage = document.getElementById("loginMessage");

const rock = "./assets/rock.png";
const paper = "./assets/paper.png";
const scissors = "./assets/scissors.png";

const playerHand = document.querySelector(".player_hand");
const playerScore = document.querySelector(".player_score");
const compHand = document.querySelector(".comp_hand");
const computerScore = document.querySelector(".computer_score");

const computerOptions = [rock, paper, scissors];

const scoreboard = {
	playerScore: 0,
	computerScore: 0,
};

// fake login credentials for now
const validEmail = "michael@email.com";
const validPassword = "123456";

loginButton.addEventListener("click", () => {
	const enteredEmail = emailInput.value.trim();
	const enteredPassword = passwordInput.value.trim();

	if (enteredEmail === validEmail && enteredPassword === validPassword) {
		loginMessage.textContent = "Login successful";
		loginDiv.style.display = "none";
		introScreen.style.display = "flex";
	} else {
		loginMessage.textContent = "Invalid email or password";
	}
});

playBtn.addEventListener("click", () => {
	introScreen.style.display = "none";
	match.style.display = "flex";
});

const playMatch = event => {
	const playerChoice = event.target.className;
	const computerChoice = Math.trunc(Math.random() * 3);
	updateScore(playerChoice, computerChoice);
};

function updateScore(playerChoice, computerChoice) {
	if (playerChoice === "rock") {
		playerHand.src = rock;
		compHand.src = computerOptions[computerChoice];

		switch (computerChoice) {
			case 0:
				break;
			case 1:
				scoreboard.computerScore += 1;
				computerScore.textContent = scoreboard.computerScore;
				break;
			case 2:
				scoreboard.playerScore += 1;
				playerScore.textContent = scoreboard.playerScore;
				break;
		}
	} else if (playerChoice === "paper") {
		playerHand.src = paper;
		compHand.src = computerOptions[computerChoice];

		switch (computerChoice) {
			case 0:
				scoreboard.playerScore += 1;
				playerScore.textContent = scoreboard.playerScore;
				break;
			case 1:
				break;
			case 2:
				scoreboard.computerScore += 1;
				computerScore.textContent = scoreboard.computerScore;
				break;
		}
	} else if (playerChoice === "scissors") {
		playerHand.src = scissors;
		compHand.src = computerOptions[computerChoice];

		switch (computerChoice) {
			case 0:
				scoreboard.computerScore += 1;
				computerScore.textContent = scoreboard.computerScore;
				break;
			case 1:
				scoreboard.playerScore += 1;
				playerScore.textContent = scoreboard.playerScore;
				break;
			case 2:
				break;
		}
	}
}

function reset() {
	scoreboard.playerScore = 0;
	scoreboard.computerScore = 0;
	playerScore.textContent = scoreboard.playerScore;
	computerScore.textContent = scoreboard.computerScore;
	playerHand.src = rock;
	compHand.src = rock;
}
