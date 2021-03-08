const playBtn = document.getElementById('playButton');
const introScreen = document.getElementById('introDiv');
const match = document.getElementById('matchDiv');

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
    const rock = "./assets/rock.png"
    const paper = "./assets/paper.png"
    const scissors = "./assets/scissors.png"
    const playerHand = document.querySelector(".player_hand");
    const compHand = document.querySelector(".comp_hand");
    const computerOptions = [rock, paper, scissors];
    const randomNum = Math.trunc(Math.random() * (3-1));

    switch(event.target.className) {
        case 'rock':
            playerHand.src = rock;
            compHand.src = computerOptions[randomNum];
            break;
        case 'paper':
            playerHand.src = paper;
            compHand.src = computerOptions[randomNum];
            break;
        case 'scissors':
            playerHand.src = scissors;
            compHand.src = computerOptions[randomNum];
            break;
    }
};
