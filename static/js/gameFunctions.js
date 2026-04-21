const loginDiv = document.getElementById("loginDiv");
const introScreen = document.getElementById("introDiv");
const matchScreen = document.getElementById("matchDiv");

const loginButton = document.getElementById("loginButton");
const playBtn = document.getElementById("playButton");
const logoutButton = document.getElementById("logoutButton");
const resetButton = document.getElementById("resetButton");

const playAgainButton = document.getElementById("playAgainButton");
const closeModalButton = document.getElementById("closeModalButton");

const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const loginMessage = document.getElementById("loginMessage");
const winnerMessage = document.getElementById("winnerMessage");
const welcomeTag = document.getElementById("welcomeTag");
const playerNameDisplay = document.getElementById("playerNameDisplay");
const fighterPlayerName = document.getElementById("fighterPlayerName");

const totalWinsEl = document.getElementById("totalWins");
const totalLossesEl = document.getElementById("totalLosses");
const winStreakEl = document.getElementById("winStreak");

const countdownOverlay = document.getElementById("countdownOverlay");
const countdownText = document.getElementById("countdownText");

const endGameModal = document.getElementById("endGameModal");
const finalResultTitle = document.getElementById("finalResultTitle");
const finalResultText = document.getElementById("finalResultText");
const finalPlayerScore = document.getElementById("finalPlayerScore");
const finalCpuScore = document.getElementById("finalCpuScore");

const rock = "./assets/rock.png";
const paper = "./assets/paper.png";
const scissors = "./assets/scissors.png";

const playerHand = document.getElementById("playerHand");
const compHand = document.getElementById("compHand");
const playerScoreEl = document.querySelector(".player_score");
const computerScoreEl = document.querySelector(".computer_score");
const choiceButtons = document.querySelectorAll(".choice-btn");

const handImages = { rock, paper, scissors };
const computerOptions = ["rock", "paper", "scissors"];

const validEmail = "michael@email.com";
const validPassword = "123456";

const scoreboard = {
	playerScore: 0,
	computerScore: 0,
	gameOver: false,
	isAnimating: false,
	playerName: "Player",
	stats: {
		wins: 0,
		losses: 0,
		streak: 0,
	},
};

window.addEventListener("DOMContentLoaded", () => {
	loadSession();
	updateHud();
});

loginButton.addEventListener("click", handleLogin);
playBtn.addEventListener("click", startBattle);
logoutButton.addEventListener("click", logout);
resetButton.addEventListener("click", resetMatch);
playAgainButton.addEventListener("click", () => {
	closeModal();
	resetMatch();
});
closeModalButton.addEventListener("click", closeModal);

choiceButtons.forEach(button => {
	button.addEventListener("click", event => {
		playMatch(event);
	});
});

function handleLogin() {
	const enteredName = usernameInput.value.trim();
	const enteredEmail = emailInput.value.trim();
	const enteredPassword = passwordInput.value.trim();

	if (!enteredName) {
		loginMessage.textContent = "Enter your pilot name";
		return;
	}

	if (enteredEmail === validEmail && enteredPassword === validPassword) {
		scoreboard.playerName = enteredName;
		localStorage.setItem("rpsLoggedIn", "true");
		localStorage.setItem("rpsPlayerName", enteredName);
		loginMessage.textContent = "";
		clearLoginFields();
		showIntro();
		updateHud();
	} else {
		loginMessage.textContent = "Invalid email or password";
	}
}

function startBattle() {
	introScreen.style.display = "none";
	matchScreen.style.display = "flex";
	winnerMessage.textContent = "Arena live. Choose your weapon.";
}

function logout() {
	localStorage.removeItem("rpsLoggedIn");
	localStorage.removeItem("rpsPlayerName");
	localStorage.removeItem("rpsStats");
	closeModal();
	resetMatch(true);
	scoreboard.playerName = "Player";
	scoreboard.stats = { wins: 0, losses: 0, streak: 0 };
	updateHud();
	showLogin();
}

async function playMatch(event) {
	if (scoreboard.gameOver || scoreboard.isAnimating) {
		return;
	}

	const playerChoice = event.target.dataset.choice;
	const computerChoice = computerOptions[Math.trunc(Math.random() * 3)];

	scoreboard.isAnimating = true;
	disableChoices();
	winnerMessage.textContent = "Battle sequence initiated";

	playerHand.src = rock;
	compHand.src = rock;

	playerHand.classList.add("shakePlayer");
	compHand.classList.add("shakeComputer");

	await runCountdown();

	playerHand.classList.remove("shakePlayer");
	compHand.classList.remove("shakeComputer");

	playerHand.src = handImages[playerChoice];
	compHand.src = handImages[computerChoice];

	updateRound(playerChoice, computerChoice);
	scoreboard.isAnimating = false;

	if (!scoreboard.gameOver) {
		enableChoices();
	}
}

function updateRound(playerChoice, computerChoice) {
	if (playerChoice === computerChoice) {
		winnerMessage.textContent = `Tie round. Both chose ${capitalize(playerChoice)}.`;
		checkForMatchWinner();
		return;
	}

	const playerWon =
		(playerChoice === "rock" && computerChoice === "scissors") ||
		(playerChoice === "paper" && computerChoice === "rock") ||
		(playerChoice === "scissors" && computerChoice === "paper");

	if (playerWon) {
		scoreboard.playerScore += 1;
		playerScoreEl.textContent = scoreboard.playerScore;
		winnerMessage.textContent = `${scoreboard.playerName} wins the round. ${capitalize(playerChoice)} beats ${capitalize(computerChoice)}.`;
		flashPanel("winFlash");
	} else {
		scoreboard.computerScore += 1;
		computerScoreEl.textContent = scoreboard.computerScore;
		winnerMessage.textContent = `Neon Bot wins the round. ${capitalize(computerChoice)} beats ${capitalize(playerChoice)}.`;
		flashPanel("loseFlash");
	}

	checkForMatchWinner();
}

function checkForMatchWinner() {
	if (scoreboard.playerScore >= 5) {
		scoreboard.gameOver = true;
		scoreboard.stats.wins += 1;
		scoreboard.stats.streak += 1;
		saveStats();
		updateHud();
		showEndGame(true);
		disableChoices();
		return;
	}

	if (scoreboard.computerScore >= 5) {
		scoreboard.gameOver = true;
		scoreboard.stats.losses += 1;
		scoreboard.stats.streak = 0;
		saveStats();
		updateHud();
		showEndGame(false);
		disableChoices();
	}
}

function showEndGame(playerWon) {
	finalPlayerScore.textContent = scoreboard.playerScore;
	finalCpuScore.textContent = scoreboard.computerScore;

	if (playerWon) {
		finalResultTitle.textContent = "VICTORY";
		finalResultText.textContent = `${scoreboard.playerName}, you conquered the Neon Arena. Your streak is now ${scoreboard.stats.streak}.`;
		winnerMessage.textContent = "You won the match!";
	} else {
		finalResultTitle.textContent = "DEFEAT";
		finalResultText.textContent = `Neon Bot overpowered you this time. Reset and come back stronger.`;
		winnerMessage.textContent = "Neon Bot won the match.";
	}

	endGameModal.classList.add("show");
}

function closeModal() {
	endGameModal.classList.remove("show");
}

function resetMatch(skipMessage = false) {
	scoreboard.playerScore = 0;
	scoreboard.computerScore = 0;
	scoreboard.gameOver = false;
	scoreboard.isAnimating = false;

	playerScoreEl.textContent = "0";
	computerScoreEl.textContent = "0";
	playerHand.src = rock;
	compHand.src = rock;

	enableChoices();

	if (!skipMessage) {
		winnerMessage.textContent = "Match reset. Enter the arena again.";
	}
}

function updateHud() {
	playerNameDisplay.textContent = scoreboard.playerName;
	fighterPlayerName.textContent = scoreboard.playerName;
	welcomeTag.textContent =
		scoreboard.playerName !== "Player" ? `Pilot: ${scoreboard.playerName}` : "";

	totalWinsEl.textContent = scoreboard.stats.wins;
	totalLossesEl.textContent = scoreboard.stats.losses;
	winStreakEl.textContent = scoreboard.stats.streak;
}

function showLogin() {
	loginDiv.style.display = "flex";
	introScreen.style.display = "none";
	matchScreen.style.display = "none";
	logoutButton.style.display = "none";
	winnerMessage.textContent = "Login to enter the arena";
}

function showIntro() {
	loginDiv.style.display = "none";
	introScreen.style.display = "flex";
	matchScreen.style.display = "none";
	logoutButton.style.display = "inline-block";
	winnerMessage.textContent = "Session active. Ready for battle.";
}

function disableChoices() {
	choiceButtons.forEach(button => {
		button.disabled = true;
	});
}

function enableChoices() {
	choiceButtons.forEach(button => {
		button.disabled = false;
	});
}

function clearLoginFields() {
	usernameInput.value = "";
	emailInput.value = "";
	passwordInput.value = "";
}

function capitalize(word) {
	return word.charAt(0).toUpperCase() + word.slice(1);
}

function flashPanel(className) {
	const panel = document.querySelector(".match_panel");
	panel.classList.add(className);

	setTimeout(() => {
		panel.classList.remove(className);
	}, 450);
}

function saveStats() {
	localStorage.setItem("rpsStats", JSON.stringify(scoreboard.stats));
}

function loadSession() {
	const loggedIn = localStorage.getItem("rpsLoggedIn");
	const savedName = localStorage.getItem("rpsPlayerName");
	const savedStats = localStorage.getItem("rpsStats");

	if (savedName) {
		scoreboard.playerName = savedName;
	}

	if (savedStats) {
		scoreboard.stats = JSON.parse(savedStats);
	}

	if (loggedIn === "true") {
		showIntro();
	} else {
		showLogin();
	}
}

async function runCountdown() {
	const steps = ["3", "2", "1", "SHOOT"];

	countdownOverlay.classList.add("active");

	for (const step of steps) {
		countdownText.textContent = step;
		countdownText.style.animation = "none";
		countdownText.offsetHeight;
		countdownText.style.animation = "pulseText 0.45s ease";
		await wait(step === "SHOOT" ? 350 : 450);
	}

	countdownOverlay.classList.remove("active");
}

function wait(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
} 