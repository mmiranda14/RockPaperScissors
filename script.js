// const game = () => {
//     let pScore = 0;
//     let cScore = 0;

    const startGame = () => {
        const playBtn = document.getElementById('playButton');
        const introScreen = document.getElementById('introDiv');
        const match = document.getElementById('matchDiv');

        playBtn.addEventListener('click', () => {
            introScreen.style.display = 'none';
            match.style.display = 'block';
        });
    };

    const playMatch = (e) => {
        /*
         * When rock paper scissors btn is clicked
         * change img to selected choice.
         * 
         * Upon selection run math.random for CPU
         */
        const rock = "./assets/rock.png"
        const paper = "./assets/paper.png"
        const scissors = "./assets/scissors.png"
        const arr1 = [rock, paper, scissors];
        const playerHand = document.querySelector(".player_hand").arr1;
        const compHand = document.querySelector(".comp_hand");

        console.log(e);
        playerHand.addEventListener('click', () => {

        })

        //const options = document.querySelectorALL('.options button');
        // const computerHand = document.querySelector('.comp_hand');
        
        // const computerOptions = ['rock', 'paper', 'scissors'];

        // const computerNumber = math.random() * 3;

       
    };

    // Call all the inner functions
    startGame();
    playMatch();
// };

// Execute game Function
game();